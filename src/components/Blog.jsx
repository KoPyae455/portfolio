import { motion } from 'framer-motion';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';

const BLOG_POSTS = [
  {
    title: "Fine-Tuning Meta LLaMA 3: A Practical Guide",
    excerpt: "Exploring the nuances of LoRA fine-tuning for large language models to achieve state-of-the-art performance on consumer hardware.",
    date: "May 1, 2026",
    readTime: "8 min read",
    tags: ["LLM", "PyTorch", "LoRA"],
    link: "#"
  },
  {
    title: "Architecting Multi-Agent Systems with LangGraph",
    excerpt: "How to coordinate multiple autonomous agents to handle complex reasoning tasks and orchestrate intelligent workflows.",
    date: "April 15, 2026",
    readTime: "12 min read",
    tags: ["AI Agents", "Python", "LangGraph"],
    link: "#"
  },
  {
    title: "Optimizing Computer Vision Pipelines with CUDA",
    excerpt: "A deep dive into accelerating real-time object detection and image processing workflows using custom GPU acceleration.",
    date: "March 28, 2026",
    readTime: "10 min read",
    tags: ["Computer Vision", "CUDA", "Performance"],
    link: "#"
  }
];

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <FaBookOpen className="text-accent" />
          Latest Insights
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors flex flex-col h-full shadow-lg"
            >
              <div className="text-sm text-gray-500 mb-4 flex items-center justify-between font-mono">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-400 mb-8 line-clamp-3 flex-grow leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
              
              <a href={post.link} className="inline-flex items-center gap-2 text-accent font-medium hover:text-white transition-colors">
                Read Article
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
