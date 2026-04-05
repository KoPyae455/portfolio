import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: "Multi-Agent AI System",
    description: "A production-grade Streamlit application featuring a ChatGPT-style interface that leverages LangGraph and CrewAI to coordinate multiple AI agents for code execution and data analysis.",
    tags: ["Python", "Streamlit", "LangGraph", "Multi-Agent"],
    github: "#",
    live: "#"
  },
  {
    title: "Personal Learning Path Architect",
    description: "An end-to-end AI Agent using Python, LangChain, and ReAct to generate structured study plans and discover optimal learning resources autonomously.",
    tags: ["LLM", "LangChain", "ReAct", "ChromaDB"],
    github: "#",
    live: "#"
  },
  {
    title: "Computer Vision Analysis",
    description: "Advanced image processing pipeline for real-time object detection and classification leveraging CUDA acceleration and PyTorch.",
    tags: ["Computer Vision", "PyTorch", "CUDA", "Python"],
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <Briefcase className="text-accent" />
          Featured Work
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-surface border border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <a href={project.github} className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={project.live} className="text-gray-400 hover:text-white transition-colors" aria-label="Live Demo">
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
