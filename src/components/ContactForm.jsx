import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ContactForm({ isRetroMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={`w-full py-20 transition-colors duration-700 ${
      isRetroMode ? 'bg-[#F8F7FF]' : 'bg-cinematic-bg'
    }`} id="contact">
      <div className="max-w-[1000px] mx-auto px-6">
        <ScrollReveal>
          <div className={`border rounded-2xl p-8 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-colors duration-700 ${
            isRetroMode ? 'bg-white border-[#D5D0F6]' : 'bg-cinematic-card border-cinematic-border'
          }`}>
            
            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className={`font-accent text-xs font-bold tracking-widest block ${
                isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'
              }`}>// STUDIO CONNECT</span>
              
              <h2 className={`font-heading font-extrabold text-3xl md:text-4xl tracking-tight uppercase ${
                isRetroMode ? 'text-[#1E2749]' : 'text-white'
              }`}>
                START A PROJECT
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <Mail size={16} className={isRetroMode ? 'text-[#6C5CE7]' : 'text-gold-accent'} />
                <a href="mailto:raaghavbisht@gmail.com" className={`font-bold text-sm transition-colors ${
                  isRetroMode ? 'text-[#1E2749] hover:text-[#6C5CE7]' : 'text-white hover:text-gold-accent'
                }`}>
                  raaghavbisht@gmail.com
                </a>
              </div>
            </div>

            {/* Form Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name / Agency"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-colors ${
                    isRetroMode 
                      ? 'bg-[#F8F7FF] border-[#D5D0F6] text-[#1E2749] placeholder-[#94A3B8] focus:border-[#6C5CE7]' 
                      : 'bg-cinematic-bg border-cinematic-border text-white placeholder-white/30 focus:border-gold-accent'
                  }`}
                />

                <input 
                  type="email" 
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-colors ${
                    isRetroMode 
                      ? 'bg-[#F8F7FF] border-[#D5D0F6] text-[#1E2749] placeholder-[#94A3B8] focus:border-[#6C5CE7]' 
                      : 'bg-cinematic-bg border-cinematic-border text-white placeholder-white/30 focus:border-gold-accent'
                  }`}
                />
              </div>

              <textarea 
                rows={3}
                required
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-colors ${
                  isRetroMode 
                    ? 'bg-[#F8F7FF] border-[#D5D0F6] text-[#1E2749] placeholder-[#94A3B8] focus:border-[#6C5CE7]' 
                    : 'bg-cinematic-bg border-cinematic-border text-white placeholder-white/30 focus:border-gold-accent'
                }`}
              />

              <button 
                type="submit" 
                className={`w-full py-3.5 rounded-full font-accent text-sm font-bold tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
                  isRetroMode 
                    ? 'bg-[#6C5CE7] text-white hover:bg-[#5B4BC4]' 
                    : 'bg-gold-accent text-cinematic-bg hover:bg-white'
                }`}
              >
                Send Inquiry <Send size={15} />
              </button>

              {submitted && (
                <p className="text-center font-accent text-xs font-bold text-emerald-500 mt-1">
                  Inquiry sent! Raaghav will reach out shortly.
                </p>
              )}

            </form>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
