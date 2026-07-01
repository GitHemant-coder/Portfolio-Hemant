import React from 'react';
import useReveal from '../hooks/useReveal';

export default function Skills() {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  const skillCategories = [
    {
      title: "Languages",
      skills: ["JavaScript", "Python", "SQL"],
      borderClass: "border-t-terracotta"
    },
    {
      title: "Frontend",
      skills: ["React.js", "HTML5", "CSS3"],
      borderClass: "border-t-sage-deep"
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "Django", "REST API"],
      borderClass: "border-t-lavender"
    },
    {
      title: "Databases",
      skills: ["MongoDB", "MySQL"],
      borderClass: "border-t-terracotta"
    },
    {
      title: "ML & NLP",
      skills: ["scikit-learn", "pandas", "NumPy", "TensorFlow", "NLTK", "spaCy"],
      borderClass: "border-t-sage-deep"
    },
    {
      title: "GenAI & Automation",
      skills: ["OpenAI API", "Gemini API", "n8n", "VAPI"],
      borderClass: "border-t-lavender"
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "Selenium", "Postman"],
      borderClass: "border-t-terracotta"
    },
    {
      title: "Soft Skills",
      skills: ["Leadership", "Problem Solving", "Self-Motivated", "Adaptability", "Team work", "Time Management", "Communication Skills"],
      borderClass: "border-t-sage-deep"
    }
  ];

  return (
    <section className="py-[90px] bg-cream2 border-y border-line" id="skills">
      <div className="max-w-[1180px] mx-auto px-8">
        <div
          ref={headerRef}
          className={`flex justify-between items-end mb-11 gap-6 flex-wrap reveal-left ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Capabilities</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Technical skills.</h2>
          </div>
          <p className="text-ink-soft text-[14.5px] max-w-[320px] leading-[1.7]">
            The languages, frameworks, and tools I reach for when building something real.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-[18px]"
        >
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-card border border-line rounded-2xl p-[22px] flex flex-col border-t-4 ${category.borderClass} reveal-scale ${gridVisible ? 'visible' : ''} hover-lift`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <h4 className="font-mono text-[11.5px] tracking-[0.08em] uppercase font-bold text-ink-soft mb-3.5">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-1.75">
                {category.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="bg-cream2 text-[12.5px] font-semibold px-3 py-1.5 rounded-lg border border-line text-ink hover:scale-105 hover:bg-cream hover:border-terracotta/40 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
