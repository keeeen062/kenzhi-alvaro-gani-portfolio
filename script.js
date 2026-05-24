const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('nav-open');
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
