import { motion } from 'framer-motion';
import { 
  FaBrain, FaRobot, FaDatabase, FaCode, FaCogs, 
  FaPython, FaHtml5, FaCss3Alt, FaUbuntu, FaWindows, 
  FaGitAlt, FaDocker, FaEye, FaChartLine, FaProjectDiagram,
  FaMicrochip, FaSearch, FaNetworkWired
} from 'react-icons/fa';
import { 
  SiJavascript, SiPytorch, SiTensorflow, SiScikitlearn, 
  SiNumpy, SiPandas, SiOpencv, SiMongodb, SiRedis
} from 'react-icons/si';

const SKILL_CATEGORIES = [
  {
    title: "Core AI & Machine Learning",
    icon: FaBrain,
    color: "text-primary",
    skills: [
      { name: "Computer Vision & Deep Learning (CNNs, Object Detection)", icon: FaEye, color: "text-[#3b82f6]" },
      { name: "Image Processing Workflows", icon: SiOpencv, color: "text-[#5C3EE8]" },
      { name: "Reinforcement Learning (PPO / DQN algorithms)", icon: FaChartLine, color: "text-[#10b981]" },
      { name: "Supervised/Unsupervised Learning", icon: FaProjectDiagram, color: "text-[#8b5cf6]" },
      { name: "OCR & Feature Engineering", icon: FaSearch, color: "text-[#f59e0b]" }
    ]
  },
  {
    title: "LLMs & Autonomous Systems",
    icon: FaRobot,
    color: "text-accent",
    skills: [
      { name: "Meta LLaMA 3 Implementation", icon: FaRobot, color: "text-[#0668E1]" },
      { name: "LoRA Fine-Tuning", icon: FaCogs, color: "text-[#d946ef]" },
      { name: "RAG (Retrieval-Augmented Generation)", icon: FaDatabase, color: "text-[#14b8a6]" },
      { name: "AI Agent Frameworks & Workflows", icon: FaProjectDiagram, color: "text-[#f43f5e]" }
    ]
  },
  {
    title: "Databases & Vector Memory",
    icon: FaDatabase,
    color: "text-[#14b8a6]",
    skills: [
      { name: "SQL (Relational)", icon: FaDatabase, color: "text-[#336791]" },
      { name: "MongoDB (NoSQL)", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Redis", icon: SiRedis, color: "text-[#DC382D]" },
      { name: "FAISS & ChromaDB", icon: FaNetworkWired, color: "text-[#8b5cf6]" }
    ]
  },
  {
    title: "Tech Stack & Engineering",
    icon: FaCode,
    color: "text-[#3b82f6]",
    skills: [
      { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
      { name: "JavaScript (ES6+) / HTML5 / CSS3", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "PyTorch & TensorFlow", icon: SiPytorch, color: "text-[#EE4C2C]" },
      { name: "Scikit-learn, NumPy, Pandas", icon: SiNumpy, color: "text-[#013243]" },
      { name: "Matplotlib & Seaborn", icon: FaChartLine, color: "text-[#11557c]" },
      { name: "CUDA Programming (GPU)", icon: FaMicrochip, color: "text-[#76B900]" },
      { name: "Ubuntu Linux & Windows", icon: FaUbuntu, color: "text-[#E95420]" }
    ]
  },
  {
    title: "MLOps & System Architecture",
    icon: FaCogs,
    color: "text-[#f59e0b]",
    skills: [
      { name: "Containerization (Docker) & Deployments", icon: FaDocker, color: "text-[#2496ED]" },
      { name: "Data Version Control & Tracking", icon: FaGitAlt, color: "text-[#F05032]" },
      { name: "System Monitoring & Pipeline Orchestration", icon: FaProjectDiagram, color: "text-[#10b981]" },
      { name: "Distributed ML Workloads", icon: FaNetworkWired, color: "text-[#6366f1]" }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
          <FaBrain className="text-primary" />
          Technical Arsenal
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-xl bg-white/5 ${category.color}`}>
                  <category.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {category.title}
                </h3>
              </div>
              
              <ul className="space-y-5">
                {category.skills.map(item => (
                  <li key={item.name} className="flex items-start gap-4 text-gray-300 group">
                    <div className={`mt-1 ${item.color}`}>
                      <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium text-[15px] leading-relaxed group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
