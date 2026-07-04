import React, { useState, useEffect, useRef } from 'react';
import useReveal from '../hooks/useReveal';
import { X, ExternalLink } from 'lucide-react';

/* ==========================================================================
   SANDBOX SIMULATOR 1: Student Management System (MERN Stack CRUD)
   ========================================================================== */
function StudentManagementSandbox() {
  const [students, setStudents] = useState([
    { id: 101, name: "Aarav Sharma", course: "B.E. Computer Science", grade: "A" },
    { id: 102, name: "Priya Patel", course: "B.E. Information Technology", grade: "A+" },
    { id: 103, name: "Kabir Mehta", course: "B.E. Data Science", grade: "B" }
  ]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('B.E. Information Technology');
  const [grade, setGrade] = useState('A');
  const [isEditing, setIsEditing] = useState(null);
  const [networkLog, setNetworkLog] = useState('System standby. Perform a CRUD operation...');
  const [isSyncing, setIsSyncing] = useState(false);

  const triggerNetworkTrace = (method, endpoint, status, body) => {
    setIsSyncing(true);
    setNetworkLog(`📡 [CLIENT] Request queued: ${method} ${endpoint} ...`);
    setTimeout(() => {
      setNetworkLog(`⚙️ [SERVER] Express matching route. Running validations...`);
      setTimeout(() => {
        setNetworkLog(`🍃 [DATABASE] MongoDB Query: db.students.updateOne({ id: ... })`);
        setTimeout(() => {
          setNetworkLog(`✅ [RESPONSE] HTTP ${status}. Document synchronized on client UI.`);
          setIsSyncing(false);
        }, 500);
      }, 500);
    }, 500);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (isEditing) {
      setStudents(students.map(s => s.id === isEditing ? { id: isEditing, name, course, grade } : s));
      triggerNetworkTrace('PUT', `/api/students/${isEditing}`, '200 OK', { name, course, grade });
      setIsEditing(null);
    } else {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 101;
      setStudents([...students, { id: newId, name, course, grade }]);
      triggerNetworkTrace('POST', '/api/students', '201 Created', { name, course, grade });
    }
    setName('');
  };

  const handleEdit = (student) => {
    setIsEditing(student.id);
    setName(student.name);
    setCourse(student.course);
    setGrade(student.grade);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
    triggerNetworkTrace('DELETE', `/api/students/${id}`, '200 OK', null);
  };

  return (
    <div className="flex flex-col gap-4 text-xs font-sans text-ink">
      <div className="bg-cream2/60 border border-line/45 rounded-xl p-3 flex flex-col gap-2">
        <span className="font-mono text-[9px] font-bold text-ink-soft uppercase tracking-wider block">Interactive DB Grid</span>
        <div className="overflow-x-auto max-h-[140px] no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line text-ink-soft/80 font-bold font-mono text-[9px] uppercase">
                <th className="py-1">ID</th>
                <th className="py-1">Name</th>
                <th className="py-1">Course</th>
                <th className="py-1">Grade</th>
                <th className="py-1 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b border-line/25 hover:bg-cream2/30">
                  <td className="py-1.5 font-mono">{student.id}</td>
                  <td className="py-1.5 font-semibold text-ink">{student.name}</td>
                  <td className="py-1.5 text-ink-soft">{student.course.replace('Bachelor of Engineering ', 'B.E. ')}</td>
                  <td className="py-1.5 font-mono font-bold text-terracotta-deep">{student.grade}</td>
                  <td className="py-1.5 text-right flex gap-2 justify-end">
                    <button onClick={() => handleEdit(student)} className="text-[10px] text-sage-deep hover:underline cursor-pointer border-none bg-transparent font-bold">Edit</button>
                    <button onClick={() => handleDelete(student.id)} className="text-[10px] text-red-500 hover:underline cursor-pointer border-none bg-transparent font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 items-end bg-card border border-line/45 p-3 rounded-xl shadow-sm">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-mono text-[8px] font-bold text-ink-soft uppercase tracking-wider">Student Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Aarav Sharma..." 
            className="border border-line/60 bg-cream/35 rounded-lg p-1.5 text-[11px] focus:outline-none focus:border-terracotta font-semibold" 
            required 
          />
        </div>
        <div className="w-[110px] flex flex-col gap-1">
          <label className="font-mono text-[8px] font-bold text-ink-soft uppercase tracking-wider">Course</label>
          <select value={course} onChange={e => setCourse(e.target.value)} className="border border-line/60 bg-cream/35 rounded-lg p-1.5 text-[11px] focus:outline-none focus:border-terracotta font-semibold">
            <option value="B.E. Computer Science">B.E. CS</option>
            <option value="B.E. Information Technology">B.E. IT</option>
            <option value="B.E. Data Science">B.E. DS</option>
          </select>
        </div>
        <div className="w-[50px] flex flex-col gap-1">
          <label className="font-mono text-[8px] font-bold text-ink-soft uppercase tracking-wider">Grade</label>
          <select value={grade} onChange={e => setGrade(e.target.value)} className="border border-line/60 bg-cream/35 rounded-lg p-1.5 text-[11px] focus:outline-none focus:border-terracotta font-semibold font-mono">
            <option>A+</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
        <button type="submit" disabled={isSyncing} className="bg-ink hover:bg-terracotta text-cream px-3 py-1.5 rounded-lg text-[10.5px] font-bold border-none transition-colors duration-200 cursor-pointer active:scale-95">
          {isEditing ? 'Save' : 'Add'}
        </button>
      </form>

      <div className="bg-[#1c1917] rounded-xl p-3 border border-line/10 text-[#efe8d8] font-mono flex flex-col gap-2">
        <div className="flex justify-between items-center text-[8.5px] text-[#a8b89a] border-b border-line/10 pb-1.5 font-bold tracking-wider select-none">
          <span>🖥️ MERN PIPELINE DISPATCH TRACE</span>
          <span className={isSyncing ? "animate-pulse text-terracotta" : "text-[#a8b89a]/50"}>{isSyncing ? "SYNCING DATA..." : "STANDBY"}</span>
        </div>
        <div className="text-[10px] leading-relaxed min-h-[38px] text-[#efe8d8]/85">
          {networkLog}
        </div>
        
        {/* trace animation graph */}
        <div className="flex items-center justify-between px-6 pt-1 text-[9px] select-none text-[#a8b89a]/70">
          <div className={`flex flex-col items-center gap-0.5 ${isSyncing ? 'text-terracotta font-bold animate-pulse' : ''}`}>
            <span>💻</span>
            <span>React App</span>
          </div>
          <div className="flex-1 border-t border-dashed border-[#efe8d8]/15 mx-2 text-center text-[7.5px]">
            {isSyncing ? 'POST payload' : ''}
          </div>
          <div className={`flex flex-col items-center gap-0.5 ${isSyncing ? 'text-sage font-bold animate-pulse' : ''}`}>
            <span>⚙️</span>
            <span>Express Server</span>
          </div>
          <div className="flex-1 border-t border-dashed border-[#efe8d8]/15 mx-2 text-center text-[7.5px]">
            {isSyncing ? 'Mongoose ORM' : ''}
          </div>
          <div className={`flex flex-col items-center gap-0.5 ${isSyncing ? 'text-butter font-bold animate-pulse' : ''}`}>
            <span>🍃</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SANDBOX SIMULATOR 2: SMS Spam Detection (NLP Classification)
   ========================================================================== */
function SpamDetectionSandbox() {
  const [text, setText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const presets = [
    { type: 'spam', label: 'Spam Offer', text: "URGENT! You won a 1-week holiday to Hawaii plus $2000 cash. Call 0800-123-456 to claim now. Promo code: HW99." },
    { type: 'ham', label: 'Normal Text', text: "Hey Hemant, are we still meeting for group study at the library this evening? Let me know if you need the notes." },
    { type: 'spam', label: 'Draw Win', text: "FREE entry in 2 a weekly draw to win £1000 gift card! Text DRAW to 87066 to receive T&Cs." }
  ];

  const handleClassify = (inputText) => {
    const rawText = inputText || text;
    if (!rawText.trim()) return;

    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      const lower = rawText.toLowerCase();
      const spamWords = ['urgent', 'won', 'holiday', 'cash', 'claim', 'promo', 'free', 'draw', 'win', 'gift card', 'text', 'money', 'prize', 'winner', 'click', 'subscribe', 'call now', 'cash prize', '£', '$', 'claims'];
      const hamWords = ['meet', 'meeting', 'study', 'library', 'notes', 'work', 'job', 'class', 'project', 'hello', 'hi', 'friend', 'coming', 'home', 'tomorrow', 'sure'];

      let spamScore = 0;
      let hamScore = 0;

      spamWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b|${word}`, 'gi');
        const matches = lower.match(regex);
        if (matches) spamScore += matches.length * 2.5;
      });
      hamWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b|${word}`, 'gi');
        const matches = lower.match(regex);
        if (matches) hamScore += matches.length * 1.5;
      });

      let probability = 5;
      if (spamScore > 0 || hamScore > 0) {
        probability = (spamScore / (spamScore + hamScore)) * 100;
      }
      if (probability < 5) probability = 1.8;
      if (probability > 95) probability = 98.2;

      const words = rawText.split(/(\s+)/);
      const highlightedText = words.map((w, idx) => {
        const wClean = w.toLowerCase().replace(/[^a-z0-9$£]/g, '');
        if (spamWords.includes(wClean) || (wClean.startsWith('$') || wClean.startsWith('£'))) {
          return <span key={idx} className="bg-red-500/15 text-red-600 dark:text-red-400 px-1 py-0.5 rounded font-bold">{w}</span>;
        }
        if (hamWords.includes(wClean)) {
          return <span key={idx} className="bg-green-500/15 text-green-600 dark:text-green-400 px-1 py-0.5 rounded font-bold">{w}</span>;
        }
        return w;
      });

      setResult({
        probability,
        isSpam: probability > 50,
        highlightedText
      });
      setIsScanning(false);
    }, 1100);
  };

  const needleRotation = result ? -90 + (result.probability / 100) * 180 : -90;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_0.9fr] gap-4 text-xs font-sans text-ink items-start">
      {/* Smartphone Mockup */}
      <div className="bg-[#1c1917] border-[4px] border-[#2e2a24] rounded-[24px] p-3.5 flex flex-col h-[320px] shadow-lg relative text-[#efe8d8]">
        <div className="flex justify-between items-center px-2 pb-2 text-[9px] opacity-50 font-mono select-none">
          <span>10:30 AM</span>
          <span className="w-14 h-3.5 bg-[#2e2a24] rounded-full absolute left-1/2 -translate-x-1/2 top-1"></span>
          <span>5G 🔋 100%</span>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#141210] rounded-xl p-3 flex flex-col gap-2.5 my-1.5 max-h-[170px] no-scrollbar">
          <div className="bg-card/10 text-[9.5px] px-2.5 py-2 rounded-lg text-[#a8b89a] border border-line/10 font-mono leading-relaxed">
            🛡️ AI Spam Shield v1.0:<br />Type or choose a message to extract TF-IDF weights and run Naive Bayes classification.
          </div>
          {text && (
            <div className="self-end max-w-[85%] bg-terracotta text-cream px-3 py-2 rounded-2xl rounded-tr-none text-[11px] leading-snug font-medium shadow-sm">
              {text}
            </div>
          )}
        </div>

        <div className="flex gap-1.5 items-center mt-auto">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type message details..."
            className="flex-1 bg-[#141210] border border-line/15 rounded-xl p-2.5 text-[11px] focus:outline-none focus:border-terracotta text-[#efe8d8] placeholder-ink-soft/40"
            disabled={isScanning}
          />
          <button
            onClick={() => handleClassify(text)}
            disabled={isScanning || !text.trim()}
            className="bg-terracotta hover:bg-terracotta-deep text-cream px-3.5 py-2.5 rounded-xl border-none transition-colors duration-200 cursor-pointer disabled:opacity-50 select-none font-bold active:scale-95"
          >
            {isScanning ? 'Scan' : 'Classify'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] font-bold text-ink-soft uppercase tracking-wider block">Diagnostics Presets</span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setText(preset.text);
                  handleClassify(preset.text);
                }}
                className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold cursor-pointer transition-all duration-150 select-none active:scale-95 ${
                  preset.type === 'spam'
                    ? 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700'
                    : 'border-green-200 bg-green-50 hover:bg-green-100 text-green-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-line/45 rounded-2xl p-4 flex flex-col gap-3 min-h-[175px] shadow-sm justify-between">
          {isScanning && (
            <div className="flex flex-col items-center justify-center py-6 gap-2 text-center text-ink-soft">
              <span className="text-xl animate-spin">🌀</span>
              <span className="font-mono text-[9.5px] font-bold animate-pulse tracking-wider">COMPUTING TF-IDF WEIGHTS...</span>
            </div>
          )}

          {!isScanning && !result && (
            <div className="flex flex-col items-center justify-center py-8 text-center text-ink-soft/60">
              <span className="text-2xl">📊</span>
              <p className="mt-1 font-mono text-[9.5px] font-bold uppercase tracking-wider">Awaiting classification</p>
            </div>
          )}

          {!isScanning && result && (
            <>
              <div className="flex items-center gap-4 border-b border-line/10 pb-3">
                <div className="relative w-[70px] h-[35px] shrink-0">
                  <svg width="70" height="35" viewBox="0 0 100 50">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#efe8d8" strokeWidth="12" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" />
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a8b89a" />
                        <stop offset="50%" stopColor="#e8c468" />
                        <stop offset="100%" stopColor="#c1623d" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(50,50)">
                      <line x1="0" y1="0" x2="0" y2="-42" stroke="#211d18" strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${needleRotation})`} className="transition-transform duration-700 ease-out" />
                      <circle cx="0" cy="0" r="6.5" fill="#211d18" />
                    </g>
                  </svg>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-ink">
                    {Math.round(result.probability)}%
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[8px] font-bold text-ink-soft uppercase tracking-wider block">Shield Classification</span>
                  <strong className={`text-[13px] font-serif block ${result.isSpam ? 'text-terracotta-deep animate-pulse' : 'text-sage-deep'}`}>
                    {result.isSpam ? '⛔ SPAM DETECTED' : '✅ HAM (GENUINE)'}
                  </strong>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <span className="font-mono text-[8px] font-bold text-ink-soft uppercase tracking-wider block">Tokenized Highlight Mapping</span>
                <p className="text-[11px] leading-relaxed bg-cream/30 p-2.5 rounded-lg border border-line/20 font-medium">
                  {result.highlightedText}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SANDBOX SIMULATOR 3: HR Outbound Call Agent (Voice AI Dialogue Flow)
   ========================================================================== */
function CallAgentSandbox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [callStep, setCallStep] = useState(-1);
  const [techScore, setTechScore] = useState(0);
  const [commScore, setCommScore] = useState(0);
  const [callStatus, setCallStatus] = useState('STANDBY');
  const [dialogs, setDialogs] = useState([]);
  const dialogEndRef = useRef(null);

  const script = [
    { speaker: 'ai', text: "Hello! 👋 This is the automated HR screening assistant for Hemant Patil's team. Am I speaking with the coordinator?" },
    { speaker: 'manager', text: "Yes, hello. I wanted to verify Hemant's API and full-stack capabilities." },
    { speaker: 'ai', text: "Absolutely! Hemant has engineered 4 MERN stack applications with REST APIs from scratch. He also has strong experience in Python/Django backend systems." },
    { speaker: 'manager', text: "Excellent. Did he do any automation task?" },
    { speaker: 'ai', text: "Yes, during his automation internship at Pythonic Labs, he wrote Selenium scripts that automated 8-10 QA tasks, saving 38% manual validation work." },
    { speaker: 'manager', text: "Awesome. How about his communication and team fit?" },
    { speaker: 'ai', text: "Outstanding! He mentored junior developers at Zelta Climb, helping to resolve architecture hurdles. I'll flag his profile as Shortlisted. Dispatching webhook... Complete!" }
  ];

  useEffect(() => {
    if (dialogEndRef.current) {
      dialogEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dialogs]);

  useEffect(() => {
    let timer;
    if (isPlaying && callStep < script.length) {
      if (callStep === -1) {
        setCallStatus('CONNECTING...');
        timer = setTimeout(() => {
          setCallStatus('ACTIVE');
          setCallStep(0);
          setDialogs([script[0]]);
        }, 1100);
      } else {
        timer = setTimeout(() => {
          const nextStep = callStep + 1;
          if (nextStep < script.length) {
            setCallStep(nextStep);
            setDialogs(prev => [...prev, script[nextStep]]);
            
            if (nextStep === 2) setTechScore(75);
            if (nextStep === 4) { setTechScore(92); setCommScore(80); }
            if (nextStep === 6) { setCommScore(94); setCallStatus('SHORTLISTED'); }
          } else {
            setIsPlaying(false);
          }
        }, 2200);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, callStep]);

  const handleStartCall = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCallStep(-1);
      setDialogs([]);
      setTechScore(0);
      setCommScore(0);
      setCallStatus('STANDBY');
    } else {
      setIsPlaying(true);
      setCallStep(-1);
      setDialogs([]);
      setTechScore(0);
      setCommScore(0);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 text-xs font-sans text-ink items-stretch">
      {/* Waveform Console */}
      <div className="bg-[#1c1917] rounded-2xl p-4 border border-line/10 flex flex-col text-[#efe8d8] justify-between min-h-[300px]">
        <div className="flex justify-between items-center border-b border-line/10 pb-2 text-[10px] font-mono select-none">
          <span className="text-[#a8b89a] font-bold">🎙️ VAPI Outbound Dial Engine</span>
          <span className={`px-2 py-0.5 rounded font-bold tracking-wider ${
            callStatus === 'SHORTLISTED' ? 'bg-[#a8b89a] text-ink' :
            callStatus === 'ACTIVE' ? 'bg-terracotta text-cream animate-pulse' : 'bg-[#2e2a24] text-[#d9cfb8]/70'
          }`}>
            {callStatus}
          </span>
        </div>

        <div className="h-14 flex items-center justify-center gap-1 my-3 bg-[#141210] rounded-xl border border-line/5 overflow-hidden">
          {isPlaying && callStatus === 'ACTIVE' ? (
            Array.from({ length: 26 }).map((_, idx) => (
              <span
                key={idx}
                className="w-[3px] bg-gradient-to-t from-terracotta to-terracotta-deep rounded-full transition-all duration-300"
                style={{
                  height: `${Math.max(10, Math.sin(idx + Date.now()) * 40 + 50)}%`,
                  animation: `float-fast ${1.3 + (idx % 4) * 0.3}s ease-in-out infinite`
                }}
              />
            ))
          ) : (
            <span className="text-[10px] font-mono text-[#d9cfb8]/30 uppercase tracking-widest select-none">Voice Stream Idle</span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto bg-[#141210] rounded-xl p-3 flex flex-col gap-2.5 max-h-[155px] min-h-[140px] mb-3 no-scrollbar">
          {dialogs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-[#efe8d8]/35 font-mono text-[9px] p-2 leading-relaxed">
              <span>🔇 Press button below to launch automated call trace.</span>
            </div>
          )}
          {dialogs.map((dg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                dg.speaker === 'manager' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
                  dg.speaker === 'manager'
                    ? 'bg-[#2e2a24] text-[#efe8d8] rounded-tr-none border border-line/10'
                    : 'bg-gradient-to-tr from-terracotta to-terracotta-deep text-cream rounded-tl-none font-medium'
                }`}
              >
                {dg.text}
              </div>
              <span className="text-[8px] opacity-40 font-mono mt-1">
                {dg.speaker === 'manager' ? 'Coordinator' : 'Voice Agent (Hemant Clone)'}
              </span>
            </div>
          ))}
          <div ref={dialogEndRef} />
        </div>

        <button
          onClick={handleStartCall}
          className={`w-full py-2.5 rounded-xl text-[11px] font-bold border-none transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
            isPlaying
              ? 'bg-red-700 hover:bg-red-800 text-white'
              : 'bg-ink text-cream hover:bg-terracotta hover:text-white'
          }`}
        >
          {isPlaying ? '🔴 End Call Simulation' : '📞 Simulate Outbound Agent'}
        </button>
      </div>

      {/* Webhook scoring metric logs */}
      <div className="bg-card border border-line/45 rounded-2xl p-4 flex flex-col gap-3.5 justify-between shadow-sm">
        <div>
          <span className="font-mono text-[9.5px] font-bold text-ink-soft uppercase tracking-wider block mb-3 border-b border-line/10 pb-1">AI Match Ingest metrics</span>
          
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-mono text-[9.5px] font-bold text-ink">
                <span>💻 TECHNICAL SCORES</span>
                <span className="text-terracotta-deep">{techScore}%</span>
              </div>
              <div className="w-full bg-cream2/60 h-2 rounded-full overflow-hidden border border-line/30">
                <div className="bg-gradient-to-r from-terracotta to-terracotta-deep h-full transition-all duration-500 ease-out" style={{ width: `${techScore}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-mono text-[9.5px] font-bold text-ink">
                <span>💬 SOFT SKILLS / COMM</span>
                <span className="text-sage-deep">{commScore}%</span>
              </div>
              <div className="w-full bg-cream2/60 h-2 rounded-full overflow-hidden border border-line/30">
                <div className="bg-gradient-to-r from-sage to-sage-deep h-full transition-all duration-500 ease-out" style={{ width: `${commScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1c1917] rounded-xl p-3 border border-line/10 text-[#d9cfb8] font-mono text-[8.5px] flex flex-col gap-1 min-h-[110px] leading-relaxed">
          <span className="text-[#a8b89a] font-bold border-b border-line/10 pb-1 block mb-1">DISPATCH WEBHOOK LOGS:</span>
          {callStatus === 'STANDBY' && <span>▶ AGENT AWAITING DISPATCH</span>}
          {callStatus === 'CONNECTING...' && <span>▶ ESTABLISHING VOICE SIP CONNECTOR...<br />▶ VAPI BRIDGE CONNECTED</span>}
          {callStatus === 'ACTIVE' && (
            <>
              <span>▶ SIP STREAMING STARTED [CALL_ID: v_821f]</span>
              {callStep >= 2 && <span className="text-[#efe8d8]/80">▶ MATCH_EVENT: API / MERN parameters recognized</span>}
              {callStep >= 4 && <span className="text-[#efe8d8]/80">▶ MATCH_EVENT: Automation QA (Selenium) mapped</span>}
            </>
          )}
          {callStatus === 'SHORTLISTED' && (
            <>
              <span className="text-green-400 font-bold">✔ EVALUATION STATUS: SHORTLISTED</span>
              <span>▶ n8n WORKFLOW INITIATED SUCCESS</span>
              <span>▶ INGEST METRICS DISPATCHED TO CHANNELS</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN COMPONENT: Projects
   ========================================================================== */
export default function Projects() {
  const [headerRef, headerVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [activeProject, setActiveProject] = useState(null);
  const [modalTab, setModalTab] = useState('details'); // 'details' | 'sandbox'
  const [filter, setFilter] = useState('All');
  const [highlightedProjectIndex, setHighlightedProjectIndex] = useState(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const filterCategories = ['All', 'Web Dev', 'AI / ML', 'AI Automation'];

  const projects = [
    {
      emoji: "🗂️",
      coverClass: "bg-gradient-to-br from-terracotta to-terracotta-deep",
      title: "Student Management System",
      category: "Web Dev",
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
      category: "AI / ML",
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
      category: "AI Automation",
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

  useEffect(() => {
    const handleHighlight = (e) => {
      const skill = e.detail.skill.toLowerCase();
      let matchedIndex = null;
      
      if (['react', 'node.js', 'mongodb', 'javascript', 'express.js', 'sql', 'mysql', 'mern', 'html5', 'css3'].includes(skill)) {
        matchedIndex = 0;
      } else if (['python', 'scikit-learn', 'nlp', 'pandas', 'numpy', 'tensorflow', 'nltk', 'spacy', 'selenium'].includes(skill)) {
        matchedIndex = 1;
      } else if (['n8n', 'vapi', 'openai api', 'gemini api', 'openai', 'gemini', 'postman'].includes(skill)) {
        matchedIndex = 2;
      }

      if (matchedIndex !== null) {
        setFilter('All');
        setHighlightedProjectIndex(matchedIndex);
        const timer = setTimeout(() => {
          setHighlightedProjectIndex(null);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('highlight-skill', handleHighlight);
    return () => window.removeEventListener('highlight-skill', handleHighlight);
  }, []);

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <section className="py-[90px] bg-cream2 border-y border-line" id="projects">
      <div className="max-w-[1180px] mx-auto px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex justify-between items-end mb-11 gap-6 flex-wrap reveal-left ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-terracotta-deep font-bold">Selected work</div>
            <h2 className="text-3xl sm:text-[42px] font-serif font-bold text-ink leading-tight">Projects I've shipped.</h2>
          </div>
          <p className="text-ink-soft text-[14.5px] max-w-[320px] leading-[1.7] font-medium">
            Three projects, three domains — web, machine learning, and AI automation. Click any card to see case details or play with live simulators.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 select-none">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 ${
                filter === cat
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-card text-ink-soft border-line hover:border-terracotta hover:text-terracotta-deep'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Card Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-[22px]"
        >
          {filteredProjects.map((proj, index) => {
            const originalIndex = projects.findIndex(p => p.title === proj.title);
            const isHighlighted = highlightedProjectIndex === originalIndex;

            return (
              <div
                key={originalIndex}
                onClick={() => {
                  setActiveProject(proj);
                  setModalTab('details');
                }}
                onMouseMove={handleMouseMove}
                className={`bg-card rounded-[18px] overflow-hidden border flex flex-col reveal-scale ${gridVisible ? 'visible' : ''} hover-lift group cursor-pointer transition-all duration-300 spotlight-card ${
                  isHighlighted 
                    ? 'ring-[3px] ring-terracotta border-terracotta scale-[1.03] shadow-lg shadow-terracotta/20 animate-pulse'
                    : 'border-line'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
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
                        className="text-[11px] font-bold font-mono bg-cream2 px-[9px] py-1 rounded-[6px] uppercase tracking-[0.03em] text-ink border border-line/20"
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
            );
          })}
        </div>
      </div>

      {/* Case Details & Playground Modal Overlay */}
      {activeProject && (
        <div 
          className="fixed inset-0 bg-[#0c0a09]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className={`bg-card border border-line rounded-[22px] w-full overflow-hidden shadow-2xl animate-chat-open flex flex-col transition-all duration-300 ${
              modalTab === 'sandbox' ? 'max-w-2xl lg:max-w-3xl' : 'max-w-lg'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Cover Image */}
            <div className={`h-[130px] flex items-center justify-center text-[44px] select-none relative ${activeProject.coverClass}`}>
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

            {/* Title Block */}
            <div className="px-6 pt-5 flex flex-col gap-1 border-b border-line/10 pb-4">
              <h3 className="text-[21px] font-serif font-bold text-ink leading-tight">
                {activeProject.title}
              </h3>
              <p className="text-[13px] text-ink-soft leading-normal">
                {activeProject.desc}
              </p>
            </div>

            {/* TAB SELECTOR BAR */}
            <div className="flex border-b border-line/10 bg-cream/15">
              <button
                onClick={() => setModalTab('details')}
                className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-none cursor-pointer transition-all ${
                  modalTab === 'details'
                    ? 'text-terracotta border-b-2 border-terracotta bg-card'
                    : 'text-ink-soft hover:text-ink hover:bg-cream/20'
                }`}
              >
                📝 Case Highlights
              </button>
              <button
                onClick={() => setModalTab('sandbox')}
                className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-none cursor-pointer transition-all ${
                  modalTab === 'sandbox'
                    ? 'text-terracotta border-b-2 border-terracotta bg-card'
                    : 'text-ink-soft hover:text-ink hover:bg-cream/20'
                }`}
              >
                🎮 Interactive Sandbox
              </button>
            </div>

            {/* Modal Body Tab Content */}
            <div className="p-6 flex-1 overflow-y-auto max-h-[380px] no-scrollbar">
              {modalTab === 'details' ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-ink-soft/75">
                      Technical implementation metrics:
                    </span>
                    <ul className="list-disc pl-[18px] flex flex-col gap-2 text-ink-soft">
                      {activeProject.details.map((detail, idx) => (
                        <li key={idx} className="text-[13px] leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-line/10">
                    {activeProject.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="text-[10px] font-bold font-mono bg-cream2 px-[9px] py-1 rounded-[6px] uppercase tracking-[0.03em] text-ink border border-line/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-chat-open">
                  {activeProject.title.includes("Student") && <StudentManagementSandbox />}
                  {activeProject.title.includes("Spam") && <SpamDetectionSandbox />}
                  {activeProject.title.includes("Call Agent") && <CallAgentSandbox />}
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 bg-cream/10 border-t border-line/10 flex justify-between items-center gap-3">
              <span className="font-mono text-[9px] text-ink-soft/50 font-bold uppercase select-none">
                {modalTab === 'details' ? 'CASE SUMMARY MODE' : 'LIVE PLAYGROUND'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-xl bg-cream2 text-ink border border-line text-[12px] font-bold cursor-pointer hover:bg-line transition-colors duration-150 border-none active:scale-95"
                >
                  Close
                </button>
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-ink text-cream text-[12px] font-bold cursor-pointer hover:bg-ink-soft transition-colors duration-150 flex items-center gap-1.5 no-underline active:scale-95"
                  >
                    View Demo <ExternalLink size={12} />
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
