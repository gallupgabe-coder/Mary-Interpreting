(() => {
  'use strict';

  // ===========================
  // Header scroll behavior
  // ===========================
  const header = document.getElementById('site-header');
  const hero = document.getElementById('hero');

  function updateHeader() {
    if (window.scrollY > hero.offsetHeight - 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ===========================
  // Mobile nav toggle
  // ===========================
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const navLinks = primaryNav.querySelectorAll('a');

  function openNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    primaryNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close nav when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (
      primaryNav.classList.contains('open') &&
      !primaryNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
      closeNav();
      navToggle.focus();
    }
  });

  // ===========================
  // Active nav link highlighting
  // ===========================
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72}px 0px -50% 0px`,
      threshold: 0
    }
  );

  sections.forEach(section => navObserver.observe(section));

  // ===========================
  // Scroll-triggered animations
  // ===========================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Add fade-in class to animatable elements
    const animatableSelectors = [
      '.section-heading',
      '.mission-quote',
      '.photo-wrapper',
      '.card',
      '.skills-tags',
      '.timeline-entry',
      '.rate-card',
      '.video-slot',
      '.contact-wrapper'
    ];

    const animatables = document.querySelectorAll(animatableSelectors.join(','));
    animatables.forEach(el => el.classList.add('fade-in'));

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatables.forEach(el => fadeObserver.observe(el));
  }

  // ===========================
  // Contact form (basic client-side)
  // ===========================
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // For now, show a confirmation. Replace with actual form handling later.
      alert('Thank you for your message! Mary will get back to you soon.');
      form.reset();
    });
  }
})();
