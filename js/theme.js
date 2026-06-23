/* ============================================
   THEME.JS - Dark / Light mode with localStorage
   ============================================ */

(function () {
  const STORAGE_KEY = 'devfolio_theme';
  // Apply theme immediately to prevent FOUC
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(STORAGE_KEY, 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(STORAGE_KEY, 'light');
      }
    });
  });
})();
