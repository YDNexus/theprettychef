/* ============================================
   Chef Essence Alina Ray — Scripts
   ============================================ */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('open');
  });
});

// --- Menu filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    menuCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- Scroll animations (fade-in) ---
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('.section-header, .about-grid, .menu-card, .testimonial-card, .service-card, .gallery-item, .gallery-video-item, .reel-card, .contact-grid, .big-quote-content').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// --- Stat counter animation ---
const statNumbers = document.querySelectorAll('.stat-number');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// --- Floating particles in hero ---
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(200, 149, 108, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(particle);
  }
}

// Add float keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    25% { transform: translate(${Math.random() * 40 - 20}px, -${Math.random() * 40 + 20}px) scale(1.2); opacity: 1; }
    50% { transform: translate(${Math.random() * 60 - 30}px, -${Math.random() * 60 + 30}px) scale(0.8); opacity: 0.3; }
    75% { transform: translate(${Math.random() * 30 - 15}px, -${Math.random() * 20 + 10}px) scale(1.1); opacity: 0.8; }
  }
`;
document.head.appendChild(style);

createParticles();

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Video play on click (for self-hosted videos) ---
document.querySelectorAll('.reel-video-wrapper, .gallery-video-wrapper').forEach(wrapper => {
  const video = wrapper.querySelector('video');
  if (!video) return;

  // Add play overlay
  const overlay = document.createElement('div');
  overlay.className = 'video-play-overlay';
  overlay.innerHTML = '<div class="reel-play-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>';
  wrapper.appendChild(overlay);

  wrapper.addEventListener('click', () => {
    if (video.paused) {
      // Pause all other videos first
      document.querySelectorAll('.reel-video-wrapper video, .gallery-video-wrapper video').forEach(v => {
        if (v !== video) {
          v.pause();
          v.parentElement.classList.remove('playing');
        }
      });
      video.play();
      wrapper.classList.add('playing');
    } else {
      video.pause();
      wrapper.classList.remove('playing');
    }
  });
});

// --- Contact form handler ---
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent!';
  btn.style.background = '#8a9a7b';

  setTimeout(() => {
    btn.textContent = 'Send Inquiry';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
