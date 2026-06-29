import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-surface/30 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Ko Pyae
            </span>
          </div>
          
          <div className="text-gray-400 text-sm font-medium">
            © {currentYear} Ko Pyae. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/KoPyae455" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <FaGithub size={22} />
            </a>
            <a href="https://www.linkedin.com/in/ko-pyae-577308260/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0a66c2] transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={22} />
            </a>
            <a href="mailto:kopyaegtr455@gmail.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
