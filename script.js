// Kaká Legacy - Interacciones y animaciones

// AOS init
window.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-quart'
    });
  }
});

// Header: estado sticky/elevación y navegación móvil
(function () {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const body = document.body;

  const onScroll = () => {
    const scrolled = window.scrollY > 10;
    header.style.boxShadow = scrolled ? '0 10px 30px rgba(0,0,0,.35)' : 'none';
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  navToggle?.addEventListener('click', () => {
    body.classList.toggle('nav-open');
  });

  // Cerrar menú al navegar
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => body.classList.remove('nav-open'));
  });
})();

// Carousel sencillo
(function () {
  const track = document.querySelector('.carousel-track');
  const prev = document.querySelector('.carousel .prev');
  const next = document.querySelector('.carousel .next');

  const scrollAmount = () => track.clientWidth * 0.9;

  prev?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  next?.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
})();

// Lightbox
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox-image');
  const closeBtn = lightbox?.querySelector('.lightbox-close');

  document.querySelectorAll('.carousel-item').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const close = () => {
    lightbox?.classList.remove('open');
    lightbox?.setAttribute('aria-hidden', 'true');
  };

  closeBtn?.addEventListener('click', close);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

// Validación mínima de formulario
(function () {
  const form = document.getElementById('contactForm');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const success = document.getElementById('formSuccess');

  const showError = (input, state) => {
    const field = input.closest('.form-field');
    const err = field.querySelector('.error');
    if (!state) {
      err.style.display = 'block';
      input.style.borderColor = '#ff8c8c';
    } else {
      err.style.display = 'none';
      input.style.borderColor = '';
    }
  };

  const validateEmail = (v) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!name.value.trim()) { showError(name, false); valid = false; } else showError(name, true);
    if (!validateEmail(email.value)) { showError(email, false); valid = false; } else showError(email, true);
    if (!message.value.trim()) { showError(message, false); valid = false; } else showError(message, true);

    if (valid) {
      success.textContent = '¡Gracias! Tu mensaje ha sido enviado (simulado).';
      form.reset();
      setTimeout(() => success.textContent = '', 5000);
    }
  });
})();

// Fade-in al cargar
(function () {
  document.documentElement.style.setProperty('scrollBehavior', 'auto');
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 700ms ease';
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = 1;
      setTimeout(() => document.documentElement.style.removeProperty('scrollBehavior'), 800);
    });
  });
})();
