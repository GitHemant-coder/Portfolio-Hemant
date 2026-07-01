import React from 'react';
import useReveal from '../hooks/useReveal';

export default function Experience() {
  const [headerRef, headerVisible] = useReveal();
  const [card1Ref, card1Visible] = useReveal();
  const [card2Ref, card2Visible] = useReveal();
  const [card3Ref, card3Visible] = useReveal();
  const [card4Ref, card4Visible] = useReveal();

  const experiences = [
    {
      num: "01",
      date: "APR 2026 – SEP 2026",
      role: "UI/UX as well as  Frontend Developer and Mentor",
      company: "Zelta Climb",
      bullets: [
        "Designed custom UI/UX layouts and developed the frontend for the company website to elevate brand identity and drive customer acquisition.",
        "Engineered robust backend services, implemented core business logic, and optimized performance.",
        "Mentored and guided junior team members in modern UI/UX design principles and web development workflows."
      ],
      ref: card4Ref,
      visible: card4Visible
    },
    {
      num: "02",
      date: "NOV 2025 – DEC 2025",
      role: "Python Automation Developer Intern",
      company: "Pythonic Labs",
      bullets: [
        "Completed 8–10 automation tasks using Selenium for UI testing and web scraping.",
        "Built automated email reporting pipelines with screenshot capture in Python.",
        "Cut manual QA effort by scripting repetitive browser-based tasks."
      ],
      ref: card3Ref,
      visible: card3Visible
    },
    {
      num: "03",
      date: "SEP 2025 – OCT 2025",
      role: "Django Developer Intern",
      company: "Pythonic Labs",
      bullets: [
        "Built a complete Online Polling System using Django, Python, and MySQL.",
        "Implemented MVC architecture, form validation, and real-time result display.",
        "Used Django ORM to simplify and speed up database operations."
      ],
      ref: card2Ref,
      visible: card2Visible
    },
    {
      num: "04",
      date: "JUL 2025 – AUG 2025",
      role: "MERN Full Stack Developer Intern",
      company: "Mernix Consulting",
      bullets: [
        "Built 4 full stack web applications using MongoDB, Express.js, React.js, and Node.js.",
        "Developed RESTful APIs with complete CRUD operations and user authentication.",
        "Delivered all 4 projects independently from scratch within set timelines."
      ],
      ref: card1Ref,
      visible: card1Visible
    }
  ];

  return (
    <section className="py-[90px]" id="experience">
      <div className="max-w-[1180px] mx-auto px-8">
        <div
          ref={headerRef}
          className={`flex justify-between items-end mb-11 gap-6 flex-wrap reveal-left ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Work history</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Internship experience.</h2>
          </div>
          <p className="text-ink-soft text-[14.5px] max-w-[320px] leading-[1.7]">
            Four internships, four different areas of impact — frontend, backend, automation, and mentorship.
          </p>
        </div>

        <div className="flex flex-col gap-[18px]">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={exp.ref}
              className={`bg-card border border-line rounded-[18px] py-[30px] px-[32px] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-[10px] md:gap-[28px] ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'
                } ${exp.visible ? 'visible' : ''} hover-lift`}
            >
              <div>
                <div className="font-serif text-[32px] md:text-[48px] font-bold text-ink-soft/20 leading-none">
                  {exp.num}
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11.5px] text-terracotta-deep font-bold tracking-[0.04em]">
                    {exp.date}
                  </span>
                  <div>
                    <h3 className="text-[20px] font-serif font-semibold text-ink leading-tight mb-1">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-[13.5px] text-ink-soft font-semibold mb-3.5">
                    {exp.company}
                  </div>
                </div>
                <ul className="list-disc pl-[18px] flex flex-col gap-1 text-ink-soft">
                  {exp.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="text-sm leading-[1.75]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
