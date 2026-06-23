/* ============================================
   PORTFOLIO.JS - Filter, Search, Lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  initPortfolioSearch();
  initLightbox();
});

/* ---------- Filter ---------- */
function initPortfolioFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.category || '';
        const match = filter === 'all' || cat.includes(filter);
        card.style.display = match ? '' : 'none';
        if (match) {
          card.style.animation = 'bounceIn 0.5s ease backwards';
        }
      });
    });
  });
}

/* ---------- Search ---------- */
function initPortfolioSearch() {
  const input = document.getElementById('portfolio-search');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!input || !cards.length) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let found = 0;
    cards.forEach(card => {
      const text = (card.textContent + ' ' + (card.dataset.category || '')).toLowerCase();
      const match = !q || text.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) found++;
    });
    const empty = document.getElementById('search-empty');
    if (empty) empty.style.display = found === 0 ? 'block' : 'none';
  });
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const triggers = document.querySelectorAll('[data-lightbox]');
  if (!triggers.length) return;

  // Create lightbox once
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <button class="lb-close" aria-label="Close">&times;</button>
      <img class="lb-img" alt="" />
      <div class="lb-caption"></div>
    `;
    document.body.appendChild(lb);
    const style = document.createElement('style');
    style.textContent = `
      #lightbox {
        position: fixed; inset: 0;
        background: rgba(5, 6, 15, 0.92);
        backdrop-filter: blur(20px);
        display: none;
        align-items: center; justify-content: center;
        z-index: 9998;
        padding: 2rem;
        animation: fadeIn 0.3s ease;
      }
      #lightbox.active { display: flex; }
      #lightbox .lb-img {
        max-width: 90vw; max-height: 80vh;
        border-radius: 16px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      }
      #lightbox .lb-close {
        position: absolute; top: 24px; right: 24px;
        width: 44px; height: 44px; border-radius: 50%;
        background: rgba(255,255,255,0.1);
        color: white; font-size: 28px;
        border: 1px solid rgba(255,255,255,0.2);
        cursor: pointer;
        backdrop-filter: blur(12px);
      }
      #lightbox .lb-close:hover { background: rgba(255,255,255,0.2); }
      #lightbox .lb-caption {
        position: absolute; bottom: 24px; left: 50%;
        transform: translateX(-50%);
        color: white; font-size: 0.9rem;
        background: rgba(0,0,0,0.5); padding: 0.5rem 1rem;
        border-radius: 999px;
      }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  const img = lb.querySelector('.lb-img');
  const cap = lb.querySelector('.lb-caption');
  const close = lb.querySelector('.lb-close');

  triggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      const src = t.dataset.lightbox || t.getAttribute('href') || t.querySelector('img')?.src;
      const caption = t.dataset.caption || '';
      if (!src) return;
      img.src = src;
      cap.textContent = caption;
      lb.classList.add('active');
    });
  });

  close.addEventListener('click', () => lb.classList.remove('active'));
  lb.addEventListener('click', e => {
    if (e.target === lb) lb.classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lb.classList.remove('active');
  });
}
