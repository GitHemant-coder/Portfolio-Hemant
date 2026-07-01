import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { X, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      emoji: "🗂️",
      coverClass: "bg-gradient-to-br from-terracotta to-terracotta-deep",
      title: "Student Management System",
      desc: "Full stack MERN application with complete CRUD operations to manage student records — built from scratch with a React frontend and Express/MongoDB backend.",
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://www.linkedin.com/posts/hemant-patil-2b4bb1312_python-webdevelopment-sqlite-activity-7380413925009403904-bEC_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-OJ2gB62Wm13Tg7x9hF4akngcJ2n6gdU0",
      linkLabel: "View on LinkedIn →",
      details: [
        "Architected complete RESTful CRUD API endpoints using Node.js and Express.",
        "Integrated MongoDB database schemas to manage student profiles and registration securely.",
        "Built responsive, dynamic web forms with state-driven validation in React.",
        "Tested backend routes and request payloads extensively using Postman."
      ]
    },
    {
      emoji: "🛡️",
      coverClass: "bg-gradient-to-br from-sage to-sage-deep",
      title: "SMS Spam Detection System",
      desc: "An NLP-powered classifier that flags spam SMS in real time, using TF-IDF vectorization and trained Naive Bayes / SVM models.",
      tags: ["Python", "scikit-learn", "NLP"],
      link: null,
      linkLabel: null,
      details: [
        "Trained machine learning models (Naive Bayes & SVM) using scikit-learn in Python.",
        "Achieved a 98.2% test classification accuracy on the SMS spam corpus dataset.",
        "Implemented TF-IDF Vectorizer for robust text preprocessing and feature extraction.",
        "Designed a modular python interface to quickly preprocess and classify input text strings."
      ]
    },
    {
      emoji: "🤖",
      coverClass: "bg-gradient-to-br from-lavender to-[#9384bb]",
      title: "HR Outbound Call Agent",
      desc: "An AI calling agent that autonomously runs HR screening interviews — VAPI handles the voice, n8n handles the workflow, zero human intervention.",
      tags: ["n8n", "VAPI", "OpenAI API"],
      link: "https://www.linkedin.com/posts/hemant-patil-2b4bb1312_genai-voiceai-vapi-activity-7422271995016413184-S_gn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-OJ2gB62Wm13Tg7x9hF4akngcJ2n6gdU0",
      linkLabel: "Watch demo →",
      details: [
        "Automated outbound candidate screening workflows using n8n for serverless execution.",
        "Configured VAPI hooks to handle real-time low-latency voice capture and transcription.",
        "Leveraged OpenAI API to evaluate audio answers and score candidate qualification parameters.",
        "Generated instant post-call metrics and pushed alerts to recruiting dashboards."
      ]
    }
  ];

  return (
    <section className="py-[90px] bg-cream2 border-y border-line" id="projects">
      <div className="max-w-[1180px] mx-auto px-8">
        <div
          ref={headerRef}
          className={`flex justify-between items-end mb-11 gap-6 flex-wrap reveal-left ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Selected work</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Projects I've shipped.</h2>
          </div>
          <p className="text-ink-soft text-[14.5px] max-w-[320px] leading-[1.7] font-medium">
            Three projects, three domains — web, machine learning, and AI automation. Click any card to see case details.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-[22px]"
        >
          {projects.map((proj, index) => (
            <div
              key={index}
              onClick={() => setActiveProject(proj)}
              className={`bg-card rounded-[18px] overflow-hidden border border-line flex flex-col reveal-scale ${gridVisible ? 'visible' : ''} hover-lift group cursor-pointer`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`h-[160px] flex items-center justify-center text-[42px] select-none ${proj.coverClass} overflow-hidden`}>
                <span className="inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                  {proj.emoji}
                </span>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-[19px] font-serif font-semibold text-ink leading-tight">
                  {proj.title}
                </h3>
                <p className="text-[13.5px] text-ink-soft leading-[1.7] flex-1">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-[11px] font-bold font-mono bg-cream2 px-[9px] py-1 rounded-[6px] uppercase tracking-[0.03em] text-ink border border-line/20 hover:scale-105 transition-transform duration-150"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {proj.link ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[13px] font-bold text-terracotta-deep inline-flex items-center gap-1 mt-1 hover:underline w-fit"
                  >
                    {proj.linkLabel}
                  </a>
                ) : (
                  <span className="text-[13px] font-semibold text-ink-soft/60 mt-1">
                    Click to view highlights →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {activeProject && (
        <div 
          className="fixed inset-0 bg-[#0c0a09]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="bg-card border border-line rounded-[22px] max-w-lg w-full overflow-hidden shadow-2xl animate-chat-open flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Cover */}
            <div className={`h-[140px] flex items-center justify-center text-[48px] select-none relative ${activeProject.coverClass}`}>
              <span className="transition-transform duration-300 transform scale-110">
                {activeProject.emoji}
              </span>
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border-none cursor-pointer transition-colors duration-150"
                aria-label="Close details"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-7 flex flex-col gap-5">
              <div>
                <h3 className="text-[23px] font-serif font-semibold text-ink leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-[13.5px] text-ink-soft leading-[1.7] mt-2">
                  {activeProject.desc}
                </p>
              </div>

              {/* Technical Highlights */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-ink-soft/75">
                  Technical Highlights:
                </span>
                <ul className="list-disc pl-[18px] flex flex-col gap-1.5 text-ink-soft">
                  {activeProject.details.map((detail, idx) => (
                    <li key={idx} className="text-[13px] leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-line/10">
                {activeProject.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-[10px] font-bold font-mono bg-cream2 px-[9px] py-1 rounded-[6px] uppercase tracking-[0.03em] text-ink border border-line/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 mt-2 justify-end">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-xl bg-cream2 text-ink border border-line text-[12.5px] font-bold cursor-pointer hover:bg-line transition-colors duration-150"
                >
                  Close
                </button>
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-ink text-cream text-[12.5px] font-bold cursor-pointer hover:bg-ink-soft transition-colors duration-150 flex items-center gap-1.5 no-underline"
                  >
                    Visit Demo <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
