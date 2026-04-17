import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Send, X } from 'lucide-react';
import axios from 'axios';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Review Submisison Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5, image: null });
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/reviews?approved=true`);
      setReviews(res.data);
    } catch (err) { console.error(err); }
  }

  // Auto-slide effect
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('text', formData.text);
      payload.append('rating', formData.rating);
      if (formData.image) {
        payload.append('image', formData.image);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmitMessage('Thank you! Your review has been submitted and is pending approval.');
      setFormData({ name: '', text: '', rating: 5, image: null });
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (err) {
      setSubmitMessage('Oops! Something went wrong submitting your review.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 8000);
    }
  };

  return (
    <section id="reviews" className="py-8 md:py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-500 font-bold uppercase tracking-wider text-sm mb-3"
          >
            Client Words
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-10"
          >
            What People Say
          </motion.h2>
        </div>

        {/* Review Slider */}
        <div className="relative min-h-[450px] md:min-h-[300px] flex items-center justify-center mb-6 w-full">
          {reviews.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-full max-w-3xl glass-panel p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/20 shadow-2xl flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-center text-center md:items-start"
              >
                <Quote size={80} className="absolute top-6 right-8 text-white/5" />
                
                <div className="shrink-0 relative">
                  <div className="w-24 h-24 rounded-full p-1 glass-panel border border-brand-500/30 overflow-hidden bg-slate-800">
                    {reviews[currentIndex].image ? (
                        <img 
                          src={reviews[currentIndex].image} 
                          alt={reviews[currentIndex].name} 
                          className="w-full h-full object-cover rounded-full" 
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-brand-500/20 flex items-center justify-center text-4xl font-bold uppercase text-brand-300">
                          {reviews[currentIndex].name?.charAt(0) || "C"}
                        </div>
                    )}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-500 flex gap-0.5 px-2 py-1 rounded-full shadow-lg">
                    {[...Array(reviews[currentIndex].rating || 5)].map((_, i) => (
                       <Star key={i} size={12} fill="white" className="text-white" />
                    ))}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left pt-2 w-full">
                  <p className="text-lg md:text-xl lg:text-2xl text-slate-200 font-medium leading-relaxed mb-6">
                    "{reviews[currentIndex].text}"
                  </p>
                  <div>
                    <h4 className="text-lg font-bold text-white">{reviews[currentIndex].name}</h4>
                    <p className="text-brand-400 font-medium text-sm">{reviews[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
             <div className="text-slate-400 italic text-center w-full">Loading reviews...</div>
          )}
        </div>

        {/* Slider Indicators */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-3 mt-2 mb-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-brand-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Leave a Review Button */}
        <div className="flex justify-center mt-6">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setIsModalOpen(true)}
            className="glass-panel text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brand-500 hover:border-brand-500 transition-all duration-300 flex items-center gap-2 border border-white/10 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
               Leave a Review <Send size={18} />
            </span>
            <div className="absolute inset-0 bg-brand-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </motion.button>
        </div>

        {/* Leave a Review Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl glass-panel p-8 md:p-10 rounded-[2rem] border border-white/10 relative"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Leave a Review</h3>
                  <p className="text-slate-400 text-sm">Enjoyed working with me? Submit your feedback below.</p>
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-xl mb-6 text-sm font-semibold text-center border ${submitMessage.includes('Oops') ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-colors"
                    required
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-500/20 file:text-brand-400 hover:file:bg-brand-500/30 transition-colors"
                  />
                  
                  <textarea
                    placeholder="Your Message..."
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-colors h-32 resize-none"
                    required
                  ></textarea>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-sm">Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setFormData({...formData, rating: star})}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star size={20} fill={formData.rating >= star ? "#eab308" : "transparent"} className={formData.rating >= star ? "text-yellow-500" : "text-white/20"} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          <span>Submit</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
