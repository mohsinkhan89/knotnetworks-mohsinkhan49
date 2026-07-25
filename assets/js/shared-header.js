(() => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = page => currentPage === page ? ' active' : '';

  const headerMarkup = `
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="announcement-left">
          <span class="badge-new">NEW</span>
          <span class="announcement-text">Reliable business communication backed by 24/7 support</span>
        </div>
        <div class="top-bar-contact">
          <a href="mailto:help@knotnetworks.com" class="contact-link">
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>
            Help@KnotNetworks.com
          </a>
          <a href="tel:+18335748844" class="contact-link">
            <i class="fa-solid fa-phone" aria-hidden="true"></i>
            +1-8335748844
          </a>
        </div>
      </div>
    </div>
    <header class="main-header">
      <div class="container navbar">
        <a href="index.html" class="brand-logo" aria-label="Knot Networks home">
          <img src="assets/img/logo.webp" alt="Knot Networks Logo" width="180">
        </a>
        <nav class="nav-menu" id="navMenu" aria-label="Primary navigation">
          <div class="nav-item has-dropdown">
            <button class="nav-link dropdown-trigger${isActive('about-us.html')}" type="button" aria-expanded="false">
              Company
              <svg class="chevron-icon" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>
            </button>
            <div class="nav-dropdown">
              <a href="about-us.html"><i class="fa-regular fa-building"></i><span><b>About Knot Networks</b><small>Our story, purpose and team</small></span></a>
              <a href="about-us.html#leadership"><i class="fa-solid fa-users"></i><span><b>Leadership</b><small>Meet the people who guide us</small></span></a>
              <a href="contact-us.html"><i class="fa-solid fa-headset"></i><span><b>24/7 Support</b><small>Professional help when you need it</small></span></a>
            </div>
          </div>
          <div class="nav-item has-dropdown">
            <button class="nav-link dropdown-trigger" type="button" aria-expanded="false">
              Solutions
              <svg class="chevron-icon" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>
            </button>
            <div class="nav-dropdown">
              <a href="index.html#solutions"><i class="fa-solid fa-phone-volume"></i><span><b>Toll-Free Numbers</b><small>Make it easy for customers to reach you</small></span></a>
              <a href="index.html#solutions"><i class="fa-solid fa-globe"></i><span><b>International Toll-Free</b><small>Build a presence across markets</small></span></a>
              <a href="index.html#solutions"><i class="fa-solid fa-headset"></i><span><b>VoIP Telephony</b><small>Flexible cloud calling for your team</small></span></a>
            </div>
          </div>
          <div class="nav-item has-dropdown">
            <button class="nav-link dropdown-trigger" type="button" aria-expanded="false">
              Services
              <svg class="chevron-icon" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>
            </button>
            <div class="nav-dropdown">
              <a href="index.html#solutions"><i class="fa-solid fa-gears"></i><span><b>PBX Features</b><small>IVR, forwarding, recording and more</small></span></a>
              <a href="index.html#solutions"><i class="fa-solid fa-microphone-lines"></i><span><b>Call Recording</b><small>Keep records of important conversations</small></span></a>
              <a href="index.html#solutions"><i class="fa-solid fa-share-nodes"></i><span><b>Call Forwarding</b><small>Keep your business reachable anywhere</small></span></a>
            </div>
          </div>
          <div class="nav-item has-dropdown">
            <button class="nav-link dropdown-trigger${isActive('faq.html')}" type="button" aria-expanded="false">
              Resources
              <svg class="chevron-icon" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>
            </button>
            <div class="nav-dropdown">
              <a href="index.html#resources"><i class="fa-regular fa-newspaper"></i><span><b>Communication Insights</b><small>Practical guidance for business calling</small></span></a>
              <a href="faq.html"><i class="fa-regular fa-circle-question"></i><span><b>FAQs</b><small>Fast answers to common questions</small></span></a>
              <a href="contact-us.html"><i class="fa-regular fa-comments"></i><span><b>Contact Support</b><small>Talk with our communication experts</small></span></a>
            </div>
          </div>
          <a href="index.html#solutions" class="nav-link">Features</a>
          <a href="contact-us.html" class="nav-link${isActive('contact-us.html')}">Contact Us</a>
        </nav>
        <div class="nav-actions">
          <a href="contact-us.html#message" class="btn-primary">
            Write to Us
            <svg class="btn-arrow" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
          </a>
        </div>
        <button class="mobile-toggle" id="mobileToggle" type="button" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>`;

  const topBar = document.querySelector('.top-bar');
  const mainHeader = document.querySelector('.main-header');
  if (!topBar || !mainHeader) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = headerMarkup;
  const newTopBar = wrapper.firstElementChild;
  const newHeader = wrapper.lastElementChild;
  topBar.replaceWith(newTopBar);
  mainHeader.replaceWith(newHeader);
})();
