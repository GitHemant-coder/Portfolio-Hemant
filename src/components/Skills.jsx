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

  const handleSkillClick = (skill) => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    const event = new CustomEvent('highlight-skill', { detail: { skill } });
    window.dispatchEvent(event);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

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
            The languages, frameworks, and tools I reach for when building something real (click any skill to see where it was used).
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-[18px]"
        >
          {skillCategories.map((category, index) => (
            <div
              key={index}
              onMouseMove={handleMouseMove}
              className={`bg-card border border-line rounded-2xl p-[22px] flex flex-col border-t-4 ${category.borderClass} reveal-scale ${gridVisible ? 'visible' : ''} hover-lift spotlight-card`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <h4 className="font-mono text-[11.5px] tracking-[0.08em] uppercase font-bold text-ink-soft mb-3.5 relative z-10">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, sIndex) => (
                  <button
                    key={sIndex}
                    onClick={() => handleSkillClick(skill)}
                    className="bg-cream2 text-[12.5px] font-semibold px-3 py-1.5 rounded-lg border border-line text-ink hover:scale-105 hover:bg-cream hover:border-terracotta hover:text-terracotta-deep active:scale-95 transition-all duration-200 cursor-pointer text-left relative z-10"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
