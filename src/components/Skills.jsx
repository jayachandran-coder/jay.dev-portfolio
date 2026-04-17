import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, 
  FaFigma, FaHtml5, FaCss3Alt, FaJs 
} from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiMongodb } from 'react-icons/si';

const skills = [
  { name: 'React', icon: FaReact, color: 'text-sky-400' },
  { name: 'JavaScript', icon: FaJs, color: 'text-yellow-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-400' },
  { name: 'Python', icon: FaPython, color: 'text-blue-400' },
  { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
  { name: 'HTML', icon: FaHtml5, color: 'text-orange-500' },
  { name: 'CSS', icon: FaCss3Alt, color: 'text-blue-500' },
  { name: 'Figma', icon: FaFigma, color: 'text-purple-500' },
  { name: 'PostgreSQL', icon: SiMongodb, color: 'text-blue-500' },

];

export default function Skills() {
  return (
    <section id="skills" className="py-4 md:py-8 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-500 font-bold uppercase tracking-wider text-sm mb-3"
          >
            My Arsenal
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            Technical Skills
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="group relative glass-panel rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-white/10 hover:border-brand-500/50 hover:bg-white/5 transition-all duration-300"
              >
                <div className={`text-4xl ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon />
                </div>
                <span className="text-slate-300 font-medium tracking-wide">
                  {skill.name}
                </span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/5 rounded-2xl transition-colors duration-300"></div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
