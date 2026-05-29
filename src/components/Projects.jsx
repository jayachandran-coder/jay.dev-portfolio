import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

function ProjectImages({ project }) {
  const images = Array.isArray(project.imgs) && project.imgs.length > 0 
    ? project.imgs 
    : [project.img];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play sliding effect
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-video overflow-hidden bg-slate-900/50 flex items-center justify-center group/slider"
    >
      {/* Sliding Image Animation Container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {images.length <= 1 ? (
          <img 
            src={images[0]} 
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${project.title} - Screenshot ${currentIndex + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full h-full object-cover absolute"
              loading="lazy"
              decoding="async"
            />
          </AnimatePresence>
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover/slider:opacity-60 transition-opacity pointer-events-none"></div>

      {/* Tech Tags */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
        {project.tags && project.tags.map(tag => (
          <span key={tag} className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md rounded-full text-white border border-white/10">
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow Navigation */}
      {images.length > 1 && (
        <>
          <button 
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-brand-500/80 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-sm z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-brand-500/80 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-sm z-10 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
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
              {/* Sliding Image Gallery */}
              <ProjectImages project={project} />

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
