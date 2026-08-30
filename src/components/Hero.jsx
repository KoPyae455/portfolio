import { lazy, Suspense, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FaNetworkWired, FaArrowRight, FaDownload } from 'react-icons/fa'
import NeuralLoading from './hero/NeuralLoading'

const NeuralCoreVisual = lazy(() => import('./hero/NeuralCoreVisual'))

export default function Hero() {
  const visualRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start start', 'end start'],
  })
  // Subtle scroll experience: the core scales down and fades as the hero leaves.
  const visualOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.05])
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex items-center pt-24 pb-16 relative"
    >
      <div className="grid lg:grid-cols-[1.02fr_1fr] gap-8 lg:gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 font-mono text-sm text-primary shadow-lg shadow-primary/10">
            <FaNetworkWired size={16} />
            <span>AI Systems Architect & Research Engineer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-8">
            Architecting elite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              AI experiences.
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-xl mb-12 leading-relaxed">
            I uniquely combine technical expertise with business acumen to build AI systems that drive real-world value. With a sharp focus on Deep Learning, Computer Vision, and Autonomous AI Agents, I am engineering the next generation of intelligent software.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#experience" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
              View My Roadmap
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">
              <FaDownload className="group-hover:-translate-y-1 transition-transform" />
              Resume
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl bg-transparent text-gray-300 font-bold hover:text-white transition-colors">
              Contact Me
            </a>
          </div>
        </motion.div>

        <div ref={visualRef} className="relative">
          <motion.div
            style={reducedMotion ? undefined : { opacity: visualOpacity, scale: visualScale }}
            className="relative h-[420px] sm:h-[480px] lg:h-[540px] overflow-hidden"
          >
            <Suspense fallback={<NeuralLoading visible />}>
              <NeuralCoreVisual />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
