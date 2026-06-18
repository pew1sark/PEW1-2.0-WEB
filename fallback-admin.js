(function () {
  "use strict";

  var PASS = "pew1-arte";
  var DRAFT_KEY = "pew1_admin_draft";
  var CONFIG_KEY = "pew1_admin_publish_config";
  var STATUS_KEY = "pew1_admin_status";
  var active = false;
  var editing = false;
  var activeTab = "editar";
  var previewMode = "desktop";
  var overrides = emptyOverrides();
  var imgTarget = null;
  var imgKey = "";

  function emptyOverrides() {
    return { text: {}, img: {}, hidden: {}, links: {}, added: [], order: [], compact: {} };
  }

  function root() {
    return document.querySelector("[data-content-root]");
  }

  function ready(fn) {
    if (root()) {
      fn();
      return;
    }
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      if (root()) {
        clearInterval(timer);
        fn();
      }
      if (tries > 200) clearInterval(timer);
    }, 80);
  }

  function normalize(data) {
    data = data || {};
    return {
      text: data.text || {},
      img: data.img || {},
      hidden: data.hidden || {},
      links: data.links || {},
      added: Array.isArray(data.added) ? data.added : [],
      order: Array.isArray(data.order) ? data.order : [],
      compact: data.compact || {}
    };
  }

  function mergeOverrides(base, extra) {
    base = normalize(base);
    extra = normalize(extra);
    return {
      text: Object.assign({}, base.text, extra.text),
      img: Object.assign({}, base.img, extra.img),
      hidden: Object.assign({}, base.hidden, extra.hidden),
      links: Object.assign({}, base.links, extra.links),
      added: extra.added.length ? extra.added : base.added,
      order: extra.order.length ? extra.order : base.order,
      compact: Object.assign({}, base.compact, extra.compact)
    };
  }

  function loadPublished() {
    return fetch("pew1-content.json", { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : null; })
      .catch(function () { return null; });
  }

  function loadDraft() {
    try {
      var saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (saved) overrides = mergeOverrides(overrides, saved);
    } catch (e) {}
  }

  function saveDraft(reason) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(normalize(overrides)));
      localStorage.setItem(STATUS_KEY, JSON.stringify({ state: "draft", at: Date.now(), reason: reason || "Cambios guardados" }));
    } catch (e) {}
    updateStatus();
  }

  function readStatus() {
    try {
      return JSON.parse(localStorage.getItem(STATUS_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function setPublishedStatus() {
    try {
      localStorage.setItem(STATUS_KEY, JSON.stringify({ state: "published", at: Date.now(), reason: "Publicado" }));
    } catch (e) {}
    updateStatus();
  }

  function adminConfig() {
    var defaults = {
      owner: "pew1sark",
      repo: "PEW1-2.0-WEB",
      branch: "main",
      path: "pew1-content.json",
      token: ""
    };
    try {
      return Object.assign(defaults, JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}"));
    } catch (e) {
      return defaults;
    }
  }

  function saveAdminConfig(config) {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch (e) {}
  }

  function pathKey(el) {
    var r = root();
    var parts = [];
    var node = el;
    while (node && node !== r) {
      var parent = node.parentNode;
      if (!parent) break;
      parts.unshift(Array.prototype.indexOf.call(parent.children, node));
      node = parent;
    }
    return parts.join(".");
  }

  function elByPath(key) {
    var node = root();
    if (!node) return null;
    if (key === "") return node;
    key.split(".").forEach(function (part) {
      if (node) node = node.children[Number(part)];
    });
    return node;
  }

  function skip(el) {
    if (!el || el.nodeType !== 1) return true;
    var tag = el.tagName;
    if (/^(SCRIPT|STYLE|NOSCRIPT|META|LINK|SVG|PATH|CANVAS|INPUT|TEXTAREA|SELECT|OPTION|IMG|VIDEO|SOURCE)$/.test(tag)) return true;
    return !!(
      el.closest("[data-no-edit]") ||
      el.closest("[data-cot-ancho-val],[data-cot-alto-val],[data-cot-area],[data-cot-price]") ||
      el.closest("[data-pew1-fallback-admin]")
    );
  }

  function directText(el) {
    var text = "";
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 3) text += node.textContent;
    });
    return text.trim();
  }

  function editableTextEls() {
    var r = root();
    if (!r) return [];
    var out = [];
    r.querySelectorAll("*").forEach(function (el) {
      if (skip(el)) return;
      if (!directText(el)) return;
      if ((el.innerText || el.textContent || "").trim().length > 260 && !/^(P|H1|H2|H3|H4|H5|H6|LI|SPAN|A|BUTTON|STRONG|EM|LABEL)$/.test(el.tagName)) return;
      out.push(el);
    });
    return out;
  }

  function sectionKey(sec) {
    return sec && sec.getAttribute("data-edsec");
  }

  function sectionLabel(sec) {
    if (!sec) return "Sección";
    var raw = sec.getAttribute("data-edlabel") || sec.getAttribute("aria-label") || "";
    var heading = sec.querySelector("h1,h2,h3,[data-section-title]");
    var text = raw || (heading && (heading.innerText || heading.textContent || "").trim()) || sectionKey(sec) || "Sección";
    return text.replace(/\s+/g, " ").trim().slice(0, 54);
  }

  function sectionSummary(sec) {
    var text = (sec && (sec.innerText || sec.textContent || "").trim()) || "";
    return text.replace(/\s+/g, " ").slice(0, 90);
  }

  function getSections() {
    return Array.prototype.slice.call(document.querySelectorAll("[data-edsec]")).filter(function (sec) {
      return !sec.closest("[data-pew1-fallback-admin]");
    });
  }

  function ensureOrder() {
    var keys = getSections().map(sectionKey).filter(Boolean);
    if (!overrides.order || !overrides.order.length) overrides.order = keys;
    keys.forEach(function (key) {
      if (overrides.order.indexOf(key) === -1) overrides.order.push(key);
    });
    overrides.order = overrides.order.filter(function (key) { return keys.indexOf(key) !== -1; });
  }

  function applyOverrides() {
    applyAddedSections();
    applySectionOrder();
    Object.keys(overrides.text || {}).forEach(function (key) {
      var el = elByPath(key);
      if (el && el.innerHTML !== overrides.text[key]) el.innerHTML = overrides.text[key];
    });
    Object.keys(overrides.img || {}).forEach(function (key) {
      var el = elByPath(key);
      if (el && el.tagName === "IMG") el.setAttribute("src", overrides.img[key]);
    });
    Object.keys(overrides.links || {}).forEach(function (key) {
      var el = elByPath(key);
      if (el && el.tagName === "A") el.setAttribute("href", overrides.links[key]);
    });
    getSections().forEach(function (sec) {
      var key = sectionKey(sec);
      sec.style.display = overrides.hidden && overrides.hidden[key] ? "none" : "";
      sec.setAttribute("data-pew1-compact", overrides.compact && overrides.compact[key] ? "true" : "false");
    });
  }

  function applyAddedSections() {
    (overrides.added || []).forEach(function (item) {
      if (!item || !item.id || !item.html || document.querySelector('[data-pew1-added-section="' + item.id + '"]')) return;
      var holder = document.createElement("div");
      holder.innerHTML = item.html;
      var node = holder.firstElementChild;
      if (!node) return;
      node.setAttribute("data-pew1-added-section", item.id);
      node.setAttribute("data-edsec", "added-" + item.id);
      node.setAttribute("data-edlabel", item.label || "Sección agregada");
      var after = document.querySelector('[data-edsec="' + cssEscape(item.after) + '"]');
      if (after && after.parentNode) after.parentNode.insertBefore(node, after.nextSibling);
      else if (root()) root().appendChild(node);
    });
  }

  function applySectionOrder() {
    if (!overrides.order || !overrides.order.length) return;
    var groups = {};
    getSections().forEach(function (sec) {
      var parent = sec.parentNode;
      if (!parent) return;
      var id = parent.__pew1ParentId || (parent.__pew1ParentId = Math.random().toString(36).slice(2));
      groups[id] = groups[id] || { parent: parent, sections: [] };
      groups[id].sections.push(sec);
    });
    Object.keys(groups).forEach(function (id) {
      var group = groups[id];
      group.sections.sort(function (a, b) {
        return overrides.order.indexOf(sectionKey(a)) - overrides.order.indexOf(sectionKey(b));
      });
      group.sections.forEach(function (sec) { group.parent.appendChild(sec); });
    });
  }

  function armEditing() {
    var els = editableTextEls();
    els.forEach(function (el) {
      el.setAttribute("contenteditable", "true");
      el.setAttribute("data-pew1-editing-text", "");
      el.style.outline = "1px dashed rgba(255,122,0,0.85)";
      el.style.outlineOffset = "3px";
      el.style.cursor = "text";
      if (!el.__pew1FallbackTextBound) {
        el.__pew1FallbackTextBound = true;
        el.addEventListener("focus", function () { showInspector("Texto", labelFor(el), el); }, true);
        el.addEventListener("input", function () {
          overrides.text[pathKey(el)] = el.innerHTML;
          saveDraft("Texto editado");
          updateEditableCount();
        });
      }
    });

    root().querySelectorAll("img").forEach(function (img) {
      if (skip(img)) return;
      img.style.outline = "2px solid rgba(255,122,0,0.8)";
      img.style.outlineOffset = "2px";
      img.style.cursor = "pointer";
      if (!img.__pew1FallbackImgBound) {
        img.__pew1FallbackImgBound = true;
        img.addEventListener("click", function (event) {
          if (!editing) return;
          event.preventDefault();
          event.stopPropagation();
          imgTarget = img;
          imgKey = pathKey(img);
          showInspector("Imagen", labelFor(img), img);
          document.querySelector("[data-pew1-fallback-file]").click();
        }, true);
      }
    });

    root().querySelectorAll("a[href],button").forEach(function (el) {
      if (skip(el)) return;
      el.style.boxShadow = "0 0 0 2px rgba(58,164,255,0.65)";
      if (!el.__pew1FallbackActionBound) {
        el.__pew1FallbackActionBound = true;
        el.addEventListener("mouseenter", function () { showInspector(el.tagName === "A" ? "Link" : "Botón", labelFor(el), el); }, true);
        el.addEventListener("click", function (event) {
          if (!editing) return;
          event.preventDefault();
          event.stopPropagation();
          showInspector(el.tagName === "A" ? "Link" : "Botón", labelFor(el), el);
          if (el.tagName === "A") {
            activeTab = "links";
            renderAdminShell();
            focusLinkInput(pathKey(el));
          }
        }, true);
      }
    });
    updateEditableCount();
  }

  function disarmEditing() {
    var r = root();
    if (!r) return;
    r.querySelectorAll("[contenteditable]").forEach(function (el) {
      el.removeAttribute("contenteditable");
      el.removeAttribute("data-pew1-editing-text");
      el.style.outline = "";
      el.style.outlineOffset = "";
      el.style.cursor = "";
    });
    r.querySelectorAll("img,a[href],button").forEach(function (el) {
      el.style.outline = "";
      el.style.outlineOffset = "";
      el.style.cursor = "";
      el.style.boxShadow = "";
    });
    clearHighlights();
  }

  function labelFor(el) {
    var sec = el.closest("[data-edsec]");
    var base = sectionLabel(sec);
    var text = (el.innerText || el.alt || el.getAttribute("aria-label") || el.getAttribute("href") || el.textContent || el.tagName).trim();
    return base + " / " + text.replace(/\s+/g, " ").slice(0, 80);
  }

  function css() {
    if (document.getElementById("pew1-fallback-admin-css")) return;
    var style = document.createElement("style");
    style.id = "pew1-fallback-admin-css";
    style.textContent = [
      "[data-pew1-fallback-admin]{position:fixed;z-index:999999;font-family:Montserrat,system-ui,sans-serif;color:#F5F4F0}",
      ".pew1-admin-shell{top:0;right:0;width:min(430px,100vw);height:100svh;background:rgba(5,6,10,.94);border-left:1px solid rgba(255,255,255,.14);box-shadow:-24px 0 80px rgba(0,0,0,.55);backdrop-filter:blur(18px);display:flex;flex-direction:column}",
      ".pew1-admin-head{padding:16px;border-bottom:1px solid rgba(255,255,255,.12);display:grid;gap:12px}",
      ".pew1-admin-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}",
      ".pew1-admin-title{margin:0;font:900 20px/1.05 Montserrat,system-ui,sans-serif;letter-spacing:.02em}",
      ".pew1-admin-sub{margin:5px 0 0;color:#9A9A95;font-size:12px;line-height:1.35}",
      ".pew1-admin-close{width:38px;height:38px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#fff;font-size:22px}",
      ".pew1-admin-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}",
      ".pew1-admin-tab{min-height:36px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:#F5F4F0;font-weight:850;font-size:10px;text-transform:uppercase;letter-spacing:.05em}",
      ".pew1-admin-tab.active{background:#FF7A00;border-color:#FF7A00;color:#05060A}",
      ".pew1-admin-status{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:34px;padding:8px 10px;border-radius:12px;background:rgba(255,255,255,.05);font-size:12px;color:#CFCFC9}",
      ".pew1-admin-dot{width:8px;height:8px;border-radius:99px;background:#9A9A95;display:inline-block;margin-right:6px}.pew1-admin-dot.draft{background:#FFB020}.pew1-admin-dot.published{background:#50E3A4}",
      ".pew1-admin-body{min-height:0;overflow:auto;padding:14px;display:grid;gap:12px}",
      ".pew1-admin-card{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.045);border-radius:8px;padding:12px;display:grid;gap:10px}",
      ".pew1-admin-card h3{margin:0;font:900 13px/1.2 Montserrat,system-ui,sans-serif;text-transform:uppercase;letter-spacing:.08em}",
      ".pew1-admin-muted{color:#9A9A95;font-size:12px;line-height:1.45;margin:0}",
      ".pew1-admin-actions{display:flex;gap:8px;flex-wrap:wrap}",
      ".pew1-fb-btn{min-height:38px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#F5F4F0;padding:0 12px;font-weight:850;letter-spacing:.04em;text-transform:uppercase;font-size:10px}",
      ".pew1-fb-btn.primary{background:#FF7A00;border-color:#FF7A00;color:#05060A}",
      ".pew1-fb-btn.danger{border-color:rgba(255,90,90,.45);color:#FF9A9A}",
      ".pew1-fb-input{width:100%;min-height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#fff;padding:8px 10px;font:500 13px/1.3 Montserrat,system-ui,sans-serif}",
      ".pew1-admin-row{display:grid;gap:6px}.pew1-admin-row label,.pew1-admin-label{color:#B9B9B2;font-size:11px;font-weight:750;text-transform:uppercase;letter-spacing:.07em}",
      ".pew1-section-row,.pew1-link-row{display:grid;gap:9px;padding:10px;border:1px solid rgba(255,255,255,.10);border-radius:8px;background:rgba(255,255,255,.035)}",
      ".pew1-section-main,.pew1-link-main{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}",
      ".pew1-section-name,.pew1-link-name{font-weight:850;font-size:13px;line-height:1.25}.pew1-section-summary,.pew1-link-meta{color:#9A9A95;font-size:11px;line-height:1.35;margin-top:3px}",
      ".pew1-section-actions{display:flex;gap:6px;flex-wrap:wrap}.pew1-mini{min-height:30px;padding:0 9px;border-radius:10px;font-size:9px}",
      ".pew1-inspector{left:14px;bottom:14px;max-width:min(360px,calc(100vw - 28px));padding:10px 12px;border-radius:12px;background:rgba(5,6,10,.90);border:1px solid rgba(255,122,0,.45);box-shadow:0 18px 60px rgba(0,0,0,.45);font-size:12px;pointer-events:none}",
      ".pew1-highlight{outline:3px solid rgba(255,122,0,.9)!important;outline-offset:4px!important;box-shadow:0 0 0 9999px rgba(5,6,10,.16)!important}",
      "body.pew1-preview-mobile{background:#111!important}body.pew1-preview-mobile [data-content-root]{width:390px!important;max-width:390px!important;margin:18px auto!important;box-shadow:0 0 0 1px rgba(255,255,255,.16),0 30px 100px rgba(0,0,0,.55)!important;overflow:hidden!important}",
      "[data-pew1-compact='true']{padding-top:clamp(18px,4vw,42px)!important;padding-bottom:clamp(18px,4vw,42px)!important;margin-top:0!important;margin-bottom:0!important}",
      "html,body{max-width:100%;overflow-x:hidden!important}",
      "@media(max-width:700px){[data-content-root]{max-width:100vw!important;overflow:hidden!important}[data-content-root] *{min-width:0!important;max-width:100vw;overflow-wrap:anywhere}[data-content-root] [style*='white-space:nowrap'],[data-content-root] [style*='white-space: nowrap']{white-space:normal!important}[data-content-root] section,[data-content-root] [data-edsec]{width:100%!important;max-width:100vw!important;margin-left:0!important;margin-right:0!important}[id='personalizar'],[data-edsec='personalizar']{padding-left:clamp(14px,4vw,22px)!important;padding-right:clamp(14px,4vw,22px)!important;overflow:hidden!important}[id='personalizar'] [style*='display:flex'],[id='personalizar'] [style*='display: flex']{max-width:100%!important;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}[id='personalizar'] [style*='grid-template-columns']{grid-template-columns:1fr!important}[data-hoodie]{max-width:min(92vw,420px)!important;margin-left:auto!important;margin-right:auto!important}.pew1-admin-shell{left:0;right:0;width:100vw;border-left:0}.pew1-admin-tabs{grid-template-columns:repeat(2,1fr)}}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function ensureFileInput() {
    if (document.querySelector("[data-pew1-fallback-file]")) return;
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.setAttribute("data-pew1-fallback-file", "");
    input.style.display = "none";
    input.addEventListener("change", function () {
      var file = input.files && input.files[0];
      if (!file || !imgTarget) return;
      var reader = new FileReader();
      reader.onload = function () {
        imgTarget.setAttribute("src", reader.result);
        overrides.img[imgKey] = reader.result;
        saveDraft("Imagen editada");
      };
      reader.readAsDataURL(file);
    });
    document.body.appendChild(input);
  }

  function openLogin() {
    if (active || document.querySelector("[data-pew1-fallback-login]")) return;
    css();
    var panel = document.createElement("div");
    panel.className = "pew1-admin-shell";
    panel.setAttribute("data-pew1-fallback-admin", "");
    panel.setAttribute("data-pew1-fallback-login", "");
    panel.style.cssText = "top:18px;right:18px;height:auto;max-width:420px;border-radius:18px;overflow:hidden";
    panel.innerHTML = '<div class="pew1-admin-head"><div class="pew1-admin-top"><div><h2 class="pew1-admin-title">Admin PEW1</h2><p class="pew1-admin-sub">Ingresa la clave para editar la landing.</p></div><button class="pew1-admin-close" data-pew1-fallback-close>x</button></div><input class="pew1-fb-input" type="password" placeholder="Clave" data-pew1-fallback-pass><div class="pew1-admin-actions"><button class="pew1-fb-btn primary" data-pew1-fallback-enter>Entrar</button></div><p class="pew1-admin-muted" data-pew1-fallback-error style="display:none;color:#ff8a80">Clave incorrecta.</p></div>';
    document.body.appendChild(panel);
    var pass = panel.querySelector("[data-pew1-fallback-pass]");
    var enter = function () {
      if (pass.value === PASS) {
        panel.remove();
        enterAdmin();
      } else {
        panel.querySelector("[data-pew1-fallback-error]").style.display = "block";
      }
    };
    panel.querySelector("[data-pew1-fallback-enter]").addEventListener("click", enter);
    panel.querySelector("[data-pew1-fallback-close]").addEventListener("click", function () { panel.remove(); });
    pass.addEventListener("keydown", function (event) { if (event.key === "Enter") enter(); });
    pass.focus();
  }

  function renderAdminShell() {
    document.querySelectorAll("[data-pew1-admin-shell]").forEach(function (el) { el.remove(); });
    css();
    ensureOrder();
    var shell = document.createElement("aside");
    shell.className = "pew1-admin-shell";
    shell.setAttribute("data-pew1-fallback-admin", "");
    shell.setAttribute("data-pew1-admin-shell", "");
    shell.innerHTML =
      '<div class="pew1-admin-head">' +
        '<div class="pew1-admin-top"><div><h2 class="pew1-admin-title">Admin PEW1</h2><p class="pew1-admin-sub">Edita contenido, orden, links y publicación.</p></div><button class="pew1-admin-close" data-admin-exit>x</button></div>' +
        '<div class="pew1-admin-tabs">' + tabButton("editar", "Editar") + tabButton("secciones", "Secciones") + tabButton("links", "Links") + tabButton("publicar", "Publicar") + '</div>' +
        '<div class="pew1-admin-status" data-admin-status></div>' +
      '</div>' +
      '<div class="pew1-admin-body" data-admin-body></div>';
    document.body.appendChild(shell);
    shell.querySelectorAll("[data-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeTab = btn.getAttribute("data-tab");
        renderAdminShell();
      });
    });
    shell.querySelector("[data-admin-exit]").addEventListener("click", exitAdmin);
    renderActiveTab();
    updateStatus();
  }

  function tabButton(key, label) {
    return '<button class="pew1-admin-tab ' + (activeTab === key ? "active" : "") + '" data-tab="' + key + '">' + label + '</button>';
  }

  function renderActiveTab() {
    var body = document.querySelector("[data-admin-body]");
    if (!body) return;
    if (activeTab === "editar") body.innerHTML = renderEditTab();
    if (activeTab === "secciones") body.innerHTML = renderSectionsTab();
    if (activeTab === "links") body.innerHTML = renderLinksTab();
    if (activeTab === "publicar") body.innerHTML = renderPublishTab();
    bindAdminBody(body);
  }

  function renderEditTab() {
    var count = editableTextEls().length;
    return '<div class="pew1-admin-card"><h3>Edición directa</h3><p class="pew1-admin-muted">Activa edición y toca cualquier texto. Los links y botones se resaltan en azul; al tocar un link se abre su campo exacto.</p><div class="pew1-admin-actions"><button class="pew1-fb-btn primary" data-toggle-edit>' + (editing ? "Detener edición" : "Editar página") + '</button><button class="pew1-fb-btn" data-preview-toggle>' + (previewMode === "mobile" ? "Vista desktop" : "Vista móvil") + '</button></div><p class="pew1-admin-muted" data-editable-count>' + count + ' textos detectados.</p></div>' +
      '<div class="pew1-admin-card"><h3>Guía rápida</h3><p class="pew1-admin-muted">Texto: toca y escribe. Imagen: toca la imagen. Link/botón: toca el borde azul o entra a la pestaña Links.</p></div>';
  }

  function renderSectionsTab() {
    ensureOrder();
    var rows = getSections().map(function (sec, index) {
      var key = sectionKey(sec);
      var hidden = overrides.hidden && overrides.hidden[key];
      var compact = overrides.compact && overrides.compact[key];
      return '<div class="pew1-section-row" data-section-row="' + escapeAttr(key) + '">' +
        '<div class="pew1-section-main"><div><div class="pew1-section-name">' + (index + 1) + '. ' + escapeHtml(sectionLabel(sec)) + '</div><div class="pew1-section-summary">' + escapeHtml(sectionSummary(sec)) + '</div></div><button class="pew1-fb-btn pew1-mini" data-highlight-section="' + escapeAttr(key) + '">Ver</button></div>' +
        '<div class="pew1-section-actions">' +
          '<button class="pew1-fb-btn pew1-mini" data-move-section="' + escapeAttr(key) + '" data-dir="-1">Subir</button>' +
          '<button class="pew1-fb-btn pew1-mini" data-move-section="' + escapeAttr(key) + '" data-dir="1">Bajar</button>' +
          '<button class="pew1-fb-btn pew1-mini" data-toggle-sec="' + escapeAttr(key) + '">' + (hidden ? "Mostrar" : "Ocultar") + '</button>' +
          '<button class="pew1-fb-btn pew1-mini" data-compact-sec="' + escapeAttr(key) + '">' + (compact ? "Espacio normal" : "Compactar") + '</button>' +
          '<button class="pew1-fb-btn pew1-mini" data-add-after="' + escapeAttr(key) + '">Agregar debajo</button>' +
          '<button class="pew1-fb-btn pew1-mini" data-dup-sec="' + escapeAttr(key) + '">Duplicar</button>' +
          '<button class="pew1-fb-btn pew1-mini danger" data-del-sec="' + escapeAttr(key) + '">Quitar</button>' +
        '</div></div>';
    }).join("");
    return '<div class="pew1-admin-card"><h3>Orden y espacios</h3><p class="pew1-admin-muted">Sube/baja secciones, compacta espacios grandes o agrega un bloque de texto entre secciones.</p></div>' + rows;
  }

  function renderLinksTab() {
    var items = getActionItems();
    if (!items.length) return '<div class="pew1-admin-card"><h3>Links y botones</h3><p class="pew1-admin-muted">No encontré links editables.</p></div>';
    return '<div class="pew1-admin-card"><h3>Links y botones</h3><p class="pew1-admin-muted">Cada fila muestra sección, texto visible y destino. Usa "Ver" para resaltar el elemento exacto.</p></div>' + items.map(function (item) {
      return '<div class="pew1-link-row" data-link-row="' + escapeAttr(item.key) + '"><div class="pew1-link-main"><div><div class="pew1-link-name">' + escapeHtml(item.type + ': ' + item.text) + '</div><div class="pew1-link-meta">' + escapeHtml(item.section) + '</div></div><button class="pew1-fb-btn pew1-mini" data-highlight-path="' + escapeAttr(item.key) + '">Ver</button></div>' +
        (item.href !== null ? '<label class="pew1-admin-row"><span class="pew1-admin-label">Destino</span><input class="pew1-fb-input" data-link-key="' + escapeAttr(item.key) + '" value="' + escapeAttr(item.href) + '"></label>' : '<p class="pew1-admin-muted">Botón sin URL directa. Edita el texto desde "Editar página".</p>') +
      '</div>';
    }).join("");
  }

  function renderPublishTab() {
    var cfg = adminConfig();
    return '<div class="pew1-admin-card"><h3>Publicar</h3><p class="pew1-admin-muted">Publica el borrador en GitHub Pages usando Contents API.</p><div class="pew1-admin-actions"><button class="pew1-fb-btn primary" data-publish>Publicar cambios</button><button class="pew1-fb-btn" data-export>Exportar JSON</button><button class="pew1-fb-btn danger" data-discard>Descartar borrador</button></div></div>' +
      '<div class="pew1-admin-card"><h3>Config GitHub</h3>' +
      configInput("owner", "Owner", cfg.owner) +
      configInput("repo", "Repo", cfg.repo) +
      configInput("branch", "Branch", cfg.branch) +
      configInput("path", "Archivo", cfg.path) +
      configInput("token", "GitHub token", cfg.token, "password") +
      '<div class="pew1-admin-actions"><button class="pew1-fb-btn primary" data-save-config>Guardar config</button></div><p class="pew1-admin-muted">El token queda solo en este navegador. Recomendado: repo PEW1-2.0-WEB, archivo pew1-content.json.</p></div>';
  }

  function bindAdminBody(body) {
    var btn;
    btn = body.querySelector("[data-toggle-edit]");
    if (btn) btn.addEventListener("click", function () {
      editing = !editing;
      if (editing) armEditing(); else disarmEditing();
      renderAdminShell();
    });
    btn = body.querySelector("[data-preview-toggle]");
    if (btn) btn.addEventListener("click", togglePreview);
    body.querySelectorAll("[data-move-section]").forEach(function (el) {
      el.addEventListener("click", function () { moveSection(el.getAttribute("data-move-section"), Number(el.getAttribute("data-dir"))); });
    });
    body.querySelectorAll("[data-toggle-sec]").forEach(function (el) {
      el.addEventListener("click", function () { toggleSection(el.getAttribute("data-toggle-sec")); });
    });
    body.querySelectorAll("[data-compact-sec]").forEach(function (el) {
      el.addEventListener("click", function () { toggleCompact(el.getAttribute("data-compact-sec")); });
    });
    body.querySelectorAll("[data-add-after]").forEach(function (el) {
      el.addEventListener("click", function () { addTextBlock(el.getAttribute("data-add-after")); });
    });
    body.querySelectorAll("[data-dup-sec]").forEach(function (el) {
      el.addEventListener("click", function () { duplicateSection(el.getAttribute("data-dup-sec")); });
    });
    body.querySelectorAll("[data-del-sec]").forEach(function (el) {
      el.addEventListener("click", function () { removeSection(el.getAttribute("data-del-sec")); });
    });
    body.querySelectorAll("[data-highlight-section]").forEach(function (el) {
      el.addEventListener("click", function () {
        highlightEl(document.querySelector('[data-edsec="' + cssEscape(el.getAttribute("data-highlight-section")) + '"]'));
      });
    });
    body.querySelectorAll("[data-highlight-path]").forEach(function (el) {
      el.addEventListener("click", function () { highlightEl(elByPath(el.getAttribute("data-highlight-path"))); });
    });
    body.querySelectorAll("[data-link-key]").forEach(function (input) {
      input.addEventListener("focus", function () { highlightEl(elByPath(input.getAttribute("data-link-key"))); });
      input.addEventListener("input", function () {
        overrides.links[input.getAttribute("data-link-key")] = input.value.trim();
        applyOverrides();
        saveDraft("Link editado");
      });
    });
    btn = body.querySelector("[data-save-config]");
    if (btn) btn.addEventListener("click", saveConfigFromPanel);
    btn = body.querySelector("[data-publish]");
    if (btn) btn.addEventListener("click", publishAuto);
    btn = body.querySelector("[data-export]");
    if (btn) btn.addEventListener("click", exportJson);
    btn = body.querySelector("[data-discard]");
    if (btn) btn.addEventListener("click", discardDraft);
  }

  function getActionItems() {
    var els = Array.prototype.slice.call(root().querySelectorAll("a[href],button")).filter(function (el) { return !skip(el); });
    return els.map(function (el) {
      var key = pathKey(el);
      var sec = el.closest("[data-edsec]");
      return {
        key: key,
        type: el.tagName === "A" ? "Link" : "Botón",
        text: ((el.innerText || el.textContent || el.getAttribute("aria-label") || "Sin texto").trim().replace(/\s+/g, " ").slice(0, 70)),
        section: sectionLabel(sec),
        href: el.tagName === "A" ? (el.getAttribute("href") || "") : null
      };
    });
  }

  function focusLinkInput(key) {
    setTimeout(function () {
      var input = document.querySelector('[data-link-key="' + cssEscape(key) + '"]');
      if (input) {
        input.focus();
        input.scrollIntoView({ block: "center" });
      }
    }, 80);
  }

  function moveSection(key, dir) {
    ensureOrder();
    var i = overrides.order.indexOf(key);
    var j = i + dir;
    if (i < 0 || j < 0 || j >= overrides.order.length) return;
    var tmp = overrides.order[i];
    overrides.order[i] = overrides.order[j];
    overrides.order[j] = tmp;
    applyOverrides();
    saveDraft("Orden de secciones actualizado");
    renderAdminShell();
  }

  function toggleSection(key) {
    overrides.hidden[key] = !overrides.hidden[key];
    applyOverrides();
    saveDraft(overrides.hidden[key] ? "Sección oculta" : "Sección visible");
    renderAdminShell();
  }

  function toggleCompact(key) {
    overrides.compact[key] = !overrides.compact[key];
    applyOverrides();
    saveDraft(overrides.compact[key] ? "Espacio compactado" : "Espacio normal");
    renderAdminShell();
  }

  function duplicateSection(key) {
    var sec = document.querySelector('[data-edsec="' + cssEscape(key) + '"]');
    if (!sec) return;
    var clone = sec.cloneNode(true);
    var id = Date.now().toString(36);
    var label = sectionLabel(sec) + " copia";
    clone.setAttribute("data-pew1-added-section", id);
    clone.setAttribute("data-edsec", "added-" + id);
    clone.setAttribute("data-edlabel", label);
    sec.parentNode.insertBefore(clone, sec.nextSibling);
    overrides.added.push({ id: id, after: key, label: label, html: clone.outerHTML });
    ensureOrder();
    var at = overrides.order.indexOf(key);
    overrides.order.splice(at + 1, 0, "added-" + id);
    saveDraft("Sección duplicada");
    renderAdminShell();
  }

  function addTextBlock(afterKey) {
    var after = document.querySelector('[data-edsec="' + cssEscape(afterKey) + '"]');
    var id = Date.now().toString(36);
    var html = '<section data-edsec="added-' + id + '" data-edlabel="Bloque editable" data-pew1-added-section="' + id + '" style="position:relative;padding:clamp(32px,7vw,80px) clamp(18px,5vw,72px);background:#F5F4F0;color:#111;border-top:1px solid rgba(255,122,0,.45);border-bottom:1px solid rgba(255,122,0,.45);"><div style="max-width:980px;margin:0 auto;display:grid;gap:16px;text-align:center;"><p style="margin:0;color:#FF7A00;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">Nuevo bloque</p><h2 style="margin:0;font:900 clamp(34px,8vw,82px)/.96 Montserrat,system-ui,sans-serif;letter-spacing:.02em;">Título editable</h2><p style="margin:0 auto;max-width:680px;color:#555;font-size:clamp(17px,2.2vw,24px);line-height:1.45;">Escribe aquí un mensaje entre secciones, una oferta, una aclaración del proceso o un llamado a la acción.</p><a href="#personalizar" style="display:inline-flex;justify-content:center;align-items:center;justify-self:center;min-height:52px;padding:0 24px;border-radius:999px;background:#FF7A00;color:#111;font-weight:900;text-transform:uppercase;letter-spacing:.08em;">Editar link</a></div></section>';
    var holder = document.createElement("div");
    holder.innerHTML = html;
    var node = holder.firstElementChild;
    if (after && after.parentNode) after.parentNode.insertBefore(node, after.nextSibling);
    else if (root()) root().appendChild(node);
    overrides.added.push({ id: id, after: afterKey, label: "Bloque editable", html: html });
    ensureOrder();
    var at = overrides.order.indexOf(afterKey);
    overrides.order.splice(at + 1, 0, "added-" + id);
    saveDraft("Bloque agregado");
    activeTab = "editar";
    editing = true;
    applyOverrides();
    renderAdminShell();
    armEditing();
    highlightEl(node);
  }

  function removeSection(key) {
    if (!window.confirm("¿Quitar esta sección del borrador?")) return;
    var addedId = key.indexOf("added-") === 0 ? key.replace("added-", "") : "";
    if (addedId) {
      overrides.added = overrides.added.filter(function (item) { return item.id !== addedId; });
      var added = document.querySelector('[data-edsec="' + cssEscape(key) + '"]');
      if (added) added.remove();
      overrides.order = (overrides.order || []).filter(function (k) { return k !== key; });
    } else {
      overrides.hidden[key] = true;
      applyOverrides();
    }
    saveDraft("Sección quitada");
    renderAdminShell();
  }

  function discardDraft() {
    if (!window.confirm("¿Descartar todos los cambios locales sin publicar?")) return;
    try {
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem(STATUS_KEY);
    } catch (e) {}
    location.reload();
  }

  function saveConfigFromPanel() {
    var panel = document.querySelector("[data-admin-body]");
    var next = {};
    panel.querySelectorAll("[data-config-field]").forEach(function (input) {
      next[input.getAttribute("data-config-field")] = input.value.trim();
    });
    saveAdminConfig(next);
    updateStatus("Config guardada");
  }

  function configInput(name, label, value, type) {
    return '<label class="pew1-admin-row"><span>' + label + '</span><input class="pew1-fb-input" type="' + (type || "text") + '" data-config-field="' + name + '" value="' + escapeAttr(value || "") + '"></label>';
  }

  function exportJson() {
    var blob = new Blob([JSON.stringify(normalize(overrides), null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "pew1-content.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function publishAuto() {
    var cfg = adminConfig();
    if (!cfg.token) {
      activeTab = "publicar";
      renderAdminShell();
      alert("Falta configurar el token de GitHub para publicar automático.");
      return;
    }
    var data = JSON.stringify(normalize(overrides), null, 2);
    var api = "https://api.github.com/repos/" + encodeURIComponent(cfg.owner) + "/" + encodeURIComponent(cfg.repo) + "/contents/" + cfg.path.split("/").map(encodeURIComponent).join("/");
    var headers = {
      "Authorization": "Bearer " + cfg.token,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    updateStatus("Publicando...");
    fetch(api + "?ref=" + encodeURIComponent(cfg.branch), { headers: headers })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (current) {
        return fetch(api, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({
            message: "Actualizar contenido PEW1 desde admin",
            content: btoa(unescape(encodeURIComponent(data))),
            branch: cfg.branch,
            sha: current && current.sha
          })
        });
      })
      .then(function (res) {
        if (!res.ok) return res.text().then(function (text) { throw new Error(text || res.statusText); });
        try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
        setPublishedStatus();
        alert("Publicado correctamente. GitHub Pages se actualizará en unos minutos.");
      })
      .catch(function (err) {
        console.error("[PEW1 admin] publish failed", err);
        updateStatus("Error al publicar");
        alert("No se pudo publicar automático. Revisa token, repo y permisos.");
      });
  }

  function togglePreview() {
    previewMode = previewMode === "mobile" ? "desktop" : "mobile";
    document.body.classList.toggle("pew1-preview-mobile", previewMode === "mobile");
    renderAdminShell();
  }

  function updateEditableCount() {
    var el = document.querySelector("[data-editable-count]");
    if (el) el.textContent = editableTextEls().length + " textos detectados.";
  }

  function updateStatus(overrideText) {
    var el = document.querySelector("[data-admin-status]");
    if (!el) return;
    var st = readStatus();
    var hasDraft = false;
    try { hasDraft = !!localStorage.getItem(DRAFT_KEY); } catch (e) {}
    var state = st && st.state ? st.state : (hasDraft ? "draft" : "published");
    var label = overrideText || (state === "draft" ? "Borrador guardado" : "Publicado");
    var time = st && st.at ? new Date(st.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
    el.innerHTML = '<span><span class="pew1-admin-dot ' + state + '"></span>' + escapeHtml(label) + (time ? " · " + time : "") + '</span><span>Modo: ' + (editing ? "editando" : "vista") + ' · ' + previewMode + '</span>';
  }

  function showInspector(type, label, el) {
    var box = document.querySelector("[data-pew1-inspector]");
    if (!box) {
      box = document.createElement("div");
      box.className = "pew1-inspector";
      box.setAttribute("data-pew1-fallback-admin", "");
      box.setAttribute("data-pew1-inspector", "");
      document.body.appendChild(box);
    }
    box.innerHTML = '<strong>' + escapeHtml(type) + '</strong><br>' + escapeHtml(label);
    if (el) highlightEl(el, true);
  }

  function highlightEl(el, soft) {
    clearHighlights();
    if (!el) return;
    el.classList.add("pew1-highlight");
    if (!soft) el.scrollIntoView({ block: "center", behavior: "smooth" });
    setTimeout(clearHighlights, soft ? 1500 : 2600);
  }

  function clearHighlights() {
    document.querySelectorAll(".pew1-highlight").forEach(function (el) { el.classList.remove("pew1-highlight"); });
  }

  function enterAdmin() {
    active = true;
    try { sessionStorage.setItem("pew1_admin", "1"); } catch (e) {}
    document.querySelectorAll("[data-pew1-fallback-login]").forEach(function (el) { el.remove(); });
    css();
    ensureFileInput();
    applyOverrides();
    renderAdminShell();
  }

  function exitAdmin() {
    active = false;
    editing = false;
    try { sessionStorage.removeItem("pew1_admin"); } catch (e) {}
    disarmEditing();
    document.body.classList.remove("pew1-preview-mobile");
    document.querySelectorAll("[data-pew1-fallback-admin]").forEach(function (el) { el.remove(); });
  }

  function initAdmin() {
    css();
    loadPublished().then(function (published) {
      if (published) overrides = mergeOverrides(overrides, published);
      loadDraft();
      applyOverrides();
      ensureAdminMount();
    });
    ensureAdminMount();
    window.addEventListener("hashchange", function () {
      ensureAdminMount();
    });
    window.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "e") {
        event.preventDefault();
        if (active) return;
        openLogin();
      }
    });
    window.setInterval(ensureAdminMount, 700);
  }

  function wantsAdmin() {
    var hash = (location.hash || "").toLowerCase();
    var stored = false;
    try { stored = sessionStorage.getItem("pew1_admin") === "1"; } catch (e) {}
    return stored || hash === "#admin" || hash === "#editar";
  }

  function ensureAdminMount() {
    if (!document.body || !root() || !wantsAdmin()) return;
    css();
    if (active) {
      if (!document.querySelector("[data-pew1-admin-shell]")) renderAdminShell();
      return;
    }
    try {
      if (sessionStorage.getItem("pew1_admin") === "1") {
        enterAdmin();
        return;
      }
    } catch (e) {}
    if (!document.querySelector("[data-pew1-fallback-login]")) openLogin();
  }

  function initAerosolFallback() {
    ready(function () {
      if (window.PEW1Aerosol) return;
      var canvas = document.getElementById("pew1-fluid");
      if (!canvas) return;
      var ctx = canvas.getContext("2d");
      var pointer = { x: 0.5, y: 0.45 };
      var time = 0;

      function resize() {
        var ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * ratio);
        canvas.height = Math.floor(window.innerHeight * ratio);
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      function move(event) {
        var point = event.touches ? event.touches[0] : event;
        pointer.x = point.clientX / window.innerWidth;
        pointer.y = point.clientY / window.innerHeight;
      }

      function draw() {
        time += 0.008;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "rgba(5,6,10,0.18)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        var colors = ["rgba(255,122,0,.22)", "rgba(245,244,240,.10)", "rgba(10,15,46,.35)"];
        for (var i = 0; i < 28; i += 1) {
          var x = (Math.sin(time + i * 1.97) * 0.5 + 0.5) * window.innerWidth;
          var y = (Math.cos(time * 0.8 + i * 1.31) * 0.5 + 0.5) * window.innerHeight;
          x += (pointer.x * window.innerWidth - x) * 0.12;
          y += (pointer.y * window.innerHeight - y) * 0.12;
          var r = 70 + (i % 6) * 34;
          var g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, colors[i % colors.length]);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        window.requestAnimationFrame(draw);
      }

      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", move);
      window.addEventListener("touchmove", move, { passive: true });
      resize();
      draw();
    });
  }

  function cssEscape(value) {
    if (window.CSS && window.CSS.escape) return window.CSS.escape(String(value));
    return String(value).replace(/["\\]/g, "\\$&");
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  ready(initAdmin);
  initAerosolFallback();
})();
