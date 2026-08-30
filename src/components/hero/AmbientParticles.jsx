import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { sceneState } from './sceneState'
import { createHoloMaterial, mulberry32 } from './coreUtils'

/** Distant drifting particle field that reacts very softly to the cursor. */
export default function AmbientParticles({ count, seed = 21 }) {
  const built = useMemo(() => {
    const rng = mulberry32(seed)
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const c = new THREE.Color(0x1d4ed8)
    const cEnd = new THREE.Color(0x67e8f9)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rng() * 12 - 6) * 1.6
      positions[i * 3 + 1] = (rng() * 7 - 3.5) * 1.4
      positions[i * 3 + 2] = -(4.2 + rng() * 3.8)
      sizes[i] = 0.02 + rng() * 0.03
      phases[i] = rng() * Math.PI * 2
      c.lerpColors(new THREE.Color(0x1d4ed8), cEnd, rng()).multiplyScalar(0.6 + rng() * 0.3)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    const mat = createHoloMaterial({ uScale: 1.0, uOpacity: 0.5 })
    const group = new THREE.Group()
    group.add(new THREE.Points(geo, mat))
    return { group, geo, mat }
  }, [count, seed])

  useEffect(() => {
    sceneState.starfield = built.group
    return () => {
      if (sceneState.starfield === built.group) sceneState.starfield = null
    }
  }, [built])

  useEffect(() => {
    const entry = { material: built.mat, pulse: false }
    sceneState.materials.push(entry)
    return () => {
      const i = sceneState.materials.indexOf(entry)
      if (i !== -1) sceneState.materials.splice(i, 1)
    }
  }, [built])

  useEffect(
    () => () => {
      built.geo.dispose()
      built.mat.dispose()
    },
    [built],
  )

  return <primitive object={built.group} />
}