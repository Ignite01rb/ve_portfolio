/* ==========================================================================
   RAAGHAV BISHT — CINEMATIC VIDEO EDITOR PORTFOLIO JAVASCRIPT
   Interactive Stats Counters, Project Filters, Color Comparison Slider,
   Video Showreel Lightbox Modal, and Floating 3D Micro-Interactions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initProjectFilters();
  initColorSlider();
  initVideoModal();
  initHeroTilt();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = '#F7F6EE';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid #E2DFD2';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. ANIMATED METRICS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 2000; // ms
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   3. WORK PROJECT CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE COLOR GRADING SPLIT SLIDER
   -------------------------------------------------------------------------- */
function initColorSlider() {
  const slider = document.getElementById('grading-slider');
  if (!slider) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    slider.style.setProperty('--split-pos', `${percentage}%`);
  }

  // Mouse events
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events for mobile responsiveness
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* --------------------------------------------------------------------------
   5. CINEMATIC VIDEO LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const videoPlayer = document.getElementById('modal-video-player');
  const modalTitle = document.getElementById('modal-title');
  const modalClient = document.getElementById('modal-client');
  const modalDesc = document.getElementById('modal-desc');

  if (!modal || !videoPlayer) return;

  function openModal(videoSrc, title, client, desc) {
    if (videoSrc) {
      videoPlayer.src = videoSrc;
    }
    if (title) modalTitle.textContent = title;
    if (client) modalClient.textContent = client;
    if (desc) modalDesc.textContent = desc;

    modal.showModal();
    videoPlayer.play().catch(() => {}); // Play video if allowed
  }

  function closeModal() {
    videoPlayer.pause();
    modal.close();
  }

  // Attach click to all project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const videoSrc = card.getAttribute('data-video');
      const title = card.getAttribute('data-title');
      const client = card.getAttribute('data-client');
      const desc = card.querySelector('.card-desc')?.textContent || '';

      openModal(videoSrc, title, client, desc);
    });
  });

  // Attach to Hero Showreel button
  const heroBtn = document.getElementById('hero-showreel-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        'RAAGHAV BISHT — 2026 DIRECTOR SHOWREEL',
        'COMMERCIAL & NARRATIVE HIGHLIGHTS',
        'A high-octane 2-minute montage of recent commercials, music videos, and film post-production.'
      );
    });
  }

  // Close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Backdrop click
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. HERO 3D PARALLAX & TILT
   -------------------------------------------------------------------------- */
function initHeroTilt() {
  const heroRight = document.querySelector('.hero-right');
  const badges = document.querySelectorAll('.floating-badge');

  if (!heroRight || !badges.length) return;

  heroRight.addEventListener('mousemove', (e) => {
    const rect = heroRight.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    badges.forEach((badge, index) => {
      const depth = (index + 1) * 0.03;
      badge.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(${x * 0.01}deg)`;
    });
  });

  heroRight.addEventListener('mouseleave', () => {
    badges.forEach(badge => {
      badge.style.transform = '';
    });
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('project-form');
  const status = document.getElementById('form-status');

  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;

    status.className = 'form-status success';
    status.textContent = `Thank you, ${name}! Your inquiry has been received. Raaghav will get back to you within 24 hours.`;

    form.reset();
  });
}
