/* ═══════════════════════════════════════
   main.js — Premium Portfolio Theme (Stripe/Linear Feel)
════════════════════════════════════════ */

// ──────────────────────────────────────
// AOS INIT & VANILLA TILT
// ──────────────────────────────────────
AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Vanilla Tilt for 3D interactions
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      perspective: 1000,
      scale: 1.02
    });
  }
});

// ──────────────────────────────────────
// SCROLL PROGRESS BAR
// ──────────────────────────────────────
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (scrollProgress) {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollVal = Math.round((scrollPos * 100) / calcHeight);
    scrollProgress.style.width = scrollVal + '%';
  }
}, { passive: true });

// ──────────────────────────────────────
// CURSOR GLOW & TRAILING EFFECT
// ──────────────────────────────────────
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Parallax for Hero Orbs
  document.querySelectorAll('#hero .orb-float').forEach((orb, i) => {
    const speed = 0.015 * (i + 1);
    const x = (e.clientX - window.innerWidth / 2) * speed;
    const y = (e.clientY - window.innerHeight / 2) * speed;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
}, { passive: true });

(function animateGlow() {
  // Smooth LERP movement for the glow
  glowX += (mouseX - glowX) * 0.08; 
  glowY += (mouseY - glowY) * 0.08;
  
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    cursorGlow.style.opacity = '1';
  }
  requestAnimationFrame(animateGlow);
})();

// ──────────────────────────────────────
// RIPPLE EFFECT (Premium Feedback)
// ──────────────────────────────────────
document.addEventListener('mousedown', (e) => {
  const target = e.target.closest('.btn-primary, .btn-secondary, .contact-card, .project-card, .skill-card, .cert-card');
  if (target) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }
});

// ──────────────────────────────────────
// CARD GLOW TRACKING (Premium Depth)
// ──────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});

// ──────────────────────────────────────
// NAVBAR SCROLL BEHAVIOUR
// ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ──────────────────────────────────────
// DARK / LIGHT THEME
// ──────────────────────────────────────
const htmlEl    = document.documentElement;
const themeBtn  = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(t) {
  if (t === 'dark') { htmlEl.classList.add('dark'); htmlEl.classList.remove('light'); }
  else              { htmlEl.classList.remove('dark'); htmlEl.classList.add('light'); }
  localStorage.setItem('theme', t);
}
if(themeBtn) {
  themeBtn.addEventListener('click', () => {
    applyTheme(htmlEl.classList.contains('dark') ? 'light' : 'dark');
  });
}

// ──────────────────────────────────────
// MOBILE MENU
// ──────────────────────────────────────
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if(mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}
window.closeMobileMenu = function() { if(mobileMenu) mobileMenu.classList.add('hidden'); }

// ──────────────────────────────────────
// TYPING ANIMATION (Wait for DOM)
// ──────────────────────────────────────
const typedEl  = document.getElementById('typed-text');
const phrases  = [
  'Python Developer',
  'Automation Engineer',
  'AI/ML Enthusiast',
  'Problem Solver'
];
let pIdx = 0, cIdx = 0, deleting = false;

if (typedEl) {
  (function typeLoop() {
    const cur = phrases[pIdx];
    typedEl.textContent = deleting ? cur.slice(0, cIdx--) : cur.slice(0, cIdx++);

    let delay = deleting ? 40 : 100;
    if (!deleting && cIdx > cur.length)   { delay = 2500; deleting = true; }
    else if (deleting && cIdx < 0)        { deleting = false; pIdx = (pIdx + 1) % phrases.length; cIdx = 0; delay = 600; }

    setTimeout(typeLoop, delay);
  })();
}

// ──────────────────────────────────────
// ANIMATED COUNTERS
// ──────────────────────────────────────
function startCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current  = 0;
    const step   = Math.max(1, Math.ceil(target / 40));
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + '+';
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}
const heroEl = document.getElementById('hero');
if (heroEl) {
  const heroObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { startCounters(); heroObs.disconnect(); }
  }, { threshold: 0.25 });
  heroObs.observe(heroEl);
}

// ──────────────────────────────────────
// SKILL BAR ANIMATION
// ──────────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-bars');
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.skill-card').forEach(card => barObs.observe(card));

// ──────────────────────────────────────
// CONTACT FORM
// ──────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const btn     = document.getElementById('contact-submit');
    const result  = document.getElementById('contact-result');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i>Processing...';

    try {
      const res  = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();

      result.className = 'text-sm font-medium text-center py-3 px-5 rounded-2xl mb-4 shadow animate-success';
      if (data.success) {
        result.classList.add('bg-green-500/10', 'text-green-400', 'border', 'border-green-500/20');
        result.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + data.message;
        e.target.reset();
      } else {
        result.classList.add('bg-red-500/10', 'text-red-400', 'border', 'border-red-500/20');
        result.textContent = data.error || 'Something went wrong. Please try again.';
      }
    } catch {
      result.className = 'text-sm font-medium text-center py-3 px-5 rounded-2xl mb-4 shadow bg-red-500/10 text-red-400 border border-red-500/20';
      result.textContent = 'Network error. Please try again later.';
    }

    result.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
    setTimeout(() => result.classList.add('hidden'), 5000);
  });
}

// ──────────────────────────────────────
// MORE PROJECTS MODAL
// ──────────────────────────────────────
window.openMoreProjects = function() {
  document.getElementById('modal-projects').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
window.closeMoreProjects = function(event) {
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
window.toggleChatbot = function() {
  chatOpen = !chatOpen;
  const widget = document.getElementById('chatbot-widget');
  const icon   = document.getElementById('chatbot-toggle-icon');
  if(!widget) return;
  
  if(chatOpen) {
    widget.classList.remove('hidden');
    widget.classList.add('animate-[fadeIn_0.3s_ease]');
    icon.className = 'fas fa-chevron-down text-white text-xl';
    document.getElementById('chatbot-input').focus();
  } else {
    widget.classList.add('hidden');
    icon.className = 'fas fa-robot text-white text-xl';
  }
}

window.sendChat = async function() {
  const input  = document.getElementById('chatbot-input');
  const msgBox = document.getElementById('chatbot-messages');
  const text   = input.value.trim();
  if (!text) return;
  input.value = '';

  appendBubble(msgBox, 'user', safeText(text));
  const typing = appendBubble(msgBox, 'bot', '<i class="fas fa-circle-notch fa-spin mr-1"></i>thinking...');
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
    typing.innerHTML = '<p class="text-red-400">Offline mode. Connectivity error.</p>';
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

const chatInput = document.getElementById('chatbot-input');
if(chatInput) {
  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendChat();
  });
}

// ──────────────────────────────────────
// ACTIVE NAV HIGHLIGHT (Smooth transition)
// ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('text-white', 'dark:text-white');
      link.style.opacity = '1';
    } else {
      link.classList.remove('text-white', 'dark:text-white');
      link.style.opacity = '';
    }
  });
}, { passive: true });
