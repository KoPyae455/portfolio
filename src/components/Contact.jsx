import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
          <Send className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-gray-400 text-lg mb-10">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
        </p>

        <a
          href="mailto:kopyaegtr455@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:opacity-90 transition-opacity mb-12 shadow-lg shadow-primary/25"
        >
          <Mail size={20} />
          Say Hello
        </a>

        <div className="flex justify-center items-center gap-6">
          <a href="https://github.com/KoPyae455" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/ko-pyae-577308260/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-surface border border-white/5 text-gray-400 hover:text-blue-400 hover:border-blue-400/50 transition-all">
            <Linkedin size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
