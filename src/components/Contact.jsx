import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, form);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Side: Contact Info */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-500 font-bold uppercase tracking-wider text-sm mb-3"
            >
              Get In Touch
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            >
              Let's work together.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg mb-12"
            >
              Have a project in mind or want to discuss opportunities? I'm always open to talking about product design, new frameworks, and creating awesome web applications.
            </motion.p>

            <div className="flex flex-col gap-8">
              {[
                { icon: Mail, title: 'Email', data: 'jayachandranffw@gmail.com', link: 'mailto:jayachandranffw@gmail.com' },
                { icon: Phone, title: 'Phone', data: '+91 7339361301', link: 'tel:+917339361301' },
                { icon: MapPin, title: 'Location', data: 'Trichy, Tamil Nadu', link: 'https://maps.app.goo.gl/H3iRmQpZiZwsB3Mb8' },
              ].map((item, idx) => (
                <motion.a 
                  href={item.link}
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="min-w-[56px] min-h-[56px] rounded-full glass-panel border border-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">{item.title}</p>
                    <p className="text-sm sm:text-base md:text-xl text-slate-200 font-medium group-hover:text-brand-400 transition-colors break-all md:break-normal">{item.data}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.6 }}
               className="mt-12"
            >
              <a href="https://wa.me/917339361301" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-1">
                <MessageCircle size={22} fill="currentColor" />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              >
                <CheckCircle size={64} className="text-green-400" />
                <h4 className="text-2xl font-bold text-white">Message Sent!</h4>
                <p className="text-slate-400">Your email client opened with your message. I'll get back to you soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Your Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all backdrop-blur-sm"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Your Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all backdrop-blur-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Message</label>
                  <textarea 
                    rows="5"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    className="bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all backdrop-blur-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className={`group w-full py-4 mt-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
