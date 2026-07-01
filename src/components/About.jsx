import React from 'react';
import useReveal from '../hooks/useReveal';

export default function About() {
  const [headRef, headVisible] = useReveal();
  const [cardsRef, cardsVisible] = useReveal();

  return (
    <section className="py-[90px]" id="about">
      <div className="max-w-[1180px] mx-auto px-8">
        <div
          ref={headRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[56px] items-end reveal-left ${headVisible ? 'visible' : ''}`}
        >
          <h2 className="text-[32px] sm:text-[44px] leading-[1.1] font-serif font-bold text-ink tracking-tight">
            Organized, curious, and good with both code and people.
          </h2>
          <p className="text-ink-soft text-[15.5px] leading-[1.75]">
            I'm a final-year Information Technology student who's spent the last year stacking up real-world experience — four internships across full-stack, backend, and automation — while building a habit of shipping personal projects from scratch instead of just following tutorials.
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 reveal-scale ${cardsVisible ? 'visible' : ''}`}
        >
          <div className="bg-terracotta text-white rounded-2xl py-[24px] px-[20px]">
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase font-bold opacity-75 mb-2.5">
              Education
            </div>
            <div className="font-serif text-[19px] font-semibold leading-tight">
              Mumbai Universtiy (Datta Meghe College)
            </div>
          </div>

          <div className="bg-lavender text-ink rounded-2xl py-[24px] px-[20px]">
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase font-bold opacity-75 mb-2.5">
              Location
            </div>
            <div className="font-serif text-[19px] font-semibold leading-tight">
              Navi Mumbai, India
            </div>
          </div>

          <div className="bg-sage text-ink rounded-2xl py-[24px] px-[20px]">
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase font-bold opacity-75 mb-2.5">
              Internships
            </div>
            <div className="font-serif text-[19px] font-semibold leading-tight">
              4 Completed
            </div>
          </div>

          <div className="bg-butter text-ink rounded-2xl py-[24px] px-[20px]">
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase font-bold opacity-75 mb-2.5">
              Focus Area
            </div>
            <div className="font-serif text-[19px] font-semibold leading-tight">
              Full Stack + GenAI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
