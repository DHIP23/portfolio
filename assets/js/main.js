/**
 * main.js
 * ─────────────────────────────────────────────────────────────
 * Modules :
 *  1. Navbar scroll effect
 *  2. Intersection Observer — animations au scroll
 *  3. Compteurs animés (KPI Hero)
 *  4. Barres de compétences animées
 *  5. Formulaire de contact (Formspree async)
 *  6. Bouton retour en haut
 *  7. Navigation active au scroll (ScrollSpy manuel)
 *  8. Footer : année courante
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ── 1. NAVBAR SCROLL ──────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // état initial
})();

/* ── 2. INTERSECTION OBSERVER — ANIMATIONS ─────────────────── */
(function initAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);

      setTimeout(() => {
        el.classList.add('is-visible');
        // Déclencher les compteurs si présents dans l'élément
        triggerCounters(el);
        // Déclencher les barres de compétences
        triggerSkillBars(el);
      }, delay);

      observer.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));

  // Exposer pour projects.js (cartes injectées dynamiquement)
  window._portfolioObserver = observer;
})();

/* ── 3. COMPTEURS ANIMÉS ───────────────────────────────────── */
function triggerCounters(container) {
  const counters = container.querySelectorAll('.kpi-number[data-count]');
  counters.forEach(el => {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';

    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });

  // Cas du KPI avec suffix mais sans data-count (valeur statique avec suffix)
  const staticCounters = container.querySelectorAll('.kpi-number[data-suffix]:not([data-count])');
  staticCounters.forEach(el => {
    const suffix = el.dataset.suffix || '';
    const val = el.textContent.replace(suffix, '').trim();
    el.textContent = val + suffix;
  });
}

/* ── 4. BARRES DE COMPÉTENCES ──────────────────────────────── */
function triggerSkillBars(container) {
  // Chercher les barres dans le conteneur ou dans toute la page si c'est une section parent
  const scope = container.closest('.section-skills') || container;
  const bars = scope.querySelectorAll('.skill-bar__fill[data-width]');

  bars.forEach(bar => {
    if (bar.dataset.animated) return;
    bar.dataset.animated = '1';

    // Déclencher l'animation CSS via la width
    requestAnimationFrame(() => {
      bar.style.width = bar.dataset.width + '%';
    });
  });
}

/* ── 5. FORMULAIRE DE CONTACT ──────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn   = document.getElementById('submit-btn');
  const submitText  = document.getElementById('submit-text');
  const submitLoad  = document.getElementById('submit-loading');
  const successMsg  = document.getElementById('form-success');
  const errorMsg    = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validation Bootstrap native
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // État chargement
    submitBtn.disabled = true;
    submitText.classList.add('d-none');
    submitLoad.classList.remove('d-none');
    successMsg.classList.add('d-none');
    errorMsg.classList.add('d-none');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        form.classList.remove('was-validated');
        successMsg.classList.remove('d-none');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // GA4 : événement de conversion
        if (typeof gtag === 'function') {
          gtag('event', 'form_submit', { event_category: 'contact', event_label: 'portfolio_contact' });
        }
      } else {
        const data = await response.json();
        if (data.errors) {
          errorMsg.textContent = data.errors.map(e => e.message).join(', ');
        }
        errorMsg.classList.remove('d-none');
      }
    } catch (_err) {
      errorMsg.classList.remove('d-none');
    } finally {
      submitBtn.disabled = false;
      submitText.classList.remove('d-none');
      submitLoad.classList.add('d-none');
    }
  });
})();

/* ── 6. BOUTON RETOUR EN HAUT ──────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function onScroll() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── 7. SCROLLSPY NAVBAR ───────────────────────────────────── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ── 8. FOOTER — ANNÉE COURANTE ────────────────────────────── */
(function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── 9. FERMER LE MENU MOBILE AU CLIC D'UN LIEN ───────────── */
(function initMobileMenu() {
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const collapseEl = document.getElementById('navMenu');
  if (!collapseEl) return;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();
