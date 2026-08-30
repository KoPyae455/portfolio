import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { sceneState } from './sceneState'

// Minimal system indicators floating around the core. Each label highlights
// its neural node (and neighbours) on hover/focus via the shared hover store.
const LABELS = [
  { id: 'perception', text: 'PERCEPTION', className: 'left-[4%] top-[6%]', drift: [9, 5] },
  { id: 'reasoning', text: 'REASONING', className: 'right-[5%] top-[13%]', drift: [-8, 4] },
  { id: 'learning', text: 'LEARNING', className: 'right-[7%] bottom-[16%]', drift: [-7, -5] },
  { id: 'planning', text: 'PLANNING', className: 'left-[5%] bottom-[22%]', drift: [8, -4] },
]

export default function NeuralCoreLabels({ targetIndices }) {
  const reducedMotion = useReducedMotion()
  const layerRefs = useRef([])

  // Foreground parallax: labels drift gently against the cursor.
  useEffect(() => {
    let raf = 0
    const step = () => {
      if (!sceneState.reducedMotion) {
        const { x, y } = sceneState.pointer
        layerRefs.current.forEach((el, i) => {
          if (!el) return
          const [dx, dy] = LABELS[i].drift
          el.style.transform = `translate3d(${(-x * dx).toFixed(2)}px, ${(y * dy).toFixed(2)}px, 0)`
        })
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const setActive = (id) => {
    sceneState.hoverFromLabel = true
    sceneState.setHovered(id)
  }

  const clearActive = () => {
    sceneState.hoverFromLabel = false
    sceneState.setHovered(null)
  }

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-30 hidden md:block"
        aria-label="Neural core system indicators"
      >
        {LABELS.map((label, i) => (
          <div
            key={label.id}
            ref={(el) => {
              layerRefs.current[i] = el
            }}
            className={`absolute ${label.className} will-change-transform`}
          >
            <motion.div
              tabIndex={0}
              aria-label={`${label.text} — active`}
              animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
              onPointerEnter={() => setActive(targetIndices[i])}
              onPointerLeave={clearActive}
              onFocus={() => setActive(targetIndices[i])}
              onBlur={clearActive}
              className="pointer-events-auto flex select-none items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-300/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)] motion-safe:animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-gray-400">{label.text}</span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-cyan-300/80">ACTIVE</span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Tiny system-status details — deliberately minimal, never dashboard-like. */}
      <div
        aria-hidden="true"
        className="absolute right-2 top-2 z-30 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 backdrop-blur-sm sm:right-4 sm:top-4"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] motion-safe:animate-pulse" />
        <span className="font-mono text-[10px] tracking-[0.18em] text-gray-400">
          SYSTEM STATUS · ONLINE
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-2 z-30 hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 backdrop-blur-sm sm:bottom-3 sm:left-4 sm:flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.9)] motion-safe:animate-pulse" />
        <span className="font-mono text-[10px] tracking-[0.18em] text-gray-400">
          NEURAL CORE · ACTIVE
        </span>
      </div>
    </>
  )
}