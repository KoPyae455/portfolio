import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { sceneState } from './sceneState'
import { getTier } from './config'
import { buildCore } from './coreData'
import NeuralCoreScene from './NeuralCoreScene'
import NeuralCoreLabels from './NeuralCoreLabels'
import NeuralLoading from './NeuralLoading'

const _raycaster = new THREE.Raycaster()
const _ndc = new THREE.Vector2()

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

class NeuralCoreErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    // Keep the page usable even if the GPU context is destroyed mid-session.
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

/** Decorative fallback for targets without WebGL. */
function StaticNeuralFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-44 w-44">
        <div className="absolute inset-0 animate-pulse rounded-full border border-cyan-400/20" />
        <div className="absolute inset-5 rounded-full border border-blue-400/10" />
        <div className="absolute inset-10 rounded-full border border-cyan-400/10" />
        <div className="absolute inset-[38%] animate-pulse rounded-full bg-cyan-400/20 blur-md" />
      </div>
    </div>
  )
}

/**
 * Host for the interactive AI Neural Core:
 * - responsive performance tier (desktop / tablet / mobile)
 * - IntersectionObserver pauses the render logic below the fold
 * - respects prefers-reduced-motion via framer-motion
 * - container-level pointer raycast for node hover (canvas itself stays
 *   pointer-events: none, so touch scrolling is never blocked)
 * - smooth glow skeleton until the first frame, static fallback without WebGL
 */
export default function NeuralCoreVisual() {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [tier, setTier] = useState(() => getTier())
  const [ready, setReady] = useState(false)
  const [webgl] = useState(supportsWebGL)
  const [failed, setFailed] = useState(false)

  const data = useMemo(() => buildCore(tier), [tier])

  // Re-evaluate tier when the viewport crosses a breakpoint.
  useEffect(() => {
    const onResize = () => setTier(getTier())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Pause per-frame work while the hero is scrolled out of view.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        sceneState.visible = entry.isIntersecting
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    sceneState.reducedMotion = !!reducedMotion
  }, [reducedMotion])

  useEffect(
    () => () => {
      sceneState.pointer.x = 0
      sceneState.pointer.y = 0
      sceneState.hoverFromLabel = false
      sceneState.setHovered(null)
      sceneState.camera = null
      sceneState.nodeMeshes.length = 0
    },
    [],
  )

  const handlePointerMove = (e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    sceneState.pointer.x = x
    sceneState.pointer.y = y

    if (sceneState.hoverFromLabel) return
    const camera = sceneState.camera
    const meshes = sceneState.nodeMeshes
    if (!camera || meshes.length === 0) return
    _ndc.set(x, y)
    _raycaster.setFromCamera(_ndc, camera)
    const hit = _raycaster.intersectObjects(meshes, false)[0]
    const id = hit ? hit.object.userData.nodeId : null
    if (id !== sceneState.hoveredNodeId) sceneState.setHovered(id)
    const cursor = id != null ? 'pointer' : ''
    if (el.style.cursor !== cursor) el.style.cursor = cursor
  }

  const handlePointerLeave = () => {
    sceneState.pointer.x = 0
    sceneState.pointer.y = 0
    sceneState.hoverFromLabel = false
    sceneState.setHovered(null)
    if (containerRef.current) containerRef.current.style.cursor = ''
  }

  const showCanvas = webgl && !failed

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {showCanvas && (
        <NeuralCoreErrorBoundary fallback={<StaticNeuralFallback />}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Canvas
              dpr={tier.dpr}
              camera={{ position: [0, 0, 7.6], fov: 42, near: 0.1, far: 60 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              onCreated={({ camera }) => {
                sceneState.camera = camera
                setReady(true)
              }}
            >
              <NeuralCoreScene data={data} tier={tier} />
            </Canvas>
          </div>
        </NeuralCoreErrorBoundary>
      )}

      {!showCanvas && <StaticNeuralFallback />}
      <NeuralLoading visible={!ready && showCanvas} />
      <NeuralCoreLabels targetIndices={data.labelTargets} />
    </div>
  )
}