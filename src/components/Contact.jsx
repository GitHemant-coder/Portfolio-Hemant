import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import useReveal from '../hooks/useReveal';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';


export default function Contact() {
  const [revealRef, isVisible] = useReveal();
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null); // 'success' or 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage(null);

    // Placeholder credentials that the user can replace later
    const serviceID = 'service_6jkl1et';
    const templateID = 'template_123456';
    const publicKey = 'WCnM9syl9t1jgvOgP';


    emailjs.sendForm(serviceID, templateID, form.current, { publicKey: publicKey })
      .then((result) => {
        setIsSending(false);
        setStatusMessage('Message sent! Hemant will get back to you soon.');
        setStatusType('success');
        form.current.reset();
      }, (error) => {
        setIsSending(false);
        setStatusMessage(`Failed to send the message: ${error.text || JSON.stringify(error)}`);
        setStatusType('error');
        console.error('EmailJS Error:', error);
      });
  };

  return (
    <section className="pt-[30px] pb-[90px]" id="contact">
      <div className="max-w-[1180px] mx-auto px-8">
        <div
          ref={revealRef}
          className={`bg-terracotta text-white rounded-[24px] py-10 px-7 lg:py-[64px] lg:px-[56px] grid grid-cols-1 lg:grid-cols-2 gap-12 relative overflow-hidden reveal-scale shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] ${isVisible ? 'visible' : ''}`}
        >
          {/* Decorative circular element */}
          <div className="absolute w-[300px] h-[300px] bg-white/[0.07] rounded-full -top-[120px] -right-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs tracking-[0.12em] uppercase text-white/85 font-bold mb-3.5">
                Get in touch
              </div>
              <h2 className="text-white text-3xl sm:text-[42px] leading-tight font-serif font-semibold mb-3.5">
                Let's build something together.
              </h2>
              <p className="text-[15px] opacity-95 leading-[1.7] max-w-[380px] mb-7">
                Open to internship extensions, full-time roles, and freelance projects. I usually reply within a day.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:patilhemant1103@gmail.com"
                className="flex items-center gap-3 bg-white/12 px-[18px] py-[13px] rounded-xl text-[13.5px] font-semibold transition-all duration-200 ease-in-out hover:bg-white/22 hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white shrink-0 shadow-sm">
                  <Mail size={18} strokeWidth={2.5} className="text-[#EA4335]" />
                </span>
                <span>patilhemant1103@gmail.com</span>
              </a>
              <a
                href="tel:+919920600274"
                className="flex items-center gap-3 bg-white/12 px-[18px] py-[13px] rounded-xl text-[13.5px] font-semibold transition-all duration-200 ease-in-out hover:bg-white/22 hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white shrink-0 shadow-sm">
                  <Phone size={18} strokeWidth={2.5} className="text-[#25D366]" />
                </span>
                <span>+91 9920600274</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hemant-patil-2b4bb1312"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-white/12 px-[18px] py-[13px] rounded-xl text-[13.5px] font-semibold transition-all duration-200 ease-in-out hover:bg-white/22 hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white shrink-0 shadow-sm">
                  <Linkedin size={18} strokeWidth={2.5} className="text-[#0A66C2]" />
                </span>
                <span>linkedin.com/in/hemant-patil-2b4bb1312</span>
              </a>
              <a
                href="https://github.com/GitHemant-coder"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-white/12 px-[18px] py-[13px] rounded-xl text-[13.5px] font-semibold transition-all duration-200 ease-in-out hover:bg-white/22 hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white shrink-0 shadow-sm">
                  <Github size={18} strokeWidth={2.5} className="text-[#181717]" />
                </span>
                <span>github.com/GitHemant-coder</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-col justify-center">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-3">
              <input
                type="text"
                name="user_name"
                placeholder="Your name"
                required
                className="bg-white/95 border-2 border-transparent focus:border-terracotta rounded-xl px-4 py-[13px] font-sans text-[13.5px] outline-none text-ink placeholder-ink-soft/75 focus:ring-0 transition-all duration-200"
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your email"
                required
                className="bg-white/95 border-2 border-transparent focus:border-terracotta rounded-xl px-4 py-[13px] font-sans text-[13.5px] outline-none text-ink placeholder-ink-soft/75 focus:ring-0 transition-all duration-200"
              />
              <textarea
                name="message"
                placeholder="Tell me about the opportunity..."
                required
                className="bg-white/95 border-2 border-transparent focus:border-terracotta rounded-xl px-4 py-[13px] font-sans text-[13.5px] outline-none text-ink placeholder-ink-soft/75 focus:ring-0 transition-all duration-200 resize-y min-h-[90px]"
              ></textarea>
              <button
                type="submit"
                disabled={isSending}
                className="bg-ink text-white border-none rounded-xl p-3.5 text-sm font-bold cursor-pointer transition-all duration-200 hover:opacity-90 disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Send Message →'}
              </button>
            </form>

            {statusMessage && (
              <div
                className={`mt-4 p-4 rounded-xl text-sm font-semibold border ${statusType === 'success'
                  ? 'bg-cream text-ink border-line'
                  : 'bg-red-500 text-white border-red-600'
                  }`}
              >
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
