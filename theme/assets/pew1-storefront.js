/* ============================================================
   PEW1 2.0 — Shopify Storefront API integration
   Live products + cart + checkout for the landing.

   Reads its config from window.PEW1_STOREFRONT, injected by the
   landing section:
     { domain: 'sarkpew1.com', token: '<storefront-token>',
       apiVersion: '2024-10' }

   If no token is set, the landing keeps working exactly as before
   (every CTA is a normal link to the Shopify store / collection /
   cart). When a token is present, product grids marked with
   [data-pew-collection] are hydrated with live data and a slide-in
   cart drawer takes over add-to-cart + checkout.
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.PEW1_STOREFRONT || {};
  var DOMAIN = CFG.domain || 'sarkpew1.com';
  var TOKEN = (CFG.token || '').trim();
  var VERSION = CFG.apiVersion || '2024-10';
  var ENDPOINT = 'https://' + DOMAIN + '/api/' + VERSION + '/graphql.json';
  var STORAGE_KEY = 'pew1_cart_id';
  var hasAPI = TOKEN.length > 5 && TOKEN.indexOf('<<') === -1;

  var root = document.querySelector('[data-pew-landing]');

  /* ---------- helpers ---------- */
  function money(amount, code) {
    var n = Math.round(parseFloat(amount));
    var s = n.toLocaleString('es-CL');
    return (code === 'CLP' || !code) ? '$' + s : '$' + s + ' ' + code;
  }
  function gql(query, variables) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN
      },
      body: JSON.stringify({ query: query, variables: variables || {} })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j.errors) throw new Error(j.errors[0] && j.errors[0].message);
      return j.data;
    });
  }

  /* ---------- toast ---------- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'pew-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-open'); }, 2600);
  }

  /* =========================================================
     CART
     ========================================================= */
  var CART_FIELDS =
    'id checkoutUrl totalQuantity ' +
    'cost { subtotalAmount { amount currencyCode } } ' +
    'lines(first: 50) { edges { node { id quantity ' +
    'merchandise { ... on ProductVariant { id title image { url } ' +
    'price { amount currencyCode } product { title } } } } } }';

  var cart = null;

  function saveId(id) { try { localStorage.setItem(STORAGE_KEY, id); } catch (e) {} }
  function loadId() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }

  function fetchCart() {
    var id = loadId();
    if (!id) return Promise.resolve(null);
    return gql('query($id: ID!){ cart(id:$id){ ' + CART_FIELDS + ' } }', { id: id })
      .then(function (d) { cart = d.cart; if (!cart) saveId(''); return cart; })
      .catch(function () { return null; });
  }

  function ensureCart() {
    if (cart && cart.id) return Promise.resolve(cart);
    var id = loadId();
    if (id) return fetchCart().then(function (c) { return c || createCart(); });
    return createCart();
  }
  function createCart() {
    return gql('mutation{ cartCreate(input:{}){ cart { ' + CART_FIELDS + ' } } }')
      .then(function (d) { cart = d.cartCreate.cart; saveId(cart.id); return cart; });
  }

  function addLine(variantId, qty) {
    return ensureCart().then(function (c) {
      return gql(
        'mutation($id:ID!,$lines:[CartLineInput!]!){ cartLinesAdd(cartId:$id,lines:$lines){ cart { ' + CART_FIELDS + ' } } }',
        { id: c.id, lines: [{ merchandiseId: variantId, quantity: qty || 1 }] }
      );
    }).then(function (d) { cart = d.cartLinesAdd.cart; renderCart(); return cart; });
  }
  function updateLine(lineId, qty) {
    if (qty <= 0) return removeLine(lineId);
    return gql(
      'mutation($id:ID!,$lines:[CartLineUpdateInput!]!){ cartLinesUpdate(cartId:$id,lines:$lines){ cart { ' + CART_FIELDS + ' } } }',
      { id: cart.id, lines: [{ id: lineId, quantity: qty }] }
    ).then(function (d) { cart = d.cartLinesUpdate.cart; renderCart(); });
  }
  function removeLine(lineId) {
    return gql(
      'mutation($id:ID!,$ids:[ID!]!){ cartLinesRemove(cartId:$id,lineIds:$ids){ cart { ' + CART_FIELDS + ' } } }',
      { id: cart.id, ids: [lineId] }
    ).then(function (d) { cart = d.cartLinesRemove.cart; renderCart(); });
  }

  /* ---------- cart drawer DOM ---------- */
  var els = {};
  function buildDrawer() {
    var overlay = document.createElement('div');
    overlay.className = 'pew-cart-overlay';
    overlay.setAttribute('data-pew-cart-overlay', '');
    var drawer = document.createElement('aside');
    drawer.className = 'pew-cart';
    drawer.setAttribute('aria-label', 'Carrito');
    drawer.innerHTML =
      '<div class="pew-cart__head"><h3>Tu carrito</h3>' +
      '<button class="pew-cart__close" data-pew-cart-close aria-label="Cerrar">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
      '<div class="pew-cart__body" data-pew-cart-body></div>' +
      '<div class="pew-cart__foot" data-pew-cart-foot hidden>' +
      '<div class="pew-cart__subtotal"><span>Subtotal</span><span data-pew-cart-subtotal>—</span></div>' +
      '<button class="pew-cart__checkout" data-pew-cart-checkout>Finalizar compra' +
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A0F2E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></button>' +
      '<p class="pew-cart__note">Pago seguro y checkout gestionados por Shopify.</p></div>';
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    els.overlay = overlay;
    els.drawer = drawer;
    els.body = drawer.querySelector('[data-pew-cart-body]');
    els.foot = drawer.querySelector('[data-pew-cart-foot]');
    els.subtotal = drawer.querySelector('[data-pew-cart-subtotal]');

    overlay.addEventListener('click', closeCart);
    drawer.querySelector('[data-pew-cart-close]').addEventListener('click', closeCart);
    drawer.querySelector('[data-pew-cart-checkout]').addEventListener('click', function () {
      if (cart && cart.checkoutUrl) window.location.href = cart.checkoutUrl;
    });
    els.body.addEventListener('click', function (e) {
      var inc = e.target.closest('[data-pew-qty-inc]');
      var dec = e.target.closest('[data-pew-qty-dec]');
      var rem = e.target.closest('[data-pew-line-remove]');
      if (inc) updateLine(inc.getAttribute('data-line'), parseInt(inc.getAttribute('data-qty'), 10) + 1);
      else if (dec) updateLine(dec.getAttribute('data-line'), parseInt(dec.getAttribute('data-qty'), 10) - 1);
      else if (rem) removeLine(rem.getAttribute('data-line'));
    });
  }
  function openCart() { els.overlay.classList.add('is-open'); els.drawer.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { els.overlay.classList.remove('is-open'); els.drawer.classList.remove('is-open'); document.body.style.overflow = ''; }

  function renderCart() {
    updateBadge();
    if (!els.body) return;
    var lines = (cart && cart.lines && cart.lines.edges) ? cart.lines.edges : [];
    if (!lines.length) {
      els.body.innerHTML = '<div class="pew-cart__empty"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A9A95" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg><span>Tu carrito está vacío.</span></div>';
      els.foot.hidden = true;
      return;
    }
    els.body.innerHTML = lines.map(function (e) {
      var n = e.node, m = n.merchandise;
      var img = m.image ? m.image.url : '';
      var variantLabel = (m.title && m.title !== 'Default Title') ? m.title : '';
      return '<div class="pew-cart__line">' +
        '<img src="' + img + '" alt="" loading="lazy">' +
        '<div><div class="pew-cart__line-title">' + (m.product ? m.product.title : '') + '</div>' +
        (variantLabel ? '<div class="pew-cart__line-meta">' + variantLabel + '</div>' : '') +
        '<div class="pew-cart__qty">' +
        '<button data-pew-qty-dec data-line="' + n.id + '" data-qty="' + n.quantity + '" aria-label="Quitar uno">−</button>' +
        '<span>' + n.quantity + '</span>' +
        '<button data-pew-qty-inc data-line="' + n.id + '" data-qty="' + n.quantity + '" aria-label="Agregar uno">+</button>' +
        '</div></div>' +
        '<div><div class="pew-cart__line-price">' + money(m.price.amount * n.quantity, m.price.currencyCode) + '</div>' +
        '<span class="pew-cart__remove" data-pew-line-remove data-line="' + n.id + '">Quitar</span></div>' +
        '</div>';
    }).join('');
    els.foot.hidden = false;
    if (cart.cost && cart.cost.subtotalAmount) els.subtotal.textContent = money(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode);
  }

  function updateBadge() {
    var count = cart ? (cart.totalQuantity || 0) : 0;
    document.querySelectorAll('[data-pew-cart-count]').forEach(function (b) {
      b.textContent = count;
      b.classList.toggle('is-visible', count > 0);
    });
  }

  /* =========================================================
     LIVE PRODUCT HYDRATION
     ========================================================= */
  function cardHTML(p) {
    var v = p.variants.edges[0] ? p.variants.edges[0].node : null;
    var img = p.featuredImage ? p.featuredImage.url : (v && v.image ? v.image.url : '');
    var url = 'https://' + DOMAIN + '/products/' + p.handle;
    var price = v ? money(v.price.amount, v.price.currencyCode) : '';
    var addBtn = (v && v.availableForSale)
      ? '<button class="pew-add-btn" data-pew-add="' + v.id + '">Agregar</button>'
      : '<span style="font-size:13px;color:#9A9A95;">Agotado</span>';
    return '<div data-reveal style="display:flex;flex-direction:column;border-radius:24px;overflow:hidden;background:rgba(255,255,255,0.035);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.10);box-shadow:inset 0 1px 1px rgba(255,255,255,0.12), 0 20px 50px rgba(0,0,0,0.35);">' +
      '<a href="' + url + '" style="position:relative;aspect-ratio:4/5;overflow:hidden;display:block;">' +
      '<img src="' + img + '" alt="' + (p.title || '') + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;">' +
      '<span style="position:absolute;top:14px;left:14px;padding:6px 12px;border-radius:9999px;background:rgba(5,6,10,0.5);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.16);font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#F5F4F0;">Pintura original</span></a>' +
      '<div style="padding:22px 22px 24px;">' +
      '<a href="' + url + '"><h3 style="margin:0;font-family:\'Instrument Serif\',serif;font-style:italic;font-weight:400;font-size:26px;color:#F5F4F0;line-height:1;">' + p.title + '</h3></a>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:18px;gap:12px;">' +
      '<span style="font-size:18px;font-weight:600;color:#F5F4F0;letter-spacing:0.01em;">' + price + '</span>' +
      addBtn + '</div></div></div>';
  }

  function hydrateGrids() {
    var grids = document.querySelectorAll('[data-pew-collection]');
    grids.forEach(function (grid) {
      var handle = grid.getAttribute('data-pew-collection');
      var limit = parseInt(grid.getAttribute('data-pew-limit') || '3', 10);
      gql('query($h:String!,$n:Int!){ collection(handle:$h){ products(first:$n){ edges { node { ' +
        'title handle featuredImage { url } ' +
        'variants(first:1){ edges { node { id availableForSale price { amount currencyCode } image { url } } } } } } } } }',
        { h: handle, n: limit })
        .then(function (d) {
          if (!d.collection || !d.collection.products.edges.length) return;
          grid.innerHTML = d.collection.products.edges.map(function (e) { return cardHTML(e.node); }).join('');
          // re-run reveal animation for freshly injected cards
          grid.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.style.opacity = '1'; el.style.transform = 'none'; el.style.filter = 'none';
          });
        })
        .catch(function () { /* keep static fallback cards */ });
    });
  }

  /* =========================================================
     WIRING
     ========================================================= */
  function wireCartButtons() {
    document.addEventListener('click', function (e) {
      var openBtn = e.target.closest('[data-pew-cart-open]');
      if (openBtn) { e.preventDefault(); openCart(); return; }
      var addBtn = e.target.closest('[data-pew-add]');
      if (addBtn) {
        e.preventDefault();
        var id = addBtn.getAttribute('data-pew-add');
        addBtn.disabled = true;
        addLine(id, 1).then(function () {
          addBtn.disabled = false;
          toast('Agregado al carrito');
          openCart();
        }).catch(function () { addBtn.disabled = false; toast('No se pudo agregar'); });
      }
    });
  }

  function init() {
    if (!hasAPI) return; // graceful fallback: links-only mode
    if (root) root.setAttribute('data-pew-live', 'on');
    buildDrawer();
    wireCartButtons();
    hydrateGrids();
    fetchCart().then(renderCart);
    window.PEW1Shop = { addLine: addLine, openCart: openCart, fetchCart: fetchCart };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
