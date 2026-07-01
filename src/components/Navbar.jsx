import React, { useState, useEffect } from 'react';
import { Sun, Terminal } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-cream/96 backdrop-blur-[12px] border-b border-line/80 shadow-[0_10px_30px_rgba(33,29,24,0.04)]' 
        : 'bg-cream/92 backdrop-blur-[10px] border-b border-line'
    }`}>
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-terracotta via-butter to-sage transition-all duration-75 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      ></div>
      <div className={`max-w-[1180px] mx-auto px-8 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-[18px]'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-line shrink-0 flex items-center justify-center border border-line/40">
            <img 
              src="/2023FHIT027.jpg" 
              alt="Hemant Patil" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <strong className="block text-sm font-bold">Hemant Patil</strong>
            <span className="block text-[11px] text-ink-soft tracking-[0.04em]">Software Developer</span>
          </div>
        </div>
        
        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 list-none">
          <li><a href="#about" className="text-[13.5px] font-semibold text-ink-soft hover:text-terracotta-deep transition-colors duration-200">About</a></li>
          <li><a href="#skills" className="text-[13.5px] font-semibold text-ink-soft hover:text-terracotta-deep transition-colors duration-200">Skills</a></li>
          <li><a href="#experience" className="text-[13.5px] font-semibold text-ink-soft hover:text-terracotta-deep transition-colors duration-200">Experience</a></li>
          <li><a href="#projects" className="text-[13.5px] font-semibold text-ink-soft hover:text-terracotta-deep transition-colors duration-200">Work</a></li>
          <li><a href="#certifications" className="text-[13.5px] font-semibold text-ink-soft hover:text-terracotta-deep transition-colors duration-200">Certifications</a></li>
          <li><a href="#contact" className="text-[13.5px] font-semibold text-ink-soft hover:text-terracotta-deep transition-colors duration-200">Contact</a></li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-card hover:bg-cream2 border border-line flex items-center justify-center text-ink cursor-pointer transition-all duration-200 shadow-sm hover:scale-105"
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Hacker Mode' : 'Switch to Editorial Cream'}
          >
            {theme === 'light' ? <Terminal size={17} /> : <Sun size={17} />}
          </button>

          <button 
            className="bg-ink text-cream px-[22px] py-2.5 rounded-full text-[13px] font-bold border-none cursor-pointer hover:bg-ink-soft transition-colors duration-200"
            onClick={() => scrollToSection('contact')}
          >
            Hire Me
          </button>
          
          {/* Hamburger Menu Button */}
          <button 
            className="block lg:hidden bg-none border-none text-2xl cursor-pointer text-ink focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-cream border-b border-line px-8 py-4">
          <ul className="flex flex-col gap-4 list-none">
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-left w-full text-[14.5px] font-semibold text-ink-soft hover:text-terracotta-deep py-1"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('skills')} 
                className="text-left w-full text-[14.5px] font-semibold text-ink-soft hover:text-terracotta-deep py-1"
              >
                Skills
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('experience')} 
                className="text-left w-full text-[14.5px] font-semibold text-ink-soft hover:text-terracotta-deep py-1"
              >
                Experience
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="text-left w-full text-[14.5px] font-semibold text-ink-soft hover:text-terracotta-deep py-1"
              >
                Work
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('certifications')} 
                className="text-left w-full text-[14.5px] font-semibold text-ink-soft hover:text-terracotta-deep py-1"
              >
                Certifications
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-left w-full text-[14.5px] font-semibold text-ink-soft hover:text-terracotta-deep py-1"
              >
                Contact
              </button>
            </li>
            <li className="pt-2.5 border-t border-line/20 flex justify-between items-center">
              <span className="text-[13.5px] font-semibold text-ink-soft">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cream2 border border-line text-[12.5px] font-bold text-ink cursor-pointer hover:bg-line transition-all duration-200"
              >
                {theme === 'light' ? (
                  <>
                    <Terminal size={14} /> Hacker Mode
                  </>
                ) : (
                  <>
                    <Sun size={14} /> Cream Mode
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
