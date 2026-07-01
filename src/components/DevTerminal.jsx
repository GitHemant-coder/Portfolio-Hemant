import React, { useState, useRef, useEffect } from 'react';
import useReveal from '../hooks/useReveal';

export default function DevTerminal() {
  const [revealRef, isVisible] = useReveal();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'Hemant OS v1.0.0 initialized.', type: 'system' },
    { text: 'Type "help" to see available commands.', type: 'system' }
  ]);
  const [isGlitched, setIsGlitched] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const terminalEndRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const commandResponses = {
    help: [
      'Available commands:',
      '  about       - Tell me about Hemant',
      '  skills      - Show technical stack',
      '  experience  - List work history',
      '  projects    - Show projects shipped',
      '  contact     - Show contact details',
      '  clear       - Clear screen history',
      '  sudo rm -rf - Do not run this!'
    ],
    about: [
      'Hemant Vilas Patil - Software Developer based in Navi Mumbai, India.',
      'Education: B.E. in IT (expected 2027) from Datta Meghe College of Engineering.',
      'Focus: Full-stack MERN, Python/Django development, GenAI & ML automation.',
      'Motto: Build fast, write clean, ship often.'
    ],
    skills: [
      'Technical Capabilities:',
      '  Languages : JavaScript, Python, SQL',
      '  Frontend  : React.js, HTML5, CSS3, TailwindCSS',
      '  Backend   : Node.js, Express.js, Django, REST APIs',
      '  Databases : MongoDB, MySQL, SQLite',
      '  GenAI/ML  : OpenAI API, Gemini API, n8n, VAPI, scikit-learn, NLP'
    ],
    experience: [
      'Work Experience:',
      '1. Python Automation Intern @ Pythonic Labs (Nov - Dec 2025)',
      '   - Created 8-10 automation tasks using Selenium and Python.',
      '2. Django Developer Intern @ Pythonic Labs (Sep - Oct 2025)',
      '   - Built Online Polling System using Django & MySQL.',
      '3. MERN Stack Developer Intern @ Mernix Consulting (Jul - Aug 2025)',
      '   - Built 4 full-stack applications from scratch.',
      '4. UI/UX as well as Frontend Developer and Mentor @ Zelta CLimb (Apr - Sept 2026)',
      '   - Design the UI and afterwards made frontend and work on backend as well',
      '   - Mentor the juniors interns as well to design UI/UX for different applications'
    ],
    projects: [
      'Projects Shipped:',
      '1. Student Management System (MERN Stack)',
      '   - Full-stack CRUD application for student records.',
      '2. SMS Spam Detection System (Python, scikit-learn)',
      '   - NLP spam classifier with TF-IDF vectorization.',
      '3. HR Outbound Call Agent (n8n, VAPI, OpenAI)',
      '   - Automated screening call agent.'
    ],
    contact: [
      'Contact Information:',
      '  Email    : patilhemant1103@gmail.com',
      '  Phone    : +91 9920600274',
      '  LinkedIn : linkedin.com/in/hemant-patil-2b4bb1312',
      '  GitHub   : github.com/GitHemant-coder'
    ]
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history, isGlitched, glitchText]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { text: `visitor@hemant-portfolio:~$ ${cmdText}`, type: 'input' }];

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (trimmed === 'sudo rm -rf' || trimmed === 'sudo rm -rf /') {
      setHistory(newHistory);
      setInput('');
      triggerGlitch();
      return;
    }

    const matchedCommand = commandResponses[trimmed];
    if (matchedCommand) {
      matchedCommand.forEach((line) => {
        newHistory.push({ text: line, type: 'output' });
      });
    } else {
      newHistory.push({ text: `Command not found: "${cmdText}". Type "help" for a list of commands.`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  const triggerGlitch = () => {
    setIsGlitched(true);
    setGlitchText('WARNING: SYSTEM CORRUPTION DETECTED...');

    const steps = [
      'CRITICAL ERROR: ACCESS DENIED',
      'DELETING FILES: src/components/Hero.jsx ... OK',
      'DELETING FILES: src/components/About.jsx ... OK',
      'DELETING FILES: public/index.html ... OK',
      'DELETING DATABASE: portfolio.db ... CORRUPTED',
      'SYSTEM SHUTDOWN IN 3...',
      'SYSTEM SHUTDOWN IN 2...',
      'SYSTEM SHUTDOWN IN 1...',
      'REBOOTING IN RESTORATION MODE...',
      'PULLING BACKUP FROM GITHUB REPOSITORY... SUCCESS',
      'ALL SYSTEMS DEPLOYED SUCCESSFULLY. WELCOME BACK!'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setGlitchText(step);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsGlitched(false);
            setHistory([
              { text: 'System recovery complete. Backup restored successfully.', type: 'system' },
              { text: 'Type "help" to start again.', type: 'system' }
            ]);
          }, 1500);
        }
      }, (idx + 1) * 700);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <section className="py-[60px] bg-cream" id="terminal">
      <div className="max-w-[1180px] mx-auto px-8">
        <div
          ref={revealRef}
          className={`reveal ${isVisible ? 'visible' : ''} flex flex-col gap-6`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Interactive CLI</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Developer Terminal.</h2>
            <p className="text-ink-soft text-[14.5px] max-w-[500px] leading-[1.7] mt-2">
              For command-line enthusiasts. Type commands directly or click the suggestion tags to explore my profile.
            </p>
          </div>

          <div className="w-full bg-[#1c1917] rounded-2xl overflow-hidden border border-line shadow-2xl flex flex-col h-[400px] text-sm font-mono text-[#d9cfb8]">
            {/* Terminal Top Bar */}
            <div className="bg-[#2e2a24] px-4 py-3 flex items-center justify-between border-b border-line/10 select-none">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#c1623d]" />
                <span className="w-3 h-3 rounded-full bg-[#e8c468]" />
                <span className="w-3 h-3 rounded-full bg-[#a8b89a]" />
              </div>
              <span className="text-[11px] font-bold text-ink-soft tracking-wider">hemant@developer-shell:~</span>
              <div className="w-8" />
            </div>

            {/* Terminal Body */}
            <div ref={terminalBodyRef} className="p-5 flex-1 overflow-y-auto flex flex-col gap-1.5 select-text">
              {isGlitched ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-red-500 font-bold gap-3 animate-pulse">
                  <span className="text-4xl">⚠️</span>
                  <span>{glitchText}</span>
                </div>
              ) : (
                <>
                  {history.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.type === 'input'
                          ? 'text-[#efe8d8]'
                          : line.type === 'system'
                            ? 'text-[#a8b89a]'
                            : line.type === 'error'
                              ? 'text-[#c1623d]'
                              : 'text-[#efe8d8]/80'
                      }
                    >
                      {line.text}
                    </div>
                  ))}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                    <span className="text-terracotta">visitor@hemant-portfolio:~$</span>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 text-[#efe8d8] focus:ring-0 p-0"
                      placeholder="Type a command..."
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                  </form>
                </>
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Suggestions Footer */}
            <div className="bg-[#23201d] px-5 py-3 border-t border-line/10 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] uppercase text-[#a8b89a] font-bold tracking-wider select-none">Quick Commands:</span>
              {['help', 'about', 'skills', 'experience', 'projects', 'contact', 'sudo rm -rf'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleCommand(suggestion)}
                  disabled={isGlitched}
                  className={`text-[11px] px-2 py-0.5 rounded bg-[#2e2a24] hover:bg-[#c1623d] hover:text-white transition-colors duration-150 border border-line/10 ${suggestion === 'sudo rm -rf' ? 'hover:bg-red-700 text-[#c1623d]' : 'text-[#efe8d8]'
                    }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
