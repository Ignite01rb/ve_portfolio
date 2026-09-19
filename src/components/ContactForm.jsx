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
    <section className="w-full py-20 bg-[#B81424] bg-halftone-pattern border-t-8 border-black text-black" id="contact">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="bg-white border-4 border-black p-6 sm:p-8 lg:p-12 shadow-[10px_10px_0_#000] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="font-marker text-xs text-[#E52535] font-bold tracking-widest block uppercase">
                // STUDIO CONNECT
              </span>
              
              <h2 className="font-bangers text-4xl sm:text-5xl text-black tracking-wide uppercase leading-tight">
                START A PROJECT
              </h2>

              <p className="font-comic text-xs sm:text-sm font-bold text-black/80 leading-relaxed">
                Ready to level up your video edit with high-voltage beat sync & VFX? Send your project briefing below!
              </p>

              <div className="flex items-center gap-3 mt-1 bg-[#FFDD00] text-black font-bangers text-sm sm:text-base px-4 py-2 border-2 border-black w-fit shadow-[3px_3px_0_#000]">
                <Mail size={16} />
                <a href="mailto:raaghavbisht@gmail.com" className="hover:underline">
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
                  className="w-full bg-[#FFF8E7] border-3 border-black p-3.5 text-sm font-comic font-bold text-black placeholder-black/50 outline-none focus:bg-white shadow-[3px_3px_0_#000]"
                />

                <input 
                  type="email" 
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FFF8E7] border-3 border-black p-3.5 text-sm font-comic font-bold text-black placeholder-black/50 outline-none focus:bg-white shadow-[3px_3px_0_#000]"
                />
              </div>

              <textarea 
                rows={3}
                required
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#FFF8E7] border-3 border-black p-3.5 text-sm font-comic font-bold text-black placeholder-black/50 outline-none focus:bg-white shadow-[3px_3px_0_#000]"
              />

              <button 
                type="submit" 
                className="w-full py-4 bg-[#FFDD00] text-black font-bangers text-xl tracking-wider border-3 border-black flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                SEND INQUIRY ⚡ <Send size={18} />
              </button>

              {submitted && (
                <p className="text-center font-bangers text-sm text-emerald-600 mt-1">
                  💥 INQUIRY SENT! RAAGHAV WILL REACH OUT SHORTLY.
                </p>
              )}

            </form>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
