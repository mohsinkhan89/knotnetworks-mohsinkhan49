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

  const dropdownItems = document.querySelectorAll('.has-dropdown');
  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !item.classList.contains('open');
      dropdownItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
      if (!willOpen) trigger.blur();
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.has-dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
        item.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
        item.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

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
    const duration = 1600;
    const startTime = performance.now();

    el.textContent = `0${suffix}`;
    el.classList.add('is-counting');

    function updateCounter(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easedProgress);
      el.textContent = `${current.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = `${target.toLocaleString()}${suffix}`;
        el.classList.remove('is-counting');
        el.classList.add('is-complete');
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // IntersectionObserver for Stats Section
  const statsSection = document.querySelector('.metrics-section');
  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, statsObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((el, index) => {
            window.setTimeout(() => countUp(el), index * 80);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  // -------------------------------------------------------------------
  // 4. Scroll Reveal Animations (Fade In Up)
  // -------------------------------------------------------------------
  const leftRevealSelectors = [
    '.accordion-list', '.flex-row-block:not(.reverse) .visual-frame',
    '.flex-row-block.reverse .block-text', '.testimonial-portrait',
    '.career-dark-card', '.happening-news'
  ];
  const rightRevealSelectors = [
    '.offerings-visual-wrapper', '.flex-row-block:not(.reverse) .block-text',
    '.flex-row-block.reverse .visual-frame', '.quote-card',
    '.career-content', '.happening-feature'
  ];
  const centerRevealSelectors = [
    '.offerings-section .section-header-center', '.awards-section .section-header-center',
    '.customers-heading', '.partners-heading'
  ];
  const staggerSelectors = [
    '.metrics-grid', '.awards-cards-grid', '.award-recognition-stack',
    '.customers-grid', '.partners-track'
  ];

  leftRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal', 'reveal-left'));
  });
  rightRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal', 'reveal-right'));
  });
  centerRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal'));
  });
  staggerSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal', 'motion-stagger'));
  });

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

  // -------------------------------------------------------------------
  // 6. Our Partners Paginated Slider
  // -------------------------------------------------------------------
  const partnersSlider = document.querySelector('[data-partners-slider]');
  if (partnersSlider) {
    const partnersTrack = partnersSlider.querySelector('.partners-track');
    const partnerItems = partnersTrack.querySelectorAll('.partner-logo');
    const pagination = document.querySelector('.partners-pagination');
    let partnerDots = [];
    let partnerPage = 0;
    let partnerPageCount = 1;
    let partnersPerPage = 4;

    const showPartnerPage = (index) => {
      partnerPage = Math.min(index, partnerPageCount - 1);
      partnersTrack.style.transform = `translateX(-${partnerPage * partnersSlider.clientWidth}px)`;
      partnerDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === partnerPage;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    };

    const buildPartnerPagination = () => {
      partnersPerPage = window.innerWidth <= 680 ? 1 : window.innerWidth <= 1024 ? 3 : 4;
      partnerPageCount = Math.ceil(partnerItems.length / partnersPerPage);
      pagination.innerHTML = '';

      for (let index = 0; index < partnerPageCount; index += 1) {
        const dot = document.createElement('button');
        dot.className = 'partner-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show partner slide ${index + 1}`);
        dot.addEventListener('click', () => {
          showPartnerPage(index);
        });
        pagination.appendChild(dot);
      }

      partnerDots = Array.from(pagination.querySelectorAll('.partner-dot'));
      showPartnerPage(0);
    };

    window.addEventListener('resize', buildPartnerPagination);
    buildPartnerPagination();
  }

  // -------------------------------------------------------------------
  // 7. Meet Our Customers Two-Way Infinite Marquee
  // -------------------------------------------------------------------
  const customersGrid = document.querySelector('[data-customers-grid]');
  if (customersGrid) {
    const customerLogos = [
      ['fortis.png', 'Fortis'], ['tata-1mg.png', 'Tata 1mg'], ['practo.png', 'Practo'],
      ['red-chief.png', 'Red Chief'], ['godrej.png', 'Godrej'], ['casio.png', 'Casio'],
      ['sap.png', 'SAP'], ['cipla.png', 'Cipla'], ['ola.png', 'OLA'],
      ['01_Dr_Lal_PathLabs.png', 'Dr Lal PathLabs'], ['02_BCG.png', 'BCG'], ['03_CARS24.png', 'CARS24'],
      ['04_Eagle_Disposal.png', 'Eagle Disposal'], ['05_Henson_and_Company_CPAs.png', 'Henson and Company'],
      ['06_McDougald_and_McEachern_LLP.png', 'McDougald and McEachern'],
      ['07_Blueisle_Bookkeeping.png', 'Blueisle Bookkeeping'], ['08_ReverseLogix.png', 'ReverseLogix'],
      ['09_MoneyHoney.png', 'MoneyHoney'], ['10_Feather_Sleep.png', 'Feather Sleep'],
      ['11_Jamieson_and_Company_CPAs.png', 'Jamieson and Company'],
      ['12_Leah_Harvey_Associates.png', 'Leah Harvey Associates'], ['13_Drive_Construction.png', 'Drive Construction'],
      ['14_A_and_V_Water_Utilities.png', 'A and V Water Utilities'], ['15_Splashgain.png', 'Splashgain'],
      ['16_Staffwiz.png', 'Staffwiz'], ['17_Southwest_Adjusters.png', 'Southwest Adjusters'],
      ['18_SRA.png', 'SRA']
    ];
    const createCards = (logos, duplicate = false) => logos.map(([file, name]) =>
      `<div class="customer-logo-card"><img src="assets/img/our-meet/${file}" alt="${duplicate ? '' : name}"></div>`
    ).join('');

    const createMarqueeRow = (logos, directionClass) => `
      <div class="customer-marquee-row ${directionClass}">
        <div class="customer-marquee-track">
          <div class="customer-marquee-group">${createCards(logos)}</div>
          <div class="customer-marquee-group" aria-hidden="true">${createCards(logos, true)}</div>
        </div>
      </div>`;

    const splitAt = Math.ceil(customerLogos.length / 2);
    customersGrid.innerHTML =
      createMarqueeRow(customerLogos.slice(0, splitAt), 'scroll-left') +
      createMarqueeRow(customerLogos.slice(splitAt), 'scroll-right');
  }

  console.log('RTDS Template Script Initialized Successfully.');
});
