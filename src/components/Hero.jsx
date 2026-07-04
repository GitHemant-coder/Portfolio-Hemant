import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import VoiceTourWidget from './VoiceVisualizer';
import { Volume2, VolumeX } from 'lucide-react';

export default function Hero() {
  const [textRef, textVisible] = useReveal(0.05);
  const [mainRef, mainVisible] = useReveal(0.1);
  const [statRef, statVisible] = useReveal(0.1);
  const [skillRef, skillVisible] = useReveal(0.1);
  const [quoteRef, quoteVisible] = useReveal(0.1);
  const [showVoiceTour, setShowVoiceTour] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-[72px] pb-[60px]">
      <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div 
          ref={textRef}
          className={`reveal-left ${textVisible ? 'visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 bg-card border border-line px-4 py-[7px] rounded-full text-[12.5px] font-semibold text-ink-soft mb-7 shadow-sm">
            <span className="w-[7px] h-[7px] rounded-full bg-sage-deep"></span>
            Open to Software Engineering roles
          </div>
          <h1 className="text-[40px] sm:text-[50px] lg:text-[68px] leading-[1.04] mb-[22px] font-serif font-bold text-ink tracking-tight">
            Code that's <em className="italic font-medium text-terracotta-deep">clean,</em><br />
            built right, and<br />
            ready to ship.
          </h1>
          <p className="text-[17px] text-ink-soft leading-[1.7] max-w-[480px] mb-[34px]">
            I'm a final-year IT student who turns ideas into full-stack apps, ML models, and AI automations. 4 internships, 10+ projects, and a habit of finishing what I start.
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <button 
              className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-[13px] rounded-full text-sm font-bold border-none cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(33,29,24,0.25)] group active:scale-95"
              onClick={() => scrollToSection('projects')}
            >
              View My Work <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <a 
              href="/Hemant_Vilas_Patil_Resume.pdf"
              download="Hemant_Vilas_Patil_Resume.pdf"
              className="inline-flex items-center gap-2 bg-transparent border-[1.5px] border-ink text-ink px-6 py-[13px] rounded-full text-sm font-bold cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:bg-ink hover:text-cream no-underline active:scale-95"
            >
              Download Resume
            </a>
            <button 
              className="inline-flex items-center gap-2.5 bg-card border-[1.5px] border-line text-ink px-6 py-[13px] rounded-full text-sm font-bold cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:bg-cream2/60 relative z-10 active:scale-95"
              onClick={() => setShowVoiceTour(!showVoiceTour)}
            >
              {showVoiceTour ? <VolumeX size={15} className="text-red-500" /> : <Volume2 size={15} />}
              {showVoiceTour ? 'Stop Voice Tour' : 'Listen to AI Tour'}
            </button>
          </div>
        </div>

        {/* Floating Stack Visuals */}
        <div className="relative h-[480px] md:h-[420px] lg:h-[480px] mt-5 lg:mt-0">
          <div 
            ref={mainRef}
            className={`absolute w-[78%] left-[8%] top-[6%] reveal-scale ${mainVisible ? 'visible' : ''}`}
          >
            <div className="bg-gradient-to-br from-terracotta to-terracotta-deep text-white h-[320px] flex flex-col justify-between rounded-[18px] p-5 shadow-[0_18px_40px_rgba(33,29,24,0.10)] animate-float-slow overflow-hidden">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase opacity-85 bg-white/15 px-3 py-[5px] rounded-full w-fit">
                Currently building
              </span>
              <div className="w-full h-[155px] my-1.5 overflow-hidden rounded-lg border border-white/10 shadow-md">
                <img 
                  src="/generative-ai.jpg" 
                  alt="Generative AI Illustration" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-white text-[23px] sm:text-[24px] leading-[1.2] font-serif font-semibold">
                AI agents that handle real conversations.
              </h3>
            </div>
          </div>

          <div 
            ref={statRef}
            className={`absolute w-[46%] left-0 top-[62%] reveal-left ${statVisible ? 'visible' : ''}`}
          >
            <div className="bg-card border border-line rounded-[18px] p-5 shadow-[0_18px_40px_rgba(33,29,24,0.10)] flex flex-col gap-1 animate-float-medium">
              <span className="font-serif text-[34px] font-bold text-sage-deep leading-none">+38%</span>
              <span className="text-[11.5px] text-ink-soft font-semibold leading-tight">FASTER QA WITH AUTOMATION</span>
            </div>
          </div>

          <div 
            ref={skillRef}
            className={`absolute w-[54%] right-0 top-0 reveal-right ${skillVisible ? 'visible' : ''}`}
          >
            <div className="bg-butter rounded-[18px] p-5 shadow-[0_18px_40px_rgba(33,29,24,0.10)] flex flex-col gap-2 animate-float-fast">
              <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink font-bold">Core Stack</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-ink/8 text-[11px] font-semibold px-2.25 py-1 rounded-[6px] hover:scale-105 transition-transform duration-200">React</span>
                <span className="bg-ink/8 text-[11px] font-semibold px-2.25 py-1 rounded-[6px] hover:scale-105 transition-transform duration-200">Node.js</span>
                <span className="bg-ink/8 text-[11px] font-semibold px-2.25 py-1 rounded-[6px] hover:scale-105 transition-transform duration-200">Python</span>
                <span className="bg-ink/8 text-[11px] font-semibold px-2.25 py-1 rounded-[6px] hover:scale-105 transition-transform duration-200">Django</span>
              </div>
            </div>
          </div>

          <div 
            ref={quoteRef}
            className={`absolute w-[60%] right-[2%] bottom-0 reveal-blur ${quoteVisible ? 'visible' : ''}`}
          >
            <div className="bg-lavender rounded-[18px] p-5 shadow-[0_18px_40px_rgba(33,29,24,0.10)] text-ink animate-float-medium">
              <p className="font-serif italic text-[14.5px] leading-[1.5]">
                "Built 4 projects from scratch in 4 weeks — fast learner, faster shipper."
              </p>
            </div>
          </div>
        </div>
      </div>
      {showVoiceTour && <VoiceTourWidget onClose={() => setShowVoiceTour(false)} />}
    </section>
  );
}
