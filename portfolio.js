// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
      menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards for scroll animations
const elementsToObserve = document.querySelectorAll(
  '.about-card, .education-card, .experience-card, .hero-content'
);

elementsToObserve.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
  el.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// ============ PARALLAX EFFECT ============
const heroSection = document.querySelector('.hero');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSection.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  });
}

// ============ ACTIVE NAV LINK ============
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.style.color = 'var(--primary)';
    }
  });
});

// ============ HEADER BACKGROUND ON SCROLL ============
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      header.style.background = 'rgba(15, 23, 42, 0.95)';
      header.style.boxShadow = '0 2px 20px rgba(59, 130, 246, 0.1)';
    } else {
      header.style.background = 'rgba(15, 23, 42, 0.7)';
      header.style.boxShadow = 'none';
    }
  });
}

// ============ RIPPLE EFFECT ON BUTTONS ============
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ============ TYPING ANIMATION ============
const typewriter = (element, text, speed = 50) => {
  if (!element) return;
  
  element.textContent = '';
  let i = 0;
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Uncomment to enable typewriter effect on hero subtitle
// const subtitleElement = document.querySelector('.subtitle');
// if (subtitleElement) {
//   const originalText = subtitleElement.textContent;
//   subtitleElement.textContent = '';
//   typewriter(subtitleElement, originalText, 50);
// }

// ============ CURSOR GLOW EFFECT ============
document.addEventListener('mousemove', (e) => {
  // Optional: Add cursor glow effect if needed
});

// ============ PRELOAD ANIMATIONS ============
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ============ SMOOTH PAGE TRANSITIONS ============
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-out';
});

// ============ CONTACT FORM ANIMATION ============
const contactLinks = document.querySelectorAll('.btn-primary, a[href^="mailto"]');
contactLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// ============ SCROLL TO TOP BUTTON ============
const createScrollToTop = () => {
  const button = document.createElement('button');
  button.textContent = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 50;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  `;

  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = '1';
      button.style.visibility = 'visible';
    } else {
      button.style.opacity = '0';
      button.style.visibility = 'hidden';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

createScrollToTop();

// ============ PERFORMANCE OPTIMIZATION ============
// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

console.log('Portfolio JS loaded successfully ✓');
