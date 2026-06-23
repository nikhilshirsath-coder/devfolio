/* ============================================
   SLIDER.JS - Testimonials carousel
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
});

function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const dotsWrap = document.getElementById('slider-dots');
  const prev = document.getElementById('slider-prev');
  const next = document.getElementById('slider-next');

  let current = 0;
  let timer;

  // Build dots
  if (dotsWrap) {
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(i) {
    current = (i + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.slider-dot').forEach((d, idx) => {
        d.classList.toggle('active', idx === current);
      });
    }
    resetAutoplay();
  }

  function resetAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));

  resetAutoplay();

  // Pause on hover
  const slider = track.closest('.testimonial-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', resetAutoplay);
  }

  // Touch swipe
  let startX = 0, deltaX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchmove', e => { deltaX = e.touches[0].clientX - startX; }, { passive: true });
  track.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 50) {
      deltaX < 0 ? goTo(current + 1) : goTo(current - 1);
    }
    deltaX = 0;
  });
}
