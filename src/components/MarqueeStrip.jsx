import React from 'react';

export default function MarqueeStrip() {
  return (
    <div className="bg-ink text-cream py-4 overflow-hidden whitespace-nowrap select-none">
      <div className="inline-flex gap-[60px] animate-scroll">
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">MERN STACK</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">PYTHON</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">DJANGO</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">MACHINE LEARNING</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">NLP</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">GENERATIVE AI</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        
        {/* Repeated segment to support seamless loop */}
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">MERN STACK</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">PYTHON</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">DJANGO</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">MACHINE LEARNING</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">NLP</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">GENERATIVE AI</span>
        <span className="font-mono text-[13px] tracking-[0.1em] uppercase font-semibold">★</span>
      </div>
    </div>
  );
}
