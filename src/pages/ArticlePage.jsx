import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BLOG_POSTS } from '../data/blogPosts'

export default function ArticlePage() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find((item) => item.slug === slug)

  if (!post) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Article not found</h1>
        <p className="text-gray-400">The article you are looking for does not exist yet. Please return to the blog page.</p>
        <Link to="/blog" className="inline-block text-accent font-semibold hover:text-white">
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <p className="text-sm text-gray-500 mb-3">{post.date} · {post.readTime}</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {post.content.split('\n\n').map((paragraph, index) => (
        <p key={index} className="text-gray-300 leading-relaxed">{paragraph}</p>
      ))}

      <Link to="/blog" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-white">
        ← Back to Blog
      </Link>
    </motion.article>
  )
}
