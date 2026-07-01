import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Settings, Key } from 'lucide-react';

const SYSTEM_PROMPT = `
You are the AI Clone/Assistant of Hemant Vilas Patil. You answer questions about Hemant's profile, projects, skills, education, and internships deeply, accurately, and professionally. Keep answers conversational, helpful, and concise (under 3-4 sentences unless asked for details).

Here is the exact information you must use to answer:
- **Full Name**: Hemant Vilas Patil
- **Role**: Software Developer / IT Engineer
- **Location**: Mumbai, India
- **Email**: patilhemant1103@gmail.com
- **Phone / WhatsApp**: +91 9920600274
- **LinkedIn**: https://linkedin.com/in/hemant-patil-2b4bb1312
- **GitHub**: https://github.com/GitHemant-coder

**Education**:
- Bachelor of Engineering (B.E.) in Information Technology from Datta Meghe College of Engineering, Mumbai University (2023 - 2027)
- Cumulative CGPA: 8.13 / 10.0

**Internships (4 Completed)**:
1. **MERN Full Stack Developer Intern** @ Mernix Consulting (Jul 2025 - Aug 2025): Built 4 full stack web applications using MongoDB, Express.js, React.js, and Node.js. Developed RESTful APIs with complete CRUD operations and user authentication. Delivered all 4 projects independently from scratch.
2. **Django Developer Intern** @ Pythonic Labs (Sep 2025 - Oct 2025): Built a complete Online Polling System using Django, Python, and MySQL. Implemented MVC architecture, form validation, and real-time result display. Used Django ORM to simplify and speed up database operations.
3. **Python Automation Developer Intern** @ Pythonic Labs (Nov 2025 - Dec 2025): Completed 8-10 automation tasks using Selenium for UI testing and web scraping. Built automated email reporting pipelines with screenshot capture in Python. Cut manual QA effort by scripting repetitive browser-based tasks.
4. **Mentor and Developer** @ Zelta Climb (Apr 2026 - Sep 2026): Designed custom UI/UX layouts and developed the frontend of the company website. Engineered backend services, implemented business logic, and mentored junior developers/designers.

**Projects**:
1. **Student Management System**: Full stack MERN application with complete CRUD operations to manage student records. Built from scratch with a React frontend and Express/MongoDB backend.
2. **SMS Spam Detection System**: An NLP-powered classifier that flags spam SMS in real-time. Uses TF-IDF vectorization and trained Naive Bayes / SVM models in Python (scikit-learn).
3. **HR Outbound Call Agent**: An AI calling agent that autonomously runs HR screening interviews. VAPI handles the voice, n8n handles the workflow, requiring zero human intervention.

**Technical Stack / Skills**:
- Languages: JavaScript, Python, SQL
- Frontend: React.js, HTML5, CSS3, TailwindCSS
- Backend: Node.js, Express.js, Django, REST APIs
- Databases: MongoDB, MySQL, SQLite
- GenAI & ML: OpenAI API, Gemini API, n8n, VAPI, scikit-learn, NLP

If asked questions unrelated to Hemant's portfolio, professional life, or generic greetings, politely steer the conversation back to his portfolio. If asked about something not mentioned above, explain that Hemant doesn't have it on his profile yet but invites them to connect with him via the contact form or LinkedIn.
`;

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('hemant_portfolio_gemini_key') || '');
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm Hemant's AI Assistant. Ask me anything about his skills, internships, projects, or how to contact him!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const knowledgeBase = [
    {
      keywords: ['hi', 'hello', 'hey', 'yo', 'greetings', 'who are you', 'help'],
      reply: "Hello! I'm Hemant's portfolio assistant clone. I can answer questions about his technical capabilities, internships, and project details. Try asking about his 'skills' or 'experience'!"
    },
    {
      keywords: ['skill', 'stack', 'technology', 'language', 'frontend', 'backend', 'databases', 'coding', 'react', 'python', 'javascript', 'django', 'mern'],
      reply: "Hemant's core stack includes React.js, Node.js/Express, Python/Django, and MongoDB/MySQL. He also has strong experience in Machine Learning, NLP (TF-IDF/scikit-learn), and AI automation tools like n8n and VAPI."
    },
    {
      keywords: ['experience', 'intern', 'work', 'job', 'company', 'mernix', 'pythonic labs', 'history', 'zelta', 'zelta climb', 'mentor'],
      reply: "Hemant has completed 4 internships / professional experiences:\n1. MERN Full Stack Intern @ Mernix Consulting (Jul-Aug 2025)\n2. Django Developer Intern @ Pythonic Labs (Sep-Oct 2025)\n3. Python Automation Intern @ Pythonic Labs (Nov-Dec 2025)\n4. Mentor and Developer @ Zelta Climb (Apr-Sep 2026)"
    },
    {
      keywords: ['project', 'shipped', 'built', 'made', 'student', 'spam', 'sms', 'outbound', 'vapi', 'call agent', 'n8n'],
      reply: "Hemant has shipped three key projects:\n1. Student Management System (MERN CRUD App)\n2. SMS Spam Detection (NLP model with TF-IDF classifier)\n3. HR Outbound Call Agent (AI recruiter call automated using VAPI & n8n)"
    },
    {
      keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'linkedin', 'github', 'social', 'resume'],
      reply: "You can email Hemant at patilhemant1103@gmail.com, call/WhatsApp him at +91 9920600274, or check his LinkedIn (linkedin.com/in/hemant-patil-2b4bb1312) and GitHub (github.com/GitHemant-coder)."
    },
    {
      keywords: ['education', 'college', 'university', 'study', 'degree', 'cgpa', 'dmce', 'datta meghe'],
      reply: "Hemant is pursuing his Bachelor of Engineering in Information Technology at Datta Meghe College of Engineering, Mumbai University (2023-2027). He has a cumulative CGPA of 8.13/10.0."
    },
    {
      keywords: ['cert', 'credential', 'mysql', 'sql', 'mern', 'dba'],
      reply: "Hemant holds professional training certifications in MySQL (SQL, PL/SQL & DBA), JavaScript MERN Full Stack Development, Django Web Framework & REST APIs, and Machine Learning/NLP."
    }
  ];

  const quickReplies = [
    "What is your stack?",
    "Tell me about your internships.",
    "Show your projects.",
    "How can I contact you?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const saveApiKey = () => {
    const trimmedKey = apiKey.trim();
    if (!trimmedKey) {
      clearApiKey();
      return;
    }
    localStorage.setItem('hemant_portfolio_gemini_key', trimmedKey);
    setShowSettings(false);
    setMessages(prev => [
      ...prev,
      { text: "🔧 System: Gemini AI Clone activated! You will now receive deep and accurate answers.", sender: 'bot' }
    ]);
  };

  const clearApiKey = () => {
    localStorage.removeItem('hemant_portfolio_gemini_key');
    setApiKey('');
    setShowSettings(false);
    setMessages(prev => [
      ...prev,
      { text: "🔧 System: API Key cleared. Reverted to offline keyword-matching system.", sender: 'bot' }
    ]);
  };

  const triggerOfflineFallback = (text) => {
    const lowerText = text.toLowerCase();
    let matchedReply = null;

    for (const entry of knowledgeBase) {
      if (entry.keywords.some(keyword => lowerText.includes(keyword))) {
        matchedReply = entry.reply;
        break;
      }
    }

    if (!matchedReply) {
      matchedReply = "I'm not quite sure about that one. However, you can find details about it in the sections above or directly message Hemant using the Contact Form at the bottom of this page!";
    }

    setMessages(prev => [...prev, { text: matchedReply, sender: 'bot' }]);
  };

  const handleSend = async (textToSend) => {
    const text = textToSend.trim();
    if (!text) return;

    // Add user message
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    const activeApiKey = apiKey.trim() || process.env.REACT_APP_GEMINI_API_KEY;

    if (!activeApiKey) {
      // Offline fallback path
      setTimeout(() => {
        setIsTyping(false);
        triggerOfflineFallback(text);
      }, 850);
      return;
    }

    // Gemini API path
    try {
      const contents = [];
      
      // We skip the first message if it's the default bot greeting to ensure the list starts with a user turn
      messages.forEach((msg, idx) => {
        if (idx === 0 && msg.sender === 'bot') return;
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });

      contents.push({
        role: 'user',
        parts: [{ text: text }]
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: contents,
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            }
          })
        }
      );

      const data = await response.json();
      setIsTyping(false);

      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        const reply = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
      } else {
        console.error('Unexpected Gemini Response Structure:', data);
        let errorMsg = "I encountered an error processing that response with Gemini.";
        if (data.error && data.error.message) {
          errorMsg += ` Details: ${data.error.message}`;
        }
        setMessages(prev => [
          ...prev,
          { text: errorMsg + "\n\nReverting to offline search...", sender: 'bot' }
        ]);
        triggerOfflineFallback(text);
      }
    } catch (err) {
      console.error('Gemini API Error:', err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { text: "Connection error to Gemini API. Reverting to offline search...", sender: 'bot' }
      ]);
      triggerOfflineFallback(text);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-terracotta to-terracotta-deep rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 text-white cursor-pointer relative group border-none"
          aria-label="Open chat assistant"
        >
          <MessageSquare size={24} />
          {/* Pulsing Dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-cream animate-pulse"></span>
          {/* Tooltip */}
          <span className="absolute right-16 bg-[#1c1917] text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap pointer-events-none font-mono">
            Chat with AI Clone
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[360px] h-[480px] bg-card rounded-2xl shadow-2xl border border-line flex flex-col overflow-hidden origin-bottom-right animate-chat-open">
          {/* Header */}
          <div className="bg-[#1c1917] text-[#efe8d8] px-4 py-3.5 flex items-center justify-between border-b border-line/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-line shrink-0 flex items-center justify-center border border-line/40">
                <img 
                  src="/2023FHIT027.jpg" 
                  alt="Hemant Patil" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">HP Assistant</h4>
                <div className="text-[10px] text-green-400 flex items-center gap-1 mt-0.5 font-mono">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  <span>AI Agent Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className={`text-[#efe8d8]/70 hover:text-white transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center ${
                  showSettings ? 'text-terracotta' : ''
                }`}
                title="Configure Gemini API Key"
              >
                <Settings size={18} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#efe8d8]/70 hover:text-white transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 bg-card border-b border-line flex flex-col gap-2 transition-all duration-200">
              <h5 className="text-xs font-bold text-ink flex items-center gap-1">
                <Key size={12} className="text-terracotta" /> Configure Gemini AI Clone
              </h5>
              <p className="text-[10.5px] text-ink-soft leading-normal">
                Enter a Gemini API Key to enable deep, smart responses. The key is saved locally in your browser.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste Gemini API Key..."
                  className="flex-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-line bg-cream2 text-ink focus:outline-none focus:border-terracotta font-mono"
                />
                <button
                  type="button"
                  onClick={saveApiKey}
                  className="bg-ink hover:bg-terracotta transition-colors text-white px-3 py-1 rounded-lg text-xs font-bold cursor-pointer border-none"
                >
                  Save
                </button>
              </div>
              <div className="flex justify-between items-center text-[9.5px]">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-terracotta-deep hover:underline font-semibold"
                >
                  Get a free key here →
                </a>
                {localStorage.getItem('hemant_portfolio_gemini_key') && (
                  <button
                    type="button"
                    onClick={clearApiKey}
                    className="text-red-500 hover:underline font-semibold border-none bg-transparent cursor-pointer"
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-cream/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-tr from-terracotta to-terracotta-deep text-white rounded-tr-none'
                      : 'bg-cream2 text-ink border border-line/30 rounded-tl-none shadow-sm'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-ink-soft/60 mt-1 font-mono">
                  {msg.sender === 'user' ? 'You' : 'AI Clone'}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex flex-col items-start gap-1">
                <div className="bg-cream2 px-4 py-3 rounded-2xl rounded-tl-none border border-line/30 flex gap-1 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-ink-soft/45 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-ink-soft/45 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-ink-soft/45 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-[9px] text-ink-soft/60 font-mono">Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div className="px-4 py-2 bg-cream/20 flex gap-1.5 overflow-x-auto border-t border-line/5 select-none no-scrollbar">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(reply)}
                className="text-[11px] font-semibold text-ink-soft bg-cream2 px-3 py-1.5 rounded-full border border-line/45 hover:border-terracotta hover:text-terracotta-deep transition-colors shrink-0 cursor-pointer shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-line/10 flex gap-2 items-center bg-card"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 text-[13px] px-3.5 py-2.5 rounded-xl border border-line/40 bg-cream2 text-ink focus:outline-none focus:border-terracotta transition-colors placeholder-ink-soft/60"
            />
            <button
              type="submit"
              className="w-10 h-10 bg-[#1c1917] hover:bg-terracotta transition-colors rounded-xl flex items-center justify-center text-white cursor-pointer shadow-sm border-none"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
