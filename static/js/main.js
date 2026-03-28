/* ═══════════════════════════════════════
   main.js — Hemant Patil Portfolio
════════════════════════════════════════ */

// ──────────────────────────────────────
// AOS INIT
// ──────────────────────────────────────
AOS.init({ duration: 720, easing: 'ease-out-cubic', once: true, offset: 70 });

// ──────────────────────────────────────
// NAVBAR SCROLL BEHAVIOUR
// ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ──────────────────────────────────────
// DARK / LIGHT THEME
// ──────────────────────────────────────
const htmlEl    = document.getElementById('html-root');
const themeBtn  = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(t) {
  if (t === 'dark') { htmlEl.classList.add('dark'); htmlEl.classList.remove('light'); }
  else              { htmlEl.classList.remove('dark'); htmlEl.classList.add('light'); }
  localStorage.setItem('theme', t);
}
themeBtn.addEventListener('click', () => {
  applyTheme(htmlEl.classList.contains('dark') ? 'light' : 'dark');
});

// ──────────────────────────────────────
// MOBILE MENU
// ──────────────────────────────────────
const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
function closeMobileMenu() { mobileMenu.classList.add('hidden'); }

// ──────────────────────────────────────
// TYPING ANIMATION
// ──────────────────────────────────────
const typedEl  = document.getElementById('typed-text');
const phrases  = [
  'Python Developer',
  'Automation Engineer',
  'AI/ML Enthusiast',
  'Full-Stack Developer',
  'Problem Solver'
];
let pIdx = 0, cIdx = 0, deleting = false;

(function typeLoop() {
  const cur = phrases[pIdx];
  typedEl.textContent = deleting ? cur.slice(0, cIdx--) : cur.slice(0, cIdx++);

  let delay = deleting ? 48 : 88;
  if (!deleting && cIdx > cur.length)   { delay = 2000; deleting = true; }
  else if (deleting && cIdx < 0)        { deleting = false; pIdx = (pIdx + 1) % phrases.length; cIdx = 0; delay = 400; }

  setTimeout(typeLoop, delay);
})();

// ──────────────────────────────────────
// ANIMATED COUNTERS
// ──────────────────────────────────────
function startCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current  = 0;
    const step   = Math.max(1, Math.ceil(target / 60));
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + '+';
      if (current >= target) clearInterval(timer);
    }, 28);
  });
}
const heroObs = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { startCounters(); heroObs.disconnect(); }
}, { threshold: 0.25 });
const heroEl = document.getElementById('hero');
if (heroEl) heroObs.observe(heroEl);

// ──────────────────────────────────────
// SKILL BAR ANIMATION  (uses --tw CSS var)
// ──────────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-bars');
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(card => barObs.observe(card));

// ──────────────────────────────────────
// CONTACT FORM → FLASK /contact
// ──────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const btn     = document.getElementById('contact-submit');
  const result  = document.getElementById('contact-result');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending…';

  try {
    const res  = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    const data = await res.json();

    result.className = 'text-sm font-medium text-center py-2.5 px-4 rounded-xl';
    if (data.success) {
      result.classList.add('bg-green-500/20', 'text-green-400', 'border', 'border-green-500/30');
      result.innerHTML = '<i class="fas fa-check-circle mr-1.5"></i>' + data.message;
      e.target.reset();
    } else {
      result.classList.add('bg-red-500/20', 'text-red-400', 'border', 'border-red-500/30');
      result.textContent = data.error || 'Something went wrong. Please try again.';
    }
  } catch {
    result.className = 'text-sm font-medium text-center py-2.5 px-4 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30';
    result.textContent = 'Network error. Please email patilhemant1103@gmail.com directly.';
  }

  result.classList.remove('hidden');
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
  setTimeout(() => result.classList.add('hidden'), 6000);
});

// ──────────────────────────────────────
// MORE PROJECTS MODAL
// ──────────────────────────────────────
function openMoreProjects() {
  document.getElementById('modal-projects').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeMoreProjects(event) {
  const modal = document.getElementById('modal-projects');
  if (!event || event.target === modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMoreProjects(); });

// ──────────────────────────────────────
// AI CHATBOT
// ──────────────────────────────────────
let chatOpen = false;
function toggleChatbot() {
  chatOpen = !chatOpen;
  const widget = document.getElementById('chatbot-widget');
  const icon   = document.getElementById('chatbot-toggle-icon');
  widget.classList.toggle('hidden', !chatOpen);
  icon.className = chatOpen ? 'fas fa-times text-white text-xl' : 'fas fa-robot text-white text-xl';
  if (chatOpen) document.getElementById('chatbot-input').focus();
}

async function sendChat() {
  const input  = document.getElementById('chatbot-input');
  const msgBox = document.getElementById('chatbot-messages');
  const text   = input.value.trim();
  if (!text) return;
  input.value = '';

  appendBubble(msgBox, 'user', safeText(text));
  const typing = appendBubble(msgBox, 'bot', '<i class="fas fa-circle-notch fa-spin mr-1"></i>typing…');
  msgBox.scrollTop = msgBox.scrollHeight;

  try {
    const res  = await fetch('/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    typing.innerHTML = '<p>' + safeText(data.reply) + '</p>';
  } catch {
    typing.innerHTML = '<p class="text-red-400">Offline – email <a href="mailto:patilhemant1103@gmail.com" class="underline">patilhemant1103@gmail.com</a></p>';
  }
  msgBox.scrollTop = msgBox.scrollHeight;
}

function appendBubble(container, type, html) {
  const div = document.createElement('div');
  div.className = type === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user';
  div.innerHTML = '<p>' + html + '</p>';
  container.appendChild(div);
  return div;
}

function safeText(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])
  );
}

document.getElementById('chatbot-input')?.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendChat();
});

// ──────────────────────────────────────
// ACTIVE NAV HIGHLIGHT
// ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + current;
    link.style.color = active ? '#00f5ff' : '';
  });
}, { passive: true });

// ──────────────────────────────────────
// PARALLAX ORB ON MOUSEMOVE
// ──────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('#hero .orb-float').forEach((orb, i) => {
    const speed = 0.007 * (i + 1);
    const x = (e.clientX - window.innerWidth  / 2) * speed;
    const y = (e.clientY - window.innerHeight / 2) * speed;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
}, { passive: true });
