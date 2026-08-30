import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { sceneState } from './sceneState'
import { createRadialTexture } from './coreUtils'

/**
 * The AI Neural Core: a glowing computational heart wrapped in wireframe
 * shells, orbited by thin rings and satellite dots. All per-frame work
 * (breathing glow, decoupled spins) is driven by the shared rig.
 */
export default function NeuralCore({ data }) {
  const built = useMemo(() => {
    const group = new THREE.Group()
    const disposables = []

    // Inner energy sphere.
    const innerGeo = new THREE.SphereGeometry(0.6, 32, 24)
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#5fd9ff'),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const inner = new THREE.Mesh(innerGeo, innerMat)
    disposables.push(innerGeo, innerMat)
    group.add(inner)

    // Wireframe shells give the "computational lattice" read.
    const shellGeo = new THREE.IcosahedronGeometry(1.02, 1)
    const shellMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38c8f0'),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const shell = new THREE.Mesh(shellGeo, shellMat)
    const outerGeo = new THREE.IcosahedronGeometry(1.32, 0)
    const outerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#4d8dff'),
      wireframe: true,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const outer = new THREE.Mesh(outerGeo, outerMat)
    disposables.push(shellGeo, shellMat, outerGeo, outerMat)
    group.add(shell, outer)

    // Soft atmospheric halo.
    const haloTexture = createRadialTexture()
    const haloMat = new THREE.SpriteMaterial({
      map: haloTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const halo = new THREE.Sprite(haloMat)
    halo.scale.set(3.4, 3.4, 1)
    disposables.push(haloTexture, haloMat)
    group.add(halo)

    // Orbital rings with satellite dots.
    const satGeo = new THREE.SphereGeometry(0.05, 8, 6)
    const satMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#9df0ff'),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    disposables.push(satGeo, satMat)

    const rings = []
    for (const def of data.rings) {
      const ringGroup = new THREE.Group()
      ringGroup.rotation.set(def.tilt[0], def.tilt[1], def.tilt[2])
      const spin = new THREE.Group()
      ringGroup.add(spin)

      const segments = 96
      const points = []
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2
        points.push(new THREE.Vector3(Math.cos(a) * def.radius, Math.sin(a) * def.radius, 0))
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color('#4dd6f7'),
        transparent: true,
        opacity: 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      spin.add(new THREE.Line(lineGeo, lineMat))
      disposables.push(lineGeo, lineMat)

      for (let i = 0; i < def.satellites; i++) {
        const a0 = (i / def.satellites) * Math.PI * 2 + 0.4
        const satellite = new THREE.Mesh(satGeo, satMat)
        satellite.position.set(Math.cos(a0) * def.radius, Math.sin(a0) * def.radius, 0)
        spin.add(satellite)
      }

      group.add(ringGroup)
      rings.push({ spin, speed: def.speed })
    }

    return { group, innerMat, haloMat, shell, outer, rings, disposables }
  }, [data])

  // Register glow materials for the shared rig (breathing + hover boost).
  useEffect(() => {
    const entries = [
      { material: built.innerMat, pulse: true, hover: true, base: 0.85, phase: 0 },
      { material: built.haloMat, pulse: true, hover: true, base: 0.5, phase: 1.2 },
    ]
    sceneState.materials.push(...entries)
    return () => {
      for (const entry of entries) {
        const i = sceneState.materials.indexOf(entry)
        if (i !== -1) sceneState.materials.splice(i, 1)
      }
    }
  }, [built])

  // Register decoupled spins: wireframe shells + orbital rings.
  useEffect(() => {
    const spinners = [
      { object: built.shell, speed: 0.05 },
      { object: built.outer, speed: -0.035 },
    ]
    sceneState.spinners.push(...spinners)
    sceneState.rings.push(...built.rings)
    return () => {
      for (const sp of spinners) {
        const i = sceneState.spinners.indexOf(sp)
        if (i !== -1) sceneState.spinners.splice(i, 1)
      }
      for (const ring of built.rings) {
        const i = sceneState.rings.indexOf(ring)
        if (i !== -1) sceneState.rings.splice(i, 1)
      }
    }
  }, [built])

  useEffect(
    () => () => {
      for (const disposable of built.disposables) disposable.dispose()
    },
    [built],
  )

  return <primitive object={built.group} />
}