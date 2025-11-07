
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('hidden'));
  }

  // Typed headline
  if (window.Typed) {
    new Typed('#typed', {
      strings: ['Data Scientist', 'ML Engineer', 'Generative AI Enthusiast'],
      typeSpeed: 45,
      backSpeed: 30,
      backDelay: 1400,
      smartBackspace: true,
      loop: true
    });
  }

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
