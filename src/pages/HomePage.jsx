import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Blog from '../components/Blog'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <div className="space-y-32">
      <Hero />
      <Experience />
      <Skills />
      <Blog />
      <Contact />
    </div>
  )
}
