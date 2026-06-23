/* ============================================
   ANIMATION.JS - Intersection Observer reveals,
   typing effect, animated counters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initTypingEffect();
  initCounters();
  initSkillBars();
});

/* ---------- Scroll Reveal via IntersectionObserver ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(t => io.observe(t));
}

/* ---------- Typing Effect ---------- */
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = JSON.parse(el.dataset.words || '["Software","Web Apps","APIs"]');
  let wIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        deleting = true;
        return setTimeout(tick, 1800);
      }
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 50 : 90);
  }
  tick();
}

/* ---------- Animated Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = (el.dataset.count.split('.')[1] || '').length;
  const duration = 1800;
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  let start = null;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
    const value = target * eased;
    el.textContent = prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- Skill Progress Bars ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.dataset.fill || '80';
        setTimeout(() => fill.style.width = pct + '%', 100);
        io.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => io.observe(b));
}
