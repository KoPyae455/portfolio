import { motion } from 'framer-motion';
import { GraduationCap, Map, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <BookOpen className="text-accent" />
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
            <p>
              I am passionate about creating software that bridges the gap between complex artificial intelligence algorithms and seamless user experiences. 
            </p>
            <p>
              My journey involves exploring bleeding-edge technology, from developing LangGraph multi-agent systems to designing sleek Single Page Applications that showcase their power.
            </p>
            <p>
              Currently, I am focused on continuous learning, architecting smarter systems, and building interactive web platforms that define the next generation of software.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/20 text-primary">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <p className="text-gray-400">
                Focused on Computer Science, specializing in Data Science, Computing Architectures, and advanced AI methodologies. NCC Level 4 Diploma in Computing.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-accent/20 text-accent">
                  <Map size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Roadmap</h3>
              </div>
              <p className="text-gray-400">
                Pioneering the intersection of Machine Learning (Computer Vision, Generative AI) and robust frontend engineering (React, Next.js, immersive 3D UIs).
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
