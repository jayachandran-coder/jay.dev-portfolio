import { Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'Contact',  href: '#contact' },
];

const socialLinks = [
  { Icon: FaGithub,   href: 'https://github.com/jayachandran-coder/', label: 'GitHub' },
  { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/jay-vib-koder/', label: 'LinkedIn' },
  { Icon: FaInstagram, href: 'https://www.instagram.com/', label: 'Instagram' },
];

const handleScrollTo = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo */}
          <div className="text-2xl font-black tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-slate-200">JAY</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-400">.DEV</span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-slate-400 hover:text-brand-400 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Socials & Admin */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-500/50 hover:border-brand-500 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <Link
              to="/admin"
              className="text-xs font-semibold text-slate-500 hover:text-brand-400 border border-slate-700/50 hover:border-brand-500/50 px-3 py-1.5 rounded-full transition-colors flex items-center gap-2"
            >
              Admin Panel
            </Link>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Jay.dev. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-brand-500 mx-1" /> and React.
          </p>
        </div>
      </div>
    </footer>
  );
}
