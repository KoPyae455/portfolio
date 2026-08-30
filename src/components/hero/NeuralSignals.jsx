import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { sceneState } from './sceneState'
import { createHoloMaterial, mulberry32 } from './coreUtils'

/**
 * Bright particles that travel node-to-node along the synaptic web — the
 * "neural signals / information flow" layer. Advanced by the shared rig;
 * a hovered node makes touching signals subtly faster.
 */
export default function NeuralSignals({ data, tier }) {
  const count = tier.signals
  const built = useMemo(() => {
    const rng = mulberry32(99)

    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const signalColors = ['#9df0ff', '#67e8f9', '#8ab4ff']
    for (let i = 0; i < count; i++) {
      sizes[i] = 0.045 + rng() * 0.03
      phases[i] = rng() * Math.PI * 2
      const c = new THREE.Color(signalColors[i % signalColors.length])
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    const material = createHoloMaterial({ uScale: 0.9, uOpacity: 0.9 })
    const points = new THREE.Points(geometry, material)

    // Flat edge endpoint buffers for cheap per-frame interpolation.
    const endA = new Float32Array(data.edges.length * 3)
    const endB = new Float32Array(data.edges.length * 3)
    data.edges.forEach(([a, b], i) => {
      endA.set(data.nodes[a].position, i * 3)
      endB.set(data.nodes[b].position, i * 3)
    })

    // Edge continuation graph: signals hop onto an edge sharing their target.
    const adjByTarget = data.edges.map(([, b]) => {
      const options = []
      data.edges.forEach(([x, y], j) => {
        if (x === b || y === b) options.push(j)
      })
      return options
    })

    const signalsData = []
    for (let i = 0; i < count; i++) {
      signalsData.push({
        edge: Math.floor(rng() * data.edges.length),
        t: rng(),
        speed: 0.045 + rng() * 0.035,
      })
    }

    return {
      points,
      geometry,
      material,
      positions,
      signalsData,
      endA,
      endB,
      adjByTarget,
      count,
      edges: data.edges,
    }
  }, [data, count])

  useEffect(() => {
    sceneState.signals.push(built)
    const entry = { material: built.material, pulse: false }
    sceneState.materials.push(entry)
    return () => {
      const i = sceneState.signals.indexOf(built)
      if (i !== -1) sceneState.signals.splice(i, 1)
      const j = sceneState.materials.indexOf(entry)
      if (j !== -1) sceneState.materials.splice(j, 1)
    }
  }, [built])

  useEffect(
    () => () => {
      built.geometry.dispose()
      built.material.dispose()
    },
    [built],
  )

  return <primitive object={built.points} />
}