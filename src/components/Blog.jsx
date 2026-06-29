import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBookOpen, FaArrowRight } from 'react-icons/fa'
import { BLOG_POSTS } from '../data/blogPosts'

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <FaBookOpen className="text-accent" />
          Latest Insights
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.slug}
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
              
              <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-accent font-medium hover:text-white transition-colors">
                Read Article
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
