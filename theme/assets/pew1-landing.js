/* ============================================================
   PEW1 2.0 — Landing interactivity
   Vanilla-JS port of the original DCLogic component. Keeps every
   interactive function 1:1: fluid paint background, hero intro,
   scroll reveals, scroll-spy, mural quote calculator (-> WhatsApp),
   hoodie drag-to-rotate, reviews carousel and mobile menu.
   ============================================================ */
(function () {
  'use strict';

  var root = document.querySelector('[data-pew-landing]');
  if (!root) return;

  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var WA = (window.PEW1_THEME && window.PEW1_THEME.whatsappNumber)
    ? String(window.PEW1_THEME.whatsappNumber).replace(/[^0-9]/g, '')
    : '56935733021';

  var reviews = [
    { quote: 'Encargué un retrato y lo que llegó superó todo. La textura, la mirada del animal y la mía fundidas — es la pieza más mirada de mi casa.', name: 'Camila R.', role: 'Coleccionista · Santiago' },
    { quote: 'El mural transformó la entrada del local por completo. Nicolas entendió la idea al instante y la llevó más lejos de lo que imaginé.', name: 'Andrés M.', role: 'Café Raíz · Valparaíso' },
    { quote: 'El hoodie SARK es brutal. Serigrafía impecable, algodón pesado de verdad. Se siente una pieza de arte, no una polera más.', name: 'Fran T.', role: 'Cliente street wear' },
    { quote: 'Compré un fine art print y la fidelidad de color es increíble. Llegó protegido, firmado y numerado. Volveré por el original.', name: 'Daniela P.', role: 'Diseñadora · Concepción' }
  ];
  var reviewIdx = 0;
  var reviewTimer = null;

  /* ---------- liquid paint background ---------- */
  function initFluid() {
    var canvas = document.getElementById('pew1-fluid');
    var fb = root.querySelector('[data-fallback-bg]');
    if (!canvas) return;
    if (reduced) { canvas.style.display = 'none'; return; }
    var tries = 0;
    (function start() {
      if (window.PEW1Fluid) {
        try {
          var fluid = window.PEW1Fluid.init(canvas, {
            simRes: 128, dyeRes: 512,
            densityDissipation: 0.984, velocityDissipation: 0.991,
            curl: 20, splatRadius: 0.0026, splatForce: 4600,
            intensity: 0.92, maxDPR: 1.5
          });
          if (fluid && fb) fb.style.opacity = '0';
        } catch (e) { canvas.style.display = 'none'; }
      } else if (tries++ < 80) {
        setTimeout(start, 70);
      } else {
        canvas.style.display = 'none';
      }
    })();
  }

  /* ---------- responsive nav (desktop pill vs burger) ---------- */
  function initResponsiveNav() {
    var apply = function () {
      var desktop = root.querySelector('[data-desktop-nav]');
      var burger = root.querySelector('[data-burger]');
      var shop = root.querySelector('[data-shop-btn]');
      var wide = window.innerWidth >= 860;
      if (desktop) desktop.style.display = wide ? 'flex' : 'none';
      if (shop) shop.style.display = wide ? 'inline-flex' : 'none';
      if (burger) burger.style.display = wide ? 'none' : 'flex';
      if (wide) closeMenu();
    };
    apply();
    window.addEventListener('resize', apply);
  }

  /* ---------- hero word-by-word blur-in ---------- */
  function heroIntro() {
    if (reduced) return;
    var targets = [
      ['[data-hero-badge]', 0],
      ['[data-hero-sub]', 700],
      ['[data-hero-cta]', 820],
      ['[data-hero-stats]', 940]
    ];
    var words = Array.prototype.slice.call(root.querySelectorAll('[data-word]'));
    var prep = function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.filter = 'blur(10px)';
      el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1), filter .9s ease';
    };
    words.forEach(prep);
    targets.forEach(function (t) { var el = root.querySelector(t[0]); if (el) prep(el); });
    requestAnimationFrame(function () {
      words.forEach(function (w, i) {
        setTimeout(function () { w.style.opacity = '1'; w.style.transform = 'translateY(0)'; w.style.filter = 'blur(0)'; }, 120 + i * 95);
      });
      targets.forEach(function (t) {
        setTimeout(function () {
          var el = root.querySelector(t[0]);
          if (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; el.style.filter = 'blur(0)'; }
        }, t[1]);
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveals() {
    var els = Array.prototype.slice.call(root.querySelectorAll('[data-reveal]'));
    if (!els.length || reduced) return;
    els.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.filter = 'blur(8px)';
      el.style.transition = 'opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1), filter .85s ease';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          var delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');
          setTimeout(function () { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; el.style.filter = 'blur(0)'; }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- scroll-spy nav highlight ---------- */
  function initScrollSpy() {
    var ids = ['inicio', 'arte', 'streetwear', 'personalizar', 'murales', 'portfolio'];
    var links = {};
    root.querySelectorAll('[data-spy-link]').forEach(function (a) { links[a.getAttribute('data-spy-link')] = a; });
    var setActive = function (id) {
      Object.keys(links).forEach(function (k) {
        var a = links[k]; if (!a) return;
        var on = k === id;
        a.style.color = on ? '#F5F4F0' : '#9A9A95';
        a.style.background = on ? 'rgba(255,255,255,0.08)' : 'transparent';
      });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- murales quote calculator ---------- */
  function fmtCLP(n) { return '$' + Math.round(n).toLocaleString('es-CL'); }
  var cot = { servicio: 'mural', complejidad: 'basico' };
  function initCotizador() {
    var box = root.querySelector('[data-cotizador]');
    if (!box) return;
    var get = function (sel) { return box.querySelector(sel); };
    var recalc = function () {
      var w = parseFloat((get('[data-cot-ancho]') || {}).value || 0);
      var h = parseFloat((get('[data-cot-alto]') || {}).value || 0);
      var wLbl = get('[data-cot-ancho-val]'); if (wLbl) wLbl.textContent = w + ' cm';
      var hLbl = get('[data-cot-alto-val]'); if (hLbl) hLbl.textContent = h + ' cm';
      var area = (w / 100) * (h / 100);
      var areaLbl = get('[data-cot-area]'); if (areaLbl) areaLbl.textContent = area.toFixed(2) + ' m²';
      var rates = cot.complejidad === 'complejo' ? [50000, 150000] : [30000, 50000];
      var out = get('[data-cot-price]');
      if (out) out.textContent = area > 0 ? (fmtCLP(area * rates[0]) + ' – ' + fmtCLP(area * rates[1])) : '—';
    };
    box.querySelectorAll('[data-cot-ancho],[data-cot-alto]').forEach(function (el) { el.addEventListener('input', recalc); });
    var styleToggle = function (group, val) {
      box.querySelectorAll('[data-cot-' + group + '-opt]').forEach(function (b) {
        var on = b.getAttribute('data-cot-' + group + '-opt') === val;
        b.style.background = on ? '#FF7A00' : 'rgba(255,255,255,0.04)';
        b.style.color = on ? '#0A0F2E' : '#C7C7C2';
        b.style.borderColor = on ? '#FF7A00' : 'rgba(255,255,255,0.12)';
        b.style.fontWeight = on ? '700' : '500';
      });
    };
    box.querySelectorAll('[data-cot-servicio-opt]').forEach(function (b) {
      b.addEventListener('click', function () { cot.servicio = b.getAttribute('data-cot-servicio-opt'); styleToggle('servicio', cot.servicio); });
    });
    box.querySelectorAll('[data-cot-complejidad-opt]').forEach(function (b) {
      b.addEventListener('click', function () { cot.complejidad = b.getAttribute('data-cot-complejidad-opt'); styleToggle('complejidad', cot.complejidad); recalc(); });
    });
    var submit = box.querySelector('[data-action="submitCotizacion"]');
    if (submit) submit.addEventListener('click', function () {
      var v = function (n) { var el = box.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var w = box.querySelector('[data-cot-ancho]'); var h = box.querySelector('[data-cot-alto]');
      var area = ((parseFloat(w ? w.value : 0) / 100) * (parseFloat(h ? h.value : 0) / 100)).toFixed(2);
      var price = (box.querySelector('[data-cot-price]') || {}).textContent || '';
      var servicio = cot.servicio === 'tela' ? 'Pintura original en tela' : 'Mural artístico';
      var msg = '*Cotización PEW1*%0A' +
        'Servicio: ' + servicio + '%0A' +
        'Complejidad: ' + cot.complejidad + '%0A' +
        'Medidas: ' + (w ? w.value : '?') + ' x ' + (h ? h.value : '?') + ' cm (' + area + ' m²)%0A' +
        'Estimado referencial: ' + encodeURIComponent(price) + '%0A%0A' +
        'Nombre: ' + encodeURIComponent(v('nombre')) + '%0A' +
        'Email: ' + encodeURIComponent(v('email')) + '%0A' +
        'Ciudad/País: ' + encodeURIComponent(v('ciudad')) + '%0A' +
        'Superficie: ' + encodeURIComponent(v('superficie')) + '%0A' +
        'Fecha estimada: ' + encodeURIComponent(v('fecha')) + '%0A' +
        'Presupuesto: ' + encodeURIComponent(v('presupuesto')) + '%0A' +
        'Descripción: ' + encodeURIComponent(v('descripcion'));
      window.open('https://wa.me/' + WA + '?text=' + msg, '_blank', 'noopener');
    });
    styleToggle('servicio', 'mural');
    styleToggle('complejidad', 'basico');
    recalc();
  }

  /* ---------- reviews carousel ---------- */
  function renderReview() {
    var rev = reviews[reviewIdx] || reviews[0];
    var q = root.querySelector('[data-rev-quote]'); if (q) q.textContent = rev.quote;
    var n = root.querySelector('[data-rev-name]'); if (n) n.textContent = rev.name;
    var r = root.querySelector('[data-rev-role]'); if (r) r.textContent = rev.role;
    var c = root.querySelector('[data-rev-counter]'); if (c) c.textContent = (reviewIdx + 1) + ' / ' + reviews.length;
  }
  function initReviews() {
    var prev = root.querySelector('[data-action="prevReview"]');
    var next = root.querySelector('[data-action="nextReview"]');
    if (prev) prev.addEventListener('click', function () { reviewIdx = (reviewIdx - 1 + reviews.length) % reviews.length; renderReview(); });
    if (next) next.addEventListener('click', function () { reviewIdx = (reviewIdx + 1) % reviews.length; renderReview(); });
    var form = root.querySelector('[data-review-form]');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = root.querySelector('[data-review-ok]');
      form.style.display = 'none';
      if (ok) ok.style.display = 'flex';
    });
    renderReview();
    reviewTimer = setInterval(function () {
      if (document.hidden) return;
      reviewIdx = (reviewIdx + 1) % reviews.length; renderReview();
    }, 6500);
  }

  /* ---------- hoodie drag-to-rotate ---------- */
  function initHoodieDrag() {
    var el = root.querySelector('[data-hoodie]');
    if (!el) return;
    var dragging = false, lastX = 0, rot = -12, vel = 0, raf = null;
    var apply = function () { el.style.transform = 'perspective(900px) rotateY(' + rot + 'deg)'; };
    var idle = function () {
      if (dragging) return;
      vel *= 0.92; rot += vel; rot += (-12 - rot) * 0.02; apply();
      raf = requestAnimationFrame(idle);
    };
    var down = function (x) { dragging = true; lastX = x; el.style.transition = 'none'; if (raf) cancelAnimationFrame(raf); };
    var move = function (x) { if (!dragging) return; var dx = x - lastX; lastX = x; vel = dx * 0.4; rot += dx * 0.4; apply(); };
    var up = function () { if (!dragging) return; dragging = false; raf = requestAnimationFrame(idle); };
    el.addEventListener('mousedown', function (e) { e.preventDefault(); down(e.clientX); });
    window.addEventListener('mousemove', function (e) { move(e.clientX); });
    window.addEventListener('mouseup', up);
    el.addEventListener('touchstart', function (e) { if (e.touches[0]) down(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', function (e) { if (e.touches[0]) move(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', up);
    apply();
    raf = requestAnimationFrame(idle);
  }

  /* ---------- mobile menu ---------- */
  function openMenu() { var m = root.querySelector('[data-mobile-menu]'); if (m) m.style.display = 'flex'; }
  function closeMenu() { var m = root.querySelector('[data-mobile-menu]'); if (m) m.style.display = 'none'; }
  function initMenu() {
    root.querySelectorAll('[data-action="toggleMenu"]').forEach(function (b) {
      b.addEventListener('click', function () {
        var m = root.querySelector('[data-mobile-menu]');
        if (m) m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
      });
    });
    root.querySelectorAll('[data-action="closeMenu"]').forEach(function (b) { b.addEventListener('click', closeMenu); });
  }

  /* ---------- boot ---------- */
  function boot() {
    initFluid();
    initResponsiveNav();
    heroIntro();
    initReveals();
    initScrollSpy();
    initCotizador();
    initReviews();
    initHoodieDrag();
    initMenu();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
