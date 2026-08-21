// Minimal interaction layer — no framework needed.

document.addEventListener('DOMContentLoaded', () => {
  // Reveal-on-scroll for cards and arc steps
  const revealTargets = document.querySelectorAll('.card, .arc-step, .diagram, .pullquote');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealTargets.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  initThemeToggle();
});

// ---------------------------------------------------------------------------
// Theme toggle — a hotspot in the bottom-right corner reveals a light/dark
// switch on hover (or a dimmed always-visible button on touch devices).
// The actual mode is applied instantly by an inline blocking script in
// <head> (see THEME_INIT_SNIPPET below) to avoid a flash of the wrong theme;
// this just wires up the interactive control.
// ---------------------------------------------------------------------------

const THEME_STORAGE_KEY = 'jmi-theme-mode';

const SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"></line><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"></line><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"></line></svg>';
const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.5A8.5 8.5 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5z"></path></svg>';

function initThemeToggle() {
  const isTouch = window.matchMedia('(hover: none)').matches;

  const hotspot = document.createElement('div');
  hotspot.className = 'theme-hotspot';
  if (!isTouch) hotspot.classList.add('hover-enabled');

  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.type = 'button';
  button.setAttribute('aria-label', 'Toggle light and dark theme');
  if (isTouch) button.classList.add('is-touch');

  const applyIcon = () => {
    const isLight = document.documentElement.getAttribute('data-mode') === 'light';
    // Show a moon (switch to dark) when currently light, sun (switch to light) when currently dark.
    button.innerHTML = isLight ? MOON_ICON : SUN_ICON;
  };

  applyIcon();

  button.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-mode') === 'light';
    const next = isLight ? 'dark' : 'light';
    if (next === 'light') {
      document.documentElement.setAttribute('data-mode', 'light');
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch (e) { /* ignore */ }
    applyIcon();
  });

  hotspot.appendChild(button);
  document.body.appendChild(hotspot);
}
