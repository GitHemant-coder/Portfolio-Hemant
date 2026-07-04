import React from 'react';
import useReveal from '../hooks/useReveal';
import { Database, Code2, Terminal, Server, Cpu, Brain, MessageSquare } from 'lucide-react';

export default function Certifications() {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  const certs = [
    {
      icon: <Database size={20} />,
      name: "MySQL: SQL, PL/SQL & DBA Programming",
      issuer: "Professional Training",
      bgClass: "bg-terracotta text-white"
    },
    {
      icon: <Code2 size={20} />,
      name: "JavaScript MERN Full Stack Development",
      issuer: "Professional Training",
      bgClass: "bg-sage text-ink"
    },
    {
      icon: <Terminal size={20} />,
      name: "Python Developer",
      issuer: "Professional Training",
      bgClass: "bg-lavender text-ink"
    },
    {
      icon: <Server size={20} />,
      name: "Django Web Framework & REST API",
      issuer: "Professional Training",
      bgClass: "bg-butter text-ink"
    },
    {
      icon: <Cpu size={20} />,
      name: "Python Automation Developer",
      issuer: "Professional Training",
      bgClass: "bg-terracotta text-white"
    },
    {
      icon: <Brain size={20} />,
      name: "Machine Learning with Flask",
      issuer: "Professional Training",
      bgClass: "bg-sage text-ink"
    },
    {
      icon: <MessageSquare size={20} />,
      name: "Natural Language Processing (NLP)",
      issuer: "Professional Training",
      bgClass: "bg-lavender text-ink"
    }
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="py-[90px]" id="certifications">
      <div className="max-w-[1180px] mx-auto px-8">
        <div 
          ref={headerRef}
          className={`flex justify-between items-end mb-11 gap-6 flex-wrap reveal-left ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Credentials</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Certifications.</h2>
          </div>
          <p className="text-ink-soft text-[14.5px] max-w-[320px] leading-[1.7]">
            Structured training across the stack I work in daily.
          </p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3.5"
        >
          {certs.map((cert, index) => (
            <div 
              key={index}
              onMouseMove={handleMouseMove}
              className={`flex items-center gap-4 bg-card border border-line rounded-[14px] p-[18px] px-[20px] reveal-scale ${gridVisible ? 'visible' : ''} hover-lift group spotlight-card`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={`w-11 h-11 rounded-lg shrink-0 flex items-center justify-center ${cert.bgClass} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                {cert.icon}
              </div>
              <div className="relative z-10">
                <div className="text-[14.5px] font-bold text-ink leading-tight">
                  {cert.name}
                </div>
                <div className="text-xs text-ink-soft mt-0.5">
                  {cert.issuer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
