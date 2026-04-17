import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: 'Home', href: '#hero' },
  { title: 'About', href: '#about' },
  { title: 'Projects', href: '#projects' },
  { title: 'Skills', href: '#skills' },
  { title: 'Reviews', href: '#reviews' },
  { title: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleMobileNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-black tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
          <span className="text-slate-900 dark:text-white">JAY</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-400">.DEV</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.title}
                href={link.href}
                className={`relative text-[15px] font-semibold transition-colors py-2 group ${isActive ? 'text-brand-500' : 'text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400'}`}
              >
                {link.title}
                {/* Smooth Hover/Active Underline Effect */}
                <span className={`absolute left-0 bottom-0 h-[2px] bg-brand-500 transition-all duration-300 ease-out rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            );
          })}
        </div>

        {/* Contact Icons (Right Side) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+917339361301"
            className="flex items-center justify-center p-2.5 min-w-[44px] min-h-[44px] rounded-full border border-brand-500/20 bg-brand-500/5 hover:bg-brand-500/10 transition-all group"
            title="Call Me"
          >
            <div className="text-brand-500 group-hover:scale-110 transition-transform">
              <PhoneCall size={20} />
            </div>
          </a>
          <a
            href="https://wa.me/917339361301"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2.5 min-w-[44px] min-h-[44px] rounded-full border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all group"
            title="WhatsApp Me"
          >
            <div className="text-green-500 group-hover:scale-110 transition-transform">
              <FaWhatsapp size={22} />
            </div>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full overflow-hidden border-b border-white/20 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    className={`text-lg font-semibold py-3 border-b transition-colors ${isActive ? 'text-brand-500 border-brand-500/30' : 'text-slate-800 dark:text-slate-200 border-black/5 dark:border-white/5'}`}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                  >
                    {link.title}
                  </a>
                );
              })}
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="tel:+917339361301"
                  className="flex-1 flex items-center gap-2 text-lg font-bold text-brand-500 p-4 rounded-xl bg-brand-500/10 justify-center hover:bg-brand-500/20 transition-colors"
                >
                  <PhoneCall size={22} />
                  <span>Call</span>
                </a>
                <a
                  href="https://wa.me/917339361301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center gap-2 text-lg font-bold text-green-500 p-4 rounded-xl bg-green-500/10 justify-center hover:bg-green-500/20 transition-colors"
                >
                  <FaWhatsapp size={22} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
