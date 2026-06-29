import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaRocket, FaRobot, FaCode, FaVrCardboard } from 'react-icons/fa';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3">
              <FaGraduationCap className="text-accent" />
              Education
            </h2>
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/50 transition-colors shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-primary/20 text-primary">
                    <FaCode size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">NCC Education</h3>
                    <p className="text-primary font-medium">Level 4 Diploma in Computing</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mt-4">
                  <strong className="text-gray-200">Core Focus:</strong> Artificial Intelligence Fundamentals, Software Engineering, Advanced Programming, and Web Development.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-accent/50 transition-colors shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-accent/20 text-accent">
                    <FaBriefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Lincoln University</h3>
                    <p className="text-accent font-medium">Diploma in Business Management</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mt-4">
                  <strong className="text-gray-200">Core Focus:</strong> Strategic Management, Business Operations, and bridging the gap between technical execution and business objectives.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3">
              <FaRocket className="text-primary" />
              Featured AI Projects
            </h2>
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/50 transition-colors shadow-lg group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                    <FaVrCardboard size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Robot Vision System</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mt-4">
                  Architecting a multi-modal AI control system for humanoid robotics, integrating Vision-Language-Action models with edge computing to enable autonomous 3D environment mapping, real-time object manipulation, and semantic task planning.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-accent/50 transition-colors shadow-lg group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-accent/20 text-accent group-hover:scale-110 transition-transform">
                    <FaRobot size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Autonomous AI Agents</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mt-4">
                  Developing multi-agent systems to automate complex, multi-step reasoning tasks and autonomously handle robust frontend code generation workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
