import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneState } from './sceneState'

/**
 * Single owner of the per-frame animation, so object matrices, travelling
 * signals, node hover states and the starfield stay perfectly in sync and we
 * never fight over `useFrame` across components.
 */
export default function NeuralCoreRig() {
  const damp = THREE.MathUtils.damp
  const px = useRef(0)
  const py = useRef(0)
  const idleY = useRef(0)
  const boost = useRef(0)

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05)
    const t = state.clock.elapsedTime
    const reduced = sceneState.reducedMotion
    const active = sceneState.visible
    const pointer = sceneState.pointer
    const hovered = sceneState.hoveredNodeId
    const dpr = state.gl.getPixelRatio()

    // Twinkle timers + breathing glow for every registered material.
    boost.current = damp(boost.current, hovered != null ? 1 : 0, 0.5, dt)
    for (const entry of sceneState.materials) {
      const material = entry.material
      if (material.uniforms) {
        material.uniforms.uTime.value = reduced ? 0 : t
        material.uniforms.uPixelRatio.value = dpr
      }
      if (entry.pulse) {
        let opacity = entry.base ?? 0.8
        if (!reduced) opacity *= 1 + 0.07 * Math.sin(t * 0.65 + entry.phase)
        if (entry.hover && !reduced) opacity *= 1 + 0.12 * boost.current
        material.opacity = opacity
      }
    }

    if (active) {
      const group = sceneState.rootGroup
      if (group) {
        if (!reduced) {
          // Gentle idle rotation + damped cursor parallax.
          idleY.current += dt * 0.028
          px.current = damp(px.current, pointer.x, 0.6, dt)
          py.current = damp(py.current, pointer.y, 0.6, dt)
          group.rotation.y = idleY.current + px.current * 0.3
          group.rotation.x = damp(group.rotation.x, 0.1 + py.current * 0.18, 0.6, dt)
          group.position.y = Math.sin(t * 0.45) * 0.05
          group.position.x = damp(group.position.x, px.current * 0.08, 0.5, dt)
        } else {
          px.current = 0
          py.current = 0
          group.rotation.y = damp(group.rotation.y, 0, 0.4, dt)
          group.rotation.x = damp(group.rotation.x, 0.1, 0.4, dt)
          group.position.x = damp(group.position.x, 0, 0.4, dt)
          group.position.y = damp(group.position.y, 0, 0.4, dt)
        }
        group.updateMatrixWorld(false)
      }

      // Background starfield drifts softly against the cursor.
      const stars = sceneState.starfield
      if (stars) {
        if (!reduced) stars.rotation.y += dt * 0.008
        stars.position.x = damp(stars.position.x, pointer.x * 0.35, 0.4, dt)
        stars.position.y = damp(stars.position.y, -pointer.y * 0.25, 0.4, dt)
      }

      // Decoupled slow spins: wireframe shells + orbital rings.
      if (!reduced) {
        for (const sp of sceneState.spinners) sp.object.rotation.y += dt * sp.speed
        for (const ring of sceneState.rings) ring.spin.rotation.z += dt * ring.speed
      }
    }

    // Hovered connections brighten; everything else rests.
    if (sceneState.highlightMat) {
      sceneState.highlightMat.opacity = damp(
        sceneState.highlightMat.opacity,
        hovered != null ? 0.85 : 0,
        0.5,
        dt,
      )
    }

    // Node hover: brighten + scale the active node, tint its neighbours.
    for (const [id, node] of sceneState.nodeMaterials) {
      let intensity = 1
      if (hovered != null) {
        if (id === hovered) intensity = 1.55
        else if (node.neighborSet.has(hovered)) intensity = 1.22
      }
      node.mat.color.copy(node.base).multiplyScalar(intensity)
      node.mat.opacity = damp(node.mat.opacity, node.baseOpacity * (0.9 + 0.18 * (intensity - 1)), 0.5, dt)
      const targetScale = node.baseScale * (1 + 0.45 * (intensity - 1))
      node.mesh.scale.setScalar(damp(node.mesh.scale.x, targetScale, 0.5, dt))
    }

    // Signals hop node-to-node; a hovered node makes touching ones faster.
    if (active && !reduced) {
      for (const sig of sceneState.signals) {
        for (let i = 0; i < sig.count; i++) {
          const signal = sig.signalsData[i]
          const [a, b] = sig.edges[signal.edge]
          const touching = hovered != null && (a === hovered || b === hovered)
          signal.t += dt * signal.speed * (touching ? 1.6 : 1)
          if (signal.t >= 1) {
            const options = sig.adjByTarget[signal.edge]
            if (options && options.length > 0) {
              signal.edge = options[(Math.random() * options.length) | 0]
            }
            signal.t -= 1
          }
          const base = signal.edge * 3
          const m = signal.t
          sig.positions[i * 3] = sig.endA[base] + (sig.endB[base] - sig.endA[base]) * m
          sig.positions[i * 3 + 1] = sig.endA[base + 1] + (sig.endB[base + 1] - sig.endA[base + 1]) * m
          sig.positions[i * 3 + 2] = sig.endA[base + 2] + (sig.endB[base + 2] - sig.endA[base + 2]) * m
        }
        sig.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return null
}