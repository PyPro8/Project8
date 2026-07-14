/* ==========================================================================
   Project 8 — theme.js
   Handles light/dark theme toggling and persistence
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'project8-theme';
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.setAttribute('aria-pressed', theme === 'dark');
    });
  }

  // Apply immediately to avoid flash of wrong theme
  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  });
})();
