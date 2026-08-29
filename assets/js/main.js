/* =============================================================
   Nehemiah James S. Magat — portfolio interactions
   Vanilla JS, no dependencies. All behaviour degrades gracefully.
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Safe storage (never throws) ------------------- */
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* no-op */ } }
  };

  /* ---------- Theme ----------------------------------------- */
  var root = document.documentElement;
  var saved = store.get('njm-theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set('njm-theme', next);
    });
  }

  /* ---------- Mobile navigation ----------------------------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeNav() {
    if (!nav) return;
    nav.setAttribute('data-open', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      navToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });
  }
  if (navLinks) {
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Sticky nav border ----------------------------- */
  var onScroll = function () {
    if (nav) nav.setAttribute('data-stuck', window.scrollY > 12 ? 'true' : 'false');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Reveal on scroll ------------------------------ */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(revealables, function (el) { revealObserver.observe(el); });
  }

  /* ---------- Scrollspy ------------------------------------- */
  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );

  // Each entry is { el, navId }. Nested sections (CAPS, SignSaya) carry
  // data-spy so they light up their parent nav item instead of nothing.
  var spyTargets = [];
  spyLinks.forEach(function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) spyTargets.push({ el: el, navId: el.id });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-spy]'), function (el) {
    spyTargets.push({ el: el, navId: el.getAttribute('data-spy') });
  });

  if ('IntersectionObserver' in window && spyTargets.length) {
    var ratios = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      var bestNav = null, best = 0;
      spyTargets.forEach(function (t) {
        var r = ratios[t.el.id] || 0;
        if (r > best) { best = r; bestNav = t.navId; }
      });
      spyLinks.forEach(function (a) {
        if (bestNav && a.getAttribute('href') === '#' + bestNav) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-68px 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75] });

    spyTargets.forEach(function (t) { spy.observe(t.el); });
  }

  /* ---------- CAPS architecture tabs ------------------------ */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.arch-tab'));

  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* ---------- Screenshot lightbox --------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbCap = document.getElementById('lightboxCap');
  var lbClose = document.getElementById('lightboxClose');
  var lastFocused = null;

  function openLightbox(fig) {
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    if (!img || !lightbox) return;
    lastFocused = document.activeElement;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = cap ? cap.textContent : '';
    lightbox.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.getAttribute('data-open') !== 'true') return;
    lightbox.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    window.setTimeout(function () { if (lbImg) lbImg.src = ''; }, 300);
  }

  Array.prototype.forEach.call(document.querySelectorAll('.shot, .plate'), function (fig) {
    fig.addEventListener('click', function () { openLightbox(fig); });
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(fig); }
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.tagName === 'DIV') closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
    // Trap focus inside the lightbox while it is open
    if (e.key === 'Tab' && lightbox && lightbox.getAttribute('data-open') === 'true') {
      e.preventDefault();
      if (lbClose) lbClose.focus();
    }
  });

  /* ---------- Email assembly (light scraper deterrent) ------ */
  var emailLink = document.getElementById('emailLink');
  var emailText = document.getElementById('emailText');
  if (emailLink) {
    var addr = emailLink.getAttribute('data-u') + '@' + emailLink.getAttribute('data-d');
    emailLink.setAttribute('href', 'mailto:' + addr);
    if (emailText) emailText.textContent = addr;
  }

  /* ---------- Footer year ----------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
