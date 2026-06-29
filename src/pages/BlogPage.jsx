import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBookOpen, FaArrowRight } from 'react-icons/fa'
import { BLOG_POSTS } from '../data/blogPosts'

export default function BlogPage() {
  return (
    <section className="scroll-mt-24 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-gray-400 leading-relaxed">
            Read my latest technical articles on AI, software architecture, and performance optimization.
            Click any post to open the full article.
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative p-8 rounded-3xl bg-surface border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-colors shadow-xl"
          >
            <div className="text-sm text-gray-500 mb-4 font-mono flex items-center justify-between">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
            <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-accent font-medium hover:text-white transition-colors">
              Read Article
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
