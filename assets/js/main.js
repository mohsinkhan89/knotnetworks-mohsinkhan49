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
    let partnerTimer;

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
          startPartnerAutoplay();
        });
        pagination.appendChild(dot);
      }

      partnerDots = Array.from(pagination.querySelectorAll('.partner-dot'));
      showPartnerPage(0);
    };

    const startPartnerAutoplay = () => {
      clearInterval(partnerTimer);
      partnerTimer = setInterval(() => showPartnerPage((partnerPage + 1) % partnerPageCount), 4500);
    };

    partnersSlider.addEventListener('mouseenter', () => clearInterval(partnerTimer));
    partnersSlider.addEventListener('mouseleave', startPartnerAutoplay);
    window.addEventListener('resize', buildPartnerPagination);
    buildPartnerPagination();
    startPartnerAutoplay();
  }

  // -------------------------------------------------------------------
  // 7. Meet Our Customers Pagination
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
    const customerDots = document.querySelector('[data-customer-dots]');
    const pageSize = 12;
    const customerPageCount = Math.ceil(customerLogos.length / pageSize);
    let customerPage = 0;

    const renderCustomerPage = (page) => {
      customerPage = (page + customerPageCount) % customerPageCount;
      const logos = customerLogos.slice(customerPage * pageSize, (customerPage + 1) * pageSize);
      customersGrid.innerHTML = logos.map(([file, name]) =>
        `<div class="customer-logo-card"><img src="assets/img/our-meet/${file}" alt="${name}"></div>`
      ).join('');
      customerDots.querySelectorAll('.customer-page-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === customerPage);
        dot.setAttribute('aria-current', index === customerPage ? 'true' : 'false');
      });
    };

    for (let index = 0; index < customerPageCount; index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'customer-page-dot';
      dot.setAttribute('aria-label', `Show customer page ${index + 1}`);
      dot.addEventListener('click', () => renderCustomerPage(index));
      customerDots.appendChild(dot);
    }

    document.querySelector('[data-customer-prev]').addEventListener('click', () => renderCustomerPage(customerPage - 1));
    document.querySelector('[data-customer-next]').addEventListener('click', () => renderCustomerPage(customerPage + 1));
    renderCustomerPage(0);
  }

  console.log('RTDS Template Script Initialized Successfully.');
});
