import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <section id="projects" className="py-4 md:py-8 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-500 font-bold uppercase tracking-wider text-sm mb-3"
          >
            My Works
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            Projects
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="group relative glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-brand-500/50 transition-colors duration-500 flex flex-col"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Tech Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md rounded-full text-white border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 flex-1 mb-6">
                  {project.desc}
                </p>
                
                {/* Actions */}
                <div className="flex gap-4 mt-auto">
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="w-full glass-panel bg-white/5 hover:bg-brand-500 hover:text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-slate-200 transition-all">
                    <span>View Demo</span>
                    <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-full border border-white/20 glass-panel hover:bg-white/10 flex items-center gap-3 text-white font-semibold transition-all"
          >
            <span>View More Projects</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
