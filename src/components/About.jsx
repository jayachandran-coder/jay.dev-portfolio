import { motion } from 'framer-motion';
import { 
  Paintbrush, 
  Gauge, 
  Smartphone
} from 'lucide-react';

const strengths = [
  { title: 'UI Design', icon: Paintbrush, desc: 'Crafting pixel-perfect layouts.' },
  { title: 'Performance', icon: Gauge, desc: 'Optimizing for speed and SEO.' },
  { title: 'Responsive', icon: Smartphone, desc: 'Flawless across all devices.' },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 h-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side: Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative glass-panel rounded-3xl p-2 border border-white/10 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
              {/* Note: In a real app you might use a different image for the about section */}
              <img 
                src="/about.png" 
                alt="About Developer" 
                className="w-full h-auto aspect-[4/5] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent rounded-2xl flex items-end p-6">
                <div className="glass-panel w-full p-5 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md">
                  <h4 className="font-bold text-lg mb-1 flex items-center gap-2">
                    <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-400"> 
                      Website Design & Development
                    </span>
                  </h4>
                  <p className="text-slate-300 text-sm mb-2">
                    Custom, responsive websites built,
                  </p>
                  <motion.p 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    className="mt-1 text-brand-400 font-extrabold tracking-wide text-[17px] origin-left"
                  >
                    Starting at ₹2,000 only
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text & Data */}
          <div>
            <div className="mb-8">
              <h3 className="text-brand-500 font-bold uppercase tracking-wider text-sm mb-3">About Me</h3>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Turning Ideas Into Websites</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Hey! I'm Jayachandran, a passionate Full Stack Web Developer who helps individuals and businesses bring their ideas to life through clean, modern websites. I specialize in building fast, responsive, and visually engaging web experiences using React, Tailwind CSS, Node.js, MongoDB, Vercel, Render, Github and more. As a fresher, I'm driven by a strong work ethic, attention to detail, and a commitment to delivering quality results for every client I work with. If you need a website that looks great and works even better — let's build it together!
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                Whether it's a sleek landing page or a complex dashboard, I leverage the latest web technologies to deliver exceptional experiences that users love.
              </p>
            </div>

            {/* Strengths Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {strengths.map((str, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass-panel p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 mb-4">
                    <str.icon size={20} />
                  </div>
                  <h4 className="text-white font-bold mb-2">{str.title}</h4>
                  <p className="text-sm text-slate-400">{str.desc}</p>
                </motion.div>
              ))}
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
