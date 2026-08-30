import { useEffect, useRef } from 'react'
import { sceneState } from './sceneState'
import NeuralCore from './NeuralCore'
import NeuralNetwork from './NeuralNetwork'
import NeuralSignals from './NeuralSignals'
import AmbientParticles from './AmbientParticles'
import NeuralCoreRig from './NeuralCoreRig'

/** Composes the whole 3D scene inside <Canvas>. */
export default function NeuralCoreScene({ data, tier }) {
  const rootRef = useRef(null)

  useEffect(
    () => () => {
      // Clear per-frame registries so stale refs never leak between mounts.
      sceneState.rootGroup = null
      sceneState.camera = null
      sceneState.highlightMat = null
      sceneState.nodeMeshes.length = 0
      sceneState.nodeMaterials.clear()
      sceneState.rings.length = 0
      sceneState.signals.length = 0
      sceneState.spinners.length = 0
    },
    [],
  )

  // Ref callback (not an effect) so the rig owns the group before its first
  // frame. Layout data is built once in the host and passed down.
  const assignRoot = (el) => {
    if (el) sceneState.rootGroup = el
    else if (sceneState.rootGroup === rootRef.current) sceneState.rootGroup = null
    rootRef.current = el
  }

  return (
    <>
      <group ref={assignRoot} rotation={[0, 0, 0.1]} scale={tier.sceneScale}>
        <NeuralCore data={data} />
        <NeuralNetwork data={data} />
        <NeuralSignals data={data} tier={tier} />
      </group>
      <AmbientParticles count={tier.ambient} />
      <NeuralCoreRig />
    </>
  )
}