import React from 'react';
import { Cpu } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function AboutStudio() {
  return (
    <section className="py-24 px-6 bg-cinematic-card text-white border-t border-cinematic-border" id="about">
      <div className="max-w-[1320px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ScrollReveal>
              <span className="font-accent text-xs font-bold tracking-widest text-gold-accent block">// THE EDITOR</span>
              <h2 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-tight uppercase text-white mt-1">
                ABOUT RAAGHAV BISHT
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="font-heading text-xl font-semibold italic text-gold-accent/90 leading-relaxed">
                "Editing isn't just cutting footage — it's constructing emotion out of time, space, and sound."
              </p>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <p className="text-sm text-white/70 leading-relaxed">
                With over 3 years of specialized post-production experience, I lead editorial projects for international commercial brands, music labels, independent directors, and high-growth content creators. From high-energy kinetic edits to delicate narrative documentaries, my goal is always to maximize viewer engagement and narrative clarity.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <div className="flex gap-8 pt-6 border-t border-cinematic-border mt-2">
                <div>
                  <span className="font-heading font-extrabold text-3xl text-white block">3+</span>
                  <span className="font-accent text-[0.68rem] font-bold tracking-wider text-gold-accent uppercase">Years Experience</span>
                </div>
                <div>
                  <span className="font-heading font-extrabold text-3xl text-white block">100%</span>
                  <span className="font-accent text-[0.68rem] font-bold tracking-wider text-gold-accent uppercase">Deadline Guarantee</span>
                </div>
                <div>
                  <span className="font-heading font-extrabold text-3xl text-white block">8K</span>
                  <span className="font-accent text-[0.68rem] font-bold tracking-wider text-gold-accent uppercase">RAW Workflow Ready</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={200}>
              <div className="bg-cinematic-bg border border-cinematic-border rounded-2xl p-8 lg:p-10 shadow-2xl">
                <h3 className="font-heading font-extrabold text-lg tracking-wider text-white flex items-center gap-3 pb-4 border-b border-cinematic-border mb-6">
                  <Cpu size={20} className="text-gold-accent" /> EDITORIAL SUITE & HARDWARE
                </h3>

                <ul className="space-y-4 text-xs text-white/70">
                  <li><strong className="text-white font-bold">Workstation:</strong> Mac Studio M2 Max (64GB RAM, 38-Core GPU)</li>
                  <li><strong className="text-white font-bold">Monitors:</strong> Apple Studio Display (Calibrated Rec.709)</li>
                  <li><strong className="text-white font-bold">Primary NLE:</strong> Adobe Premiere Pro CC & DaVinci Resolve Studio</li>
                  <li><strong className="text-white font-bold">VFX & Motion:</strong> After Effects CC, Cinema 4D, Red Giant Trapcode</li>
                  <li><strong className="text-white font-bold">Audio Mastering:</strong> iZotope RX 10, Waves Audio, Logic Pro</li>
                  <li><strong className="text-white font-bold">Storage:</strong> 32TB RAID 0 High-Speed NVMe Storage Matrix</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Client Marquee */}
        <ScrollReveal delay={300}>
          <div className="mt-20 pt-10 border-t border-cinematic-border text-center">
            <span className="font-accent text-[0.7rem] font-extrabold tracking-widest text-gold-accent block mb-6 uppercase">
              TRUSTED BY WORLD-CLASS DIRECTORS & BRANDS
            </span>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 font-heading font-extrabold text-lg md:text-xl tracking-widest text-white/40">
              <span className="hover:text-gold-accent transition-colors cursor-default">PORSCHE</span>
              <span className="hover:text-gold-accent transition-colors cursor-default">RED BULL MEDIA</span>
              <span className="hover:text-gold-accent transition-colors cursor-default">SONY MUSIC</span>
              <span className="hover:text-gold-accent transition-colors cursor-default">NATIONAL GEOGRAPHIC</span>
              <span className="hover:text-gold-accent transition-colors cursor-default">NIKE GLOBAL</span>
              <span className="hover:text-gold-accent transition-colors cursor-default">RIOT GAMES</span>
              <span className="hover:text-gold-accent transition-colors cursor-default">SUNDANCE FILM FEST</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
