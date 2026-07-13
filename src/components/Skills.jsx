import React, { useRef, useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';

/* ==========================================================================
   WIDGET: CodeEditorWidget
   ========================================================================== */
function CodeEditorWidget() {
  return (
    <div className="bg-[#1c1917] border border-line/10 rounded-xl p-3.5 text-[10px] font-mono text-[#efe8d8] flex flex-col gap-1 w-full mt-2.5 select-none shadow-sm leading-normal">
      <div className="flex justify-between items-center border-b border-line/10 pb-1.5 mb-1 text-[8px] text-[#efe8d8]/55">
        <span>📄 App.jsx</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      </div>
      <div className="text-[#efe8d8]/80">
        <span className="text-terracotta">import</span> React <span className="text-terracotta">from</span> <span className="text-sage">'react'</span>;
      </div>
      <div>
        <span className="text-terracotta">export default function</span> <span className="text-butter">Portfolio</span>() &#123;
      </div>
      <div className="pl-3">
        <span className="text-terracotta">return</span> (
      </div>
      <div className="pl-6">
        &lt;<span className="text-terracotta">div</span> className=<span className="text-sage">"dev-mode"</span>&gt;
      </div>
      <div className="pl-9 text-butter">
        Ready to build.
      </div>
      <div className="pl-6">
        &lt;/<span className="text-terracotta">div</span>&gt;
      </div>
      <div className="pl-3">
        );
      </div>
      <div>
        &#125;
      </div>
    </div>
  );
}

/* ==========================================================================
   WIDGET: PipelineFlowWidget
   ========================================================================== */
function PipelineFlowWidget() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    "🎙️ VAPI: Capture inbound candidate voice...",
    "⚙️ n8n: Match routes & run screening automation...",
    "✨ Gemini: Evaluate answers & trigger schemas...",
    "📊 Dashboard: Publish insights & report data..."
  ];

  return (
    <div className="flex flex-col gap-3 mt-3 w-full bg-cream/15 p-3 rounded-xl border border-line/25 relative overflow-hidden select-none">
      <div className="flex justify-between items-center relative py-2.5">
        {/* Horizontal Line background */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-line/30" />
        
        {/* Pulsing ball tracer */}
        <div 
          className="absolute h-[6px] w-[6px] rounded-full bg-terracotta shadow-[0_0_8px_var(--color-terracotta)] top-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
          style={{
            left: `${12 + activeStep * 25}%`
          }}
        />

        {/* Node 1: VAPI */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[2px] relative z-10 ${
          activeStep === 0 ? 'bg-terracotta border-terracotta text-white scale-110 shadow-lg' : 'bg-card border-line text-ink-soft'
        } transition-all duration-300`}>
          <span className="text-[10px] font-bold">🎙️</span>
        </div>

        {/* Node 2: n8n */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[2px] relative z-10 ${
          activeStep === 1 ? 'bg-sage border-sage text-ink scale-110 shadow-lg' : 'bg-card border-line text-ink-soft'
        } transition-all duration-300`}>
          <span className="text-[10px] font-bold">⚙️</span>
        </div>

        {/* Node 3: Gemini */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[2px] relative z-10 ${
          activeStep === 2 ? 'bg-lavender border-lavender text-ink scale-110 shadow-lg' : 'bg-card border-line text-ink-soft'
        } transition-all duration-300`}>
          <span className="text-[10px] font-bold">✨</span>
        </div>

        {/* Node 4: Response */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[2px] relative z-10 ${
          activeStep === 3 ? 'bg-butter border-butter text-ink scale-110 shadow-lg' : 'bg-card border-line text-ink-soft'
        } transition-all duration-300`}>
          <span className="text-[10px] font-bold">📊</span>
        </div>
      </div>

      <div className="bg-card border border-line/20 rounded-lg p-2.5 flex items-center justify-center min-h-[42px] text-center shadow-sm">
        <span className="font-mono text-[9.5px] font-bold text-ink-soft animate-pulse">
          {steps[activeStep]}
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   WIDGET: APILogConsole
   ========================================================================== */
function APILogConsole() {
  const [logs, setLogs] = useState([
    'INFO: Express router initialized.',
    'DB: Connection pools setup successfully.',
    'API: GET /api/v1/projects 200 OK (8ms)'
  ]);

  useEffect(() => {
    const rawLogs = [
      'API: POST /api/v1/auth/jwt 201 Created (14ms)',
      'DB: db.students.find({ course: "B.E. IT" })',
      'API: GET /api/v1/skills 200 OK (6ms)',
      'API: PATCH /api/v1/projects/1 200 OK (22ms)',
      'DB: db.experience.updateOne({ id: 2 })',
      'INFO: Dispatching n8n webhook payload...',
      'DB: Mongo schema validate: Success.'
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const nextLogs = [...prev.slice(1), rawLogs[i]];
        i = (i + 1) % rawLogs.length;
        return nextLogs;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1c1917] text-[#efe8d8]/85 font-mono text-[9px] p-2.5 rounded-lg border border-line/10 flex flex-col gap-1 min-h-[76px] justify-center mt-2.5 overflow-hidden">
      {logs.map((log, idx) => {
        let color = 'text-[#efe8d8]/70';
        if (log.includes('POST') || log.includes('JWT')) color = 'text-[#c1623d]'; // Terracotta
        if (log.includes('200 OK') || log.includes('Success')) color = 'text-[#7d8f6c]'; // Sage Deep
        if (log.includes('db.')) color = 'text-[#b9aed4]'; // Lavender
        
        return (
          <div key={idx} className={`truncate ${color}`}>
            &gt; {log}
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   WIDGET: MLTrainingGraph
   ========================================================================== */
function MLTrainingGraph() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let points = [];
    let step = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update data
      if (step < 80) {
        const loss = 45 * Math.exp(-step / 20) + 5 + Math.sin(step) * 1.5;
        const acc = 30 + 60 * (1 - Math.exp(-step / 25)) + Math.cos(step) * 1;
        points.push({ x: step, loss, acc });
        step++;
      } else {
        points = [];
        step = 0;
      }

      const padding = 12;
      const w = canvas.width - padding * 2;
      const h = canvas.height - padding * 2;

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(91, 84, 72, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        const y = padding + (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
      }

      // Draw Loss line
      ctx.strokeStyle = 'rgba(193, 98, 61, 0.8)'; // Terracotta
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      points.forEach((p, idx) => {
        const px = padding + (p.x / 80) * w;
        const py = padding + h - (p.loss / 60) * h;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Draw Accuracy line
      ctx.strokeStyle = 'rgba(125, 143, 108, 0.8)'; // Sage Deep
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      points.forEach((p, idx) => {
        const px = padding + (p.x / 80) * w;
        const py = padding + h - (p.acc / 100) * h;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Text labels
      ctx.fillStyle = '#5b5448';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('Loss: ' + (points[points.length - 1]?.loss.toFixed(1) || '50.0'), padding, padding - 3);
      ctx.fillStyle = '#7d8f6c';
      ctx.fillText('Acc: ' + (points[points.length - 1]?.acc.toFixed(1) || '30.0') + '%', w - 32, padding - 3);

      animationId = requestAnimationFrame(draw);
    };

    // Resize canvas to offsetWidth
    canvas.width = canvas.parentElement.clientWidth || 240;
    canvas.height = 70;

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[70px] bg-cream/15 rounded-lg border border-line/25 mt-2.5" />;
}

/* ==========================================================================
   WIDGET: GitGraphWidget
   ========================================================================== */
function GitGraphWidget() {
  return (
    <div className="mt-3 flex items-center justify-center bg-cream/15 p-2 rounded-xl border border-line/25 w-full h-[76px] select-none">
      <svg className="w-full h-full" viewBox="0 0 100 40">
        {/* Main Branch line */}
        <line x1="10" y1="20" x2="90" y2="20" stroke="rgba(91, 84, 72, 0.25)" strokeWidth="1.5" />
        {/* Dev Branch fork line */}
        <path d="M 30 20 Q 45 32 60 20" fill="none" stroke="var(--color-terracotta)" strokeWidth="1.5" />
        
        {/* Commit Nodes */}
        <circle cx="15" cy="20" r="2.2" fill="var(--color-ink-soft)" />
        <circle cx="30" cy="20" r="2.2" fill="var(--color-ink)" />
        <circle cx="45" cy="26" r="2.2" fill="var(--color-terracotta)" />
        <circle cx="60" cy="20" r="2.2" fill="var(--color-sage-deep)" />
        <circle cx="85" cy="20" r="2.2" fill="var(--color-ink)" />
      </svg>
    </div>
  );
}

/* ==========================================================================
   MAIN EXPORT: Skills
   ========================================================================== */
export default function Skills() {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

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
    const w = rect.width;
    const h = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const rotateX = -((y - h / 2) / h * 12).toFixed(2);
    const rotateY = ((x - w / 2) / w * 12).toFixed(2);

    card.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.boxShadow = '0 20px 40px -15px rgba(33,29,24,0.18)';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '';
  };

  const renderTags = (tagsList) => {
    return (
      <div className="flex flex-wrap gap-1.5 mt-4 relative z-20">
        {tagsList.map((skill, sIndex) => (
          <button
            key={sIndex}
            onClick={(e) => {
              e.stopPropagation();
              handleSkillClick(skill);
            }}
            className="bg-cream2 text-[12px] font-semibold px-2.75 py-1.5 rounded-lg border border-line text-ink hover:scale-105 hover:bg-cream hover:border-terracotta hover:text-terracotta-deep active:scale-95 transition-all duration-200 cursor-pointer text-left"
          >
            {skill}
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-[90px] bg-cream2 border-y border-line" id="skills">
      <div className="max-w-[1180px] mx-auto px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex justify-between items-end mb-11 gap-6 flex-wrap reveal-left ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Capabilities</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Technical skills.</h2>
          </div>
          <p className="text-ink-soft text-[14.5px] max-w-[320px] leading-[1.7] font-medium">
            The languages, frameworks, and tools I reach for when building something real (click any skill to see where it was used).
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Card 1: Languages & Frontend - col-span-2 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-card border border-line rounded-2xl p-6 flex flex-col justify-between border-t-4 border-t-terracotta reveal-scale ${gridVisible ? 'visible' : ''} hover-lift spotlight-card lg:col-span-2`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex flex-col gap-2 relative z-10">
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-ink-soft">
                Development Core
              </span>
              <h3 className="font-serif text-[21px] font-bold text-ink leading-tight">
                Languages & Frontend
              </h3>
              <p className="text-[13px] text-ink-soft leading-relaxed max-w-sm mt-1">
                Writing semantic structure, clean logic, and modern responsive React layouts.
              </p>
              {renderTags(["JavaScript", "Python", "SQL", "React.js", "HTML5", "CSS3"])}
            </div>
            <CodeEditorWidget />
          </div>

          {/* Card 2: GenAI & Automation - col-span-2, row-span-2 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-card border border-line rounded-2xl p-6 flex flex-col justify-between border-t-4 border-t-lavender reveal-scale ${gridVisible ? 'visible' : ''} hover-lift spotlight-card lg:col-span-2 lg:row-span-2`}
            style={{ transitionDelay: '120ms' }}
          >
            <div className="flex flex-col gap-2 relative z-10">
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-ink-soft">
                Intelligent agents
              </span>
              <h3 className="font-serif text-[21px] font-bold text-ink leading-tight">
                GenAI & Automation
              </h3>
              <p className="text-[13px] text-ink-soft leading-relaxed mt-1">
                Engineering multi-agent workflows, semantic LLM structures, and custom outbound telephonic bots.
              </p>
              {renderTags(["OpenAI API", "Gemini API", "n8n", "VAPI"])}
            </div>
            <PipelineFlowWidget />
          </div>

          {/* Card 3: Backend & Databases - col-span-2 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-card border border-line rounded-2xl p-6 flex flex-col justify-between border-t-4 border-t-sage-deep reveal-scale ${gridVisible ? 'visible' : ''} hover-lift spotlight-card lg:col-span-2`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex flex-col gap-2 relative z-10">
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-ink-soft">
                Server & Models
              </span>
              <h3 className="font-serif text-[21px] font-bold text-ink leading-tight">
                Backend & Databases
              </h3>
              <p className="text-[13px] text-ink-soft leading-relaxed max-w-sm mt-1">
                Designing RESTful routes, JWT secure validation sessions, and CRUD data collections.
              </p>
              {renderTags(["Node.js", "Express.js", "Django", "REST API", "MongoDB", "MySQL"])}
            </div>
            <APILogConsole />
          </div>

          {/* Card 4: ML & NLP - col-span-2 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-card border border-line rounded-2xl p-6 flex flex-col justify-between border-t-4 border-t-terracotta reveal-scale ${gridVisible ? 'visible' : ''} hover-lift spotlight-card lg:col-span-2`}
            style={{ transitionDelay: '280ms' }}
          >
            <div className="flex flex-col gap-2 relative z-10">
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-ink-soft">
                Intelligence
              </span>
              <h3 className="font-serif text-[21px] font-bold text-ink leading-tight">
                ML & NLP Engineering
              </h3>
              <p className="text-[13px] text-ink-soft leading-relaxed max-w-sm mt-1">
                Preprocessing texts, engineering features, training classifiers, and deploying predictive models.
              </p>
              {renderTags(["scikit-learn", "pandas", "NumPy", "TensorFlow", "NLTK", "spaCy"])}
            </div>
            <MLTrainingGraph />
          </div>

          {/* Card 5: Tools & QA - col-span-1 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-card border border-line rounded-2xl p-6 flex flex-col justify-between border-t-4 border-t-butter reveal-scale ${gridVisible ? 'visible' : ''} hover-lift spotlight-card lg:col-span-1`}
            style={{ transitionDelay: '360ms' }}
          >
            <div className="flex flex-col gap-2 relative z-10">
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-ink-soft">
                Devops
              </span>
              <h3 className="font-serif text-[20px] font-bold text-ink leading-tight">
                Tools & QA
              </h3>
              {renderTags(["Git", "GitHub", "Selenium", "Postman"])}
            </div>
            <GitGraphWidget />
          </div>

          {/* Card 6: Soft Skills - col-span-3 */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-card border border-line rounded-2xl p-6 flex flex-col justify-between border-t-4 border-t-sage-deep reveal-scale ${gridVisible ? 'visible' : ''} hover-lift spotlight-card lg:col-span-3`}
            style={{ transitionDelay: '420ms' }}
          >
            <div className="flex flex-col gap-2 relative z-10 w-full">
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase font-bold text-ink-soft">
                Professionalism
              </span>
              <h3 className="font-serif text-[21px] font-bold text-ink leading-tight">
                Soft Skills & Leadership
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 select-none">
                <div className="bg-cream/15 border border-line/20 rounded-xl p-3 flex flex-col gap-1 shadow-sm">
                  <span className="font-serif text-[13.5px] font-bold text-ink">Mentorship & Collab</span>
                  <span className="text-[11.5px] text-ink-soft leading-normal">Mentored 10+ junior interns and designers on layouts and practices.</span>
                </div>
                <div className="bg-cream/15 border border-line/20 rounded-xl p-3 flex flex-col gap-1 shadow-sm">
                  <span className="font-serif text-[13.5px] font-bold text-ink">Analytical Mindset</span>
                  <span className="text-[11.5px] text-ink-soft leading-normal">Strong problem solver, resolving system logs and API delays.</span>
                </div>
                <div className="bg-cream/15 border border-line/20 rounded-xl p-3 flex flex-col gap-1 shadow-sm">
                  <span className="font-serif text-[13.5px] font-bold text-ink">Driven & Self-Motivated</span>
                  <span className="text-[11.5px] text-ink-soft leading-normal">Shipped 10+ projects and maintained excellent deadlines.</span>
                </div>
              </div>

              {renderTags(["Leadership", "Problem Solving", "Self-Motivated", "Adaptability", "Team work", "Time Management", "Communication Skills"])}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
