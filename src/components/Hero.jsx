import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Code2, Braces, Terminal, LayoutTemplate, Fingerprint, ArrowRight, Download } from 'lucide-react';

// To use your custom logos, upload them to the 'public' folder. 
// Then, replace 'Icon' with 'imgSrc: "/your-logo.png"'. Example:
// { imgSrc: "/my-custom-logo.png", startX: -200, startY: -200 }
const icons = [
  { imgSrc: "/react.png", startX: -200, startY: -200 },
  { imgSrc: "/js.png", startX: 200, startY: -200 },
  { imgSrc: "/node-js.png", startX: 200, startY: 200 },
  { imgSrc: "/git.png", startX: -200, startY: 200 },
  { imgSrc: "/mongodb.png", startX: 0, startY: -250 }
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="hero" className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 overflow-hidden relative">
      
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-center relative z-10">
        
        {/* Profile & Orbit */}
        <div className="order-1 md:order-2 relative flex items-center justify-center min-h-[350px] md:min-h-[600px] w-full scale-[0.6] sm:scale-75 md:scale-100 origin-center transition-transform duration-500 mt-8 md:mt-0">
          {/* Profile Image container */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 shrink-0 w-[25rem] h-[25rem] md:w-72 md:h-72 lg:w-[26rem] lg:h-[26rem]"
          >
            <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-2xl animate-pulse" />
            <div className="relative w-full h-full rounded-full border-4 border-white/10 p-2 glass-panel overflow-hidden">
              <img 
                src="/profile.png" 
                alt="Developer Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Tech Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {icons.map((item, i) => {
              const angle = (i / icons.length) * 360;
              const radius = isMobile ? 240 : 265; // Dynamically shrinking radius on mobile
              
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-center"
                  style={{ rotate: angle }}
                >
                  <motion.div
                    className="absolute w-12 h-12 md:w-16 md:h-16 bg-white/5 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    initial={{ y: item.startY, x: item.startX, opacity: 0, scale: 0 }}
                    animate={{ y: -radius, x: "-50%", opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.8 + i * 0.15, 
                      duration: 1, 
                      type: "spring", 
                      stiffness: 70 
                    }}
                    style={{ marginLeft: "-50%" }}
                  >
                    <motion.div
                      initial={{ rotate: -angle }}
                      animate={{ rotate: -angle - 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="flex items-center justify-center w-full h-full"
                    >
                      {item.imgSrc ? (
                        <img 
                          src={item.imgSrc} 
                          alt="orbit logo" 
                          className="w-7 h-7 object-contain drop-shadow-lg" 
                        />
                      ) : (
                        item.Icon && <item.Icon size={24} color={item.color} className="drop-shadow-lg" />
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.4 }
            }
          }}
          className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left z-20"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20, x: 50 },
              visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="inline-block px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-500 dark:text-brand-100 font-medium text-sm mb-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          >
            Available for New Projects
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 leading-tight"
          >
            Hi, I'm <span className="text-brand-500">Jay</span>
          </motion.h1>
          
          <motion.h2 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6"
          >
            Web Developer
          </motion.h2>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mb-10 text-lg leading-relaxed"
          >
            Crafting end-to-end web experiences with modern frontend design and robust backend architecture. Focused on performance, scalability, and real-world impact.
          </motion.p>
          
          <motion.div 
             variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            <a href="#projects" className="group w-full sm:w-auto relative px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 min-w-[44px] min-h-[44px]">
              <span className="relative z-10">View Projects</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-brand-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>
            
            <a 
              href="/resume.pdf" 
              download="Jay_Jayachandran_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-8 py-3 rounded-full glass-panel font-semibold transition-all hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 flex items-center justify-center gap-2 min-w-[44px] min-h-[44px]"
            >
              <span>Download Resume</span>
              <Download size={18} className="group-hover:-translate-y-1 group-hover:text-brand-500 transition-all" />
            </a>
          </motion.div>

        </motion.div>
      </div>
      
    </section>
  );
}
