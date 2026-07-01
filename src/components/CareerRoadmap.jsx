import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { BookOpen, Code2, Terminal, Users, Award, Calendar } from 'lucide-react';

export default function CareerRoadmap() {
  const [headerRef, headerVisible] = useReveal();
  const [roadmapRef, roadmapVisible] = useReveal();
  const [activeNode, setActiveNode] = useState(0);

  const roadmapData = [
    {
      year: "2023",
      title: "Journey Commencement",
      subtitle: "B.E. in Information Technology",
      institution: "Datta Meghe College of Engineering",
      colorClass: "border-terracotta text-terracotta bg-card",
      activeBg: "bg-terracotta text-white",
      icon: <BookOpen size={20} />,
      period: "2023 - 2027",
      details: [
        "Started Bachelor of Engineering under Mumbai University, maintaining an 8.13 CGPA.",
        "Built solid coding foundations in JavaScript, Python, and SQL.",
        "Mastered core concepts: Data Structures (DSA), DBMS, Operating Systems, and Networks."
      ]
    },
    {
      year: "2025 (Mid)",
      title: "First Professional Internship",
      subtitle: "MERN Stack Developer Intern",
      institution: "Mernix Consulting",
      colorClass: "border-sage-deep text-sage-deep bg-card",
      activeBg: "bg-sage text-ink",
      icon: <Code2 size={20} />,
      period: "JUL 2025 - AUG 2025",
      details: [
        "Transitioned from academic theory to hands-on professional product development.",
        "Independently engineered 4 full-stack applications using React, Express, and MongoDB.",
        "Developed custom REST APIs featuring JWT secure session authentication and CRUD schemas."
      ]
    },
    {
      year: "2025 (Late)",
      title: "Expanding Backend & Automation",
      subtitle: "Django & Python QA Intern",
      institution: "Pythonic Labs",
      colorClass: "border-lavender text-lavender bg-card",
      activeBg: "bg-lavender text-ink",
      icon: <Terminal size={20} />,
      period: "SEP 2025 - DEC 2025",
      details: [
        "Designed and implemented an Online Polling System using Django MVC and MySQL.",
        "Automated 8-10 frontend browser tests and scraping tasks using Python and Selenium.",
        "Created an email report delivery script with screen captures, saving manual verification effort."
      ]
    },
    {
      year: "2026",
      title: "Mentorship & Core Web Front",
      subtitle: "Mentor and Developer",
      institution: "Zelta Climb",
      colorClass: "border-butter text-butter bg-card",
      activeBg: "bg-butter text-ink",
      icon: <Users size={20} />,
      period: "APR 2026 - SEP 2026",
      details: [
        "Designed UI layouts and engineered the frontend of the landing websites to improve acquisition.",
        "Optimized backend logic performance and resolved API response delays.",
        "Mentored junior engineers and designers on modern frontend structures and best practices."
      ]
    },
    {
      year: "2027 & Beyond",
      title: "Graduation & Engineering Goals",
      subtitle: "Full-Stack & GenAI Engineer",
      institution: "Upcoming Milestone",
      colorClass: "border-sage-deep text-sage-deep bg-card",
      activeBg: "bg-sage text-ink",
      icon: <Award size={20} />,
      period: "GRADUATION 2027",
      details: [
        "Completing B.E. degree and ready to join high-impact software engineering teams.",
        "Focused on leveraging GenAI pipelines (VAPI, OpenAI, Gemini) and workflow tools (n8n).",
        "Eager to tackle complex software architecture challenges and deliver robust production solutions."
      ]
    }
  ];

  return (
    <section className="py-[90px]" id="roadmap">
      <div className="max-w-[1180px] mx-auto px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex justify-between items-end mb-16 gap-6 flex-wrap reveal-left ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Interactive Timeline</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Career roadmap.</h2>
          </div>
          <p className="text-ink-soft text-[14.5px] max-w-[320px] leading-[1.7]">
            Click the milestone year circles below to follow my developer journey.
          </p>
        </div>

        {/* Roadmap Display */}
        <div
          ref={roadmapRef}
          className={`grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start reveal-scale ${roadmapVisible ? 'visible' : ''}`}
        >
          {/* Vertical Node Line */}
          <div className="flex flex-col gap-6 relative pl-4 lg:pl-10 border-l-[3.5px] border-line py-2">
            {roadmapData.map((node, index) => {
              const isActive = activeNode === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveNode(index)}
                  className={`flex items-center gap-4 text-left group cursor-pointer bg-transparent border-none p-2 outline-none select-none transition-all duration-200 ${
                    isActive ? 'scale-[1.03]' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Point circle on timeline */}
                  <div
                    className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center transition-all duration-300 shadow-md ${
                      isActive ? node.activeBg + ' ' + node.colorClass.split(' ')[0] : node.colorClass
                    } group-hover:scale-110`}
                  >
                    {node.icon}
                  </div>

                  {/* Year text */}
                  <div>
                    <span className="font-mono text-xs text-ink-soft font-bold uppercase tracking-wider block">
                      {node.period}
                    </span>
                    <strong className={`font-serif text-[18px] sm:text-[21px] block transition-colors ${isActive ? 'text-terracotta-deep' : 'text-ink'}`}>
                      {node.year} — {node.subtitle}
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Showcase Card */}
          <div className="bg-card border border-line rounded-[22px] p-7 lg:p-9 shadow-2xl flex flex-col gap-5 animate-chat-open min-h-[380px] justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 flex-wrap border-b border-line/10 pb-4 mb-2">
                <div>
                  <span className="font-mono text-[11px] font-bold text-terracotta-deep uppercase tracking-wider block">
                    {roadmapData[activeNode].period}
                  </span>
                  <h3 className="text-[23px] font-serif font-bold text-ink leading-snug mt-1">
                    {roadmapData[activeNode].title}
                  </h3>
                </div>
                <div className={`px-4 py-2.5 rounded-xl border border-line/25 flex items-center gap-2 ${roadmapData[activeNode].activeBg}`}>
                  {roadmapData[activeNode].icon}
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    {roadmapData[activeNode].year}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-4">
                <span className="text-[13.5px] font-bold text-ink leading-tight">
                  {roadmapData[activeNode].subtitle}
                </span>
                <span className="text-[12.5px] text-ink-soft font-medium">
                  {roadmapData[activeNode].institution}
                </span>
              </div>

              {/* Detail points */}
              <ul className="list-disc pl-5 mt-6 flex flex-col gap-2.5 text-ink-soft">
                {roadmapData[activeNode].details.map((bullet, idx) => (
                  <li key={idx} className="text-[13.5px] leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro interactivity footer */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink-soft/60 pt-4 border-t border-line/10 select-none">
              <Calendar size={13} /> Checkpoint {activeNode + 1} of {roadmapData.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
