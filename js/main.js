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
});
