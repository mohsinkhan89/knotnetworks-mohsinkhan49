/**
 * RTDS (Real Time Data Services) Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // -------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });
  }

  // -------------------------------------------------------------------
  // 2. Interactive Accordion & Dynamic Logo Switcher (Changing Section)
  // -------------------------------------------------------------------
  const accordionCards = document.querySelectorAll('.accordion-card');
  const changingLogoImg = document.getElementById('changingLogoImg');

  function updateOfferingImage(imgPath) {
    if (!changingLogoImg || !imgPath) return;

    changingLogoImg.classList.add('changing');

    setTimeout(() => {
      changingLogoImg.src = imgPath;
      changingLogoImg.classList.remove('changing');
    }, 150);
  }

  accordionCards.forEach(card => {
    const header = card.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = card.classList.contains('active');

        // Close all accordions
        accordionCards.forEach(c => c.classList.remove('active'));

        // Toggle clicked one
        if (!isActive) {
          card.classList.add('active');
          const imgPath = card.getAttribute('data-img');
          if (imgPath) {
            updateOfferingImage(imgPath);
          }
        }
      });
    }
  });

  // -------------------------------------------------------------------
  // 3. Count-Up Stats Counter Animation
  // -------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.metric-number');
  let animated = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }
    }, stepTime);
  }

  // IntersectionObserver for Stats Section
  const statsSection = document.querySelector('.metrics-section');
  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(el => countUp(el));
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // -------------------------------------------------------------------
  // 4. Scroll Reveal Animations (Fade In Up)
  // -------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // -------------------------------------------------------------------
  // 5. Header Sticky Shadow Effects
  // -------------------------------------------------------------------
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  console.log('RTDS Template Script Initialized Successfully.');
});
