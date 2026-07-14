/* ==========================================================================
   Project 8 — main.js
   Site-wide behaviors: mobile nav, back-to-top, toasts, tabs, accordions,
   testimonial carousel, star ratings, generic UI helpers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Dashboard sidebar (mobile) ---------- */
  const sidebarToggle = document.querySelector('.sidebar-toggle-mobile');
  const dashSidebar = document.querySelector('.dash-sidebar');
  const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

  function closeSidebar() {
    dashSidebar && dashSidebar.classList.remove('open');
    sidebarBackdrop && sidebarBackdrop.classList.remove('show');
  }

  if (sidebarToggle && dashSidebar) {
    sidebarToggle.addEventListener('click', () => {
      dashSidebar.classList.toggle('open');
      sidebarBackdrop && sidebarBackdrop.classList.toggle('show');
    });
  }
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  /* ---------- Navbar scroll shadow ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 8 ? 'var(--shadow-sm)' : 'none';
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 480);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Toast helper (exposed globally) ---------- */
  window.showToast = function (message, icon = 'fa-circle-check') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  /* ---------- Generic Tabs (course details, dashboards) ---------- */
  document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
    const tabs = tabGroup.querySelectorAll('[data-tab-btn]');
    const panels = tabGroup.querySelectorAll('[data-tab-panel]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab-btn');
        tabs.forEach((t) => t.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = tabGroup.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* ---------- Accordion (curriculum modules) ---------- */
  document.querySelectorAll('.curriculum-module .module-head').forEach((head) => {
    head.addEventListener('click', () => {
      head.closest('.curriculum-module').classList.toggle('open');
    });
  });

  /* ---------- Category chip filter (visual only) ---------- */
  document.querySelectorAll('.category-chip-row').forEach((row) => {
    row.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        row.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });

  /* ---------- Modal helpers ---------- */
  document.querySelectorAll('[data-modal-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.getAttribute('data-modal-open'));
      if (modal) modal.classList.add('show');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('show');
    });
  });
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('show');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.show').forEach((m) => m.classList.remove('show'));
      closeSidebar();
    }
  });

  /* ---------- Testimonial carousel ---------- */
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    let index = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function goTo(i) { index = (i + slides.length) % slides.length; update(); }

    prevBtn && prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(index + 1));

    let autoplay = setInterval(() => goTo(index + 1), 5500);
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(index + 1), 5500); });
  }

  /* ---------- Animate progress bars / rings on view ---------- */
  const animatedEls = document.querySelectorAll('.progress-fill[data-width], .fg-ring[data-pct]');
  if (animatedEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains('progress-fill')) {
          el.style.width = el.getAttribute('data-width') + '%';
        } else if (el.classList.contains('fg-ring')) {
          const pct = parseFloat(el.getAttribute('data-pct'));
          const r = el.r.baseVal.value;
          const c = 2 * Math.PI * r;
          el.style.strokeDasharray = c;
          el.style.strokeDashoffset = c - (pct / 100) * c;
        }
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    animatedEls.forEach((el) => io.observe(el));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => revealIO.observe(el));
  }

  /* ---------- Password field toggle (used on auth pages, safe no-op elsewhere) ---------- */
  document.querySelectorAll('.toggle-pw').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isPw = input.type === 'password';
      input.type = isPw ? 'text' : 'password';
      btn.classList.toggle('fa-eye', !isPw);
      btn.classList.toggle('fa-eye-slash', isPw);
    });
  });

  /* ---------- Generic "UI only" action buttons (submit assignment, etc.) ---------- */
  document.querySelectorAll('[data-ui-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = btn.getAttribute('data-ui-action') || 'Action completed';
      window.showToast(msg, 'fa-circle-check');
    });
  });

  /* ---------- Set active nav link based on current page ---------- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a, .sidebar-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

});
