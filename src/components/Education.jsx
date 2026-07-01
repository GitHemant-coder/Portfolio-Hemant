import React from 'react';
import useReveal from '../hooks/useReveal';

export default function Education() {
  const [revealRef, isVisible] = useReveal();

  return (
    <section className="pb-[90px]">
      <div className="max-w-[1180px] mx-auto px-8">
        <div
          ref={revealRef}
          className={`bg-ink text-cream rounded-[22px] py-[44px] px-[32px] md:px-[48px] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center reveal-scale ${isVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-butter font-bold mb-2">
              Education
            </div>
            <h3 className="text-cream text-2xl font-serif font-semibold mb-1.5 leading-snug">
              Bachelor of Engineering — Information Technology (BE IT)
            </h3>
            <div className="text-[#c9bfa8] text-[14.5px] mb-[18px]">
              Datta Meghe College of Engineering, Mumbai University
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <span className="bg-cream/10 border border-cream/20 px-4 py-[7px] rounded-full text-[12.5px] font-semibold text-cream">
                2023 – 2027
              </span>
              <span className="bg-cream/10 border border-cream/20 px-4 py-[7px] rounded-full text-[12.5px] font-semibold text-cream">
                DSA · DBMS · OS · Networks
              </span>
            </div>
          </div>
          <div className="bg-butter text-ink rounded-2xl py-6 px-[30px] text-center w-full md:w-[160px] shrink-0">
            <div className="font-serif text-[38px] font-bold leading-none mb-1">
              8.13
            </div>
            <div className="text-[11px] font-bold tracking-[0.06em] uppercase">
              CGPA / 10.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
