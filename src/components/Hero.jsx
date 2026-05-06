import { motion } from 'framer-motion';
import { FaNetworkWired, FaArrowRight, FaDownload } from 'react-icons/fa';

export default function Hero() {
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-start pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 font-mono text-sm text-primary shadow-lg shadow-primary/10">
          <FaNetworkWired size={16} />
          <span>AI Systems Architect & Research Engineer</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Architecting elite <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            AI experiences.
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
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
    </section>
  );
}
