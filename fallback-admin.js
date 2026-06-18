(function () {
  "use strict";

  var PASS = "pew1-arte";
  var DRAFT_KEY = "pew1_admin_draft";
  var CONFIG_KEY = "pew1_admin_publish_config";
  var active = false;
  var editing = false;
  var overrides = { text: {}, img: {}, hidden: {}, links: {}, added: [] };
  var imgTarget = null;
  var imgKey = "";

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
      added: Array.isArray(data.added) ? data.added : []
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
      added: extra.added.length ? extra.added : base.added
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

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(overrides));
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
    key.split(".").forEach(function (part) {
      if (node) node = node.children[Number(part)];
    });
    return node;
  }

  function skip(el) {
    return !!(
      el.closest("[data-no-edit]") ||
      el.closest("[data-cot-ancho-val],[data-cot-alto-val],[data-cot-area],[data-cot-price]") ||
      el.closest("[data-pew1-fallback-admin]")
    );
  }

  function adminConfig() {
    var defaults = {
      owner: "pew1sark",
      repo: "SARKPEW1",
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

  function editableTextEls() {
    var r = root();
    if (!r) return [];
    var out = [];
    r.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,button,li,strong,em").forEach(function (el) {
      if (skip(el)) return;
      var hasText = false;
      el.childNodes.forEach(function (n) {
        if (n.nodeType === 3 && n.textContent.trim()) hasText = true;
      });
      if (hasText) out.push(el);
    });
    return out;
  }

  function applyOverrides() {
    applyAddedSections();
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
    document.querySelectorAll("[data-edsec]").forEach(function (sec) {
      var key = sec.getAttribute("data-edsec");
      sec.style.display = overrides.hidden && overrides.hidden[key] ? "none" : "";
    });
  }

  function applyAddedSections() {
    var list = overrides.added || [];
    list.forEach(function (item) {
      if (!item || !item.id || !item.html || document.querySelector('[data-pew1-added-section="' + item.id + '"]')) return;
      var holder = document.createElement("div");
      holder.innerHTML = item.html;
      var node = holder.firstElementChild;
      if (!node) return;
      node.setAttribute("data-pew1-added-section", item.id);
      node.setAttribute("data-edsec", "added-" + item.id);
      node.setAttribute("data-edlabel", item.label || "Sección agregada");
      var after = document.querySelector('[data-edsec="' + item.after + '"]');
      if (after && after.parentNode) after.parentNode.insertBefore(node, after.nextSibling);
      else if (root()) root().appendChild(node);
    });
  }

  function armEditing() {
    var textEls = editableTextEls();
    if (!textEls.length && root()) {
      textEls = Array.prototype.slice.call(root().querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,button,li,strong,em")).filter(function (el) {
        return !skip(el) && (el.innerText || el.textContent || "").trim().length > 0;
      });
    }
    textEls.forEach(function (el) {
      el.setAttribute("contenteditable", "true");
      el.style.outline = "1px dashed rgba(255,122,0,0.85)";
      el.style.outlineOffset = "3px";
      el.style.cursor = "text";
      if (!el.__pew1FallbackTextBound) {
        el.__pew1FallbackTextBound = true;
        el.addEventListener("input", function () {
          overrides.text[pathKey(el)] = el.innerHTML;
          saveDraft();
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
          document.querySelector("[data-pew1-fallback-file]").click();
        }, true);
      }
    });
    root().querySelectorAll("a[href]").forEach(function (link) {
      if (skip(link)) return;
      link.style.boxShadow = "0 0 0 2px rgba(58,164,255,0.55)";
      if (!link.__pew1FallbackLinkBound) {
        link.__pew1FallbackLinkBound = true;
        link.addEventListener("click", function (event) {
          if (!editing) return;
          event.preventDefault();
          event.stopPropagation();
        }, true);
      }
    });
  }

  function disarmEditing() {
    var r = root();
    if (!r) return;
    r.querySelectorAll("[contenteditable]").forEach(function (el) {
      el.removeAttribute("contenteditable");
      el.style.outline = "";
      el.style.outlineOffset = "";
      el.style.cursor = "";
    });
    r.querySelectorAll("img").forEach(function (img) {
      img.style.outline = "";
      img.style.outlineOffset = "";
      img.style.cursor = "";
    });
    r.querySelectorAll("a[href]").forEach(function (link) {
      link.style.boxShadow = "";
    });
  }

  function css() {
    if (document.getElementById("pew1-fallback-admin-css")) return;
    var style = document.createElement("style");
    style.id = "pew1-fallback-admin-css";
    style.textContent = [
      "[data-pew1-fallback-admin]{position:fixed;z-index:999999;font-family:Montserrat,system-ui,sans-serif;color:#F5F4F0}",
      ".pew1-fb-panel{right:18px;top:18px;width:min(420px,calc(100vw - 36px));padding:18px;border-radius:22px;background:rgba(5,6,10,.82);border:1px solid rgba(255,255,255,.16);box-shadow:0 24px 80px rgba(0,0,0,.55);backdrop-filter:blur(16px)}",
      ".pew1-fb-panel h2{margin:0 0 8px;font:900 24px/1 Montserrat,system-ui,sans-serif}",
      ".pew1-fb-panel p{margin:0 0 14px;color:#9A9A95;font-size:13px;line-height:1.45}",
      ".pew1-fb-panel input{width:100%;height:44px;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#fff;padding:0 12px}",
      ".pew1-fb-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}",
      ".pew1-fb-btn{min-height:40px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#F5F4F0;padding:0 14px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;font-size:11px}",
      ".pew1-fb-btn.primary{background:#FF7A00;border-color:#FF7A00;color:#0A0F2E}",
      ".pew1-fb-bar{left:50%;bottom:18px;transform:translateX(-50%);display:flex;align-items:center;gap:8px;max-width:calc(100vw - 30px);padding:8px;border-radius:999px;background:rgba(5,6,10,.78);border:1px solid rgba(255,255,255,.16);box-shadow:0 20px 70px rgba(0,0,0,.5);backdrop-filter:blur(16px)}",
      ".pew1-fb-sections,.pew1-fb-links,.pew1-fb-config{right:18px;bottom:82px;width:min(520px,calc(100vw - 36px));max-height:70vh;overflow:auto;padding:14px;border-radius:20px;background:rgba(5,6,10,.90);border:1px solid rgba(255,255,255,.16);box-shadow:0 20px 70px rgba(0,0,0,.5);backdrop-filter:blur(16px)}",
      ".pew1-fb-section-row,.pew1-fb-link-row,.pew1-fb-config-row{display:grid;gap:8px;padding:10px;border-radius:14px;background:rgba(255,255,255,.05);margin-bottom:8px;font-size:13px}",
      ".pew1-fb-section-row{grid-template-columns:minmax(0,1fr) auto;align-items:center}",
      ".pew1-fb-section-row span,.pew1-fb-link-row span{min-width:0;overflow:hidden;text-overflow:ellipsis}",
      ".pew1-fb-mini-actions{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}",
      ".pew1-fb-input{width:100%;min-height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#fff;padding:8px 10px;font:500 13px/1.3 Montserrat,system-ui,sans-serif}",
      ".pew1-fb-status{margin:10px 0 0;color:#9A9A95;font-size:12px;line-height:1.45}",
      "html,body{max-width:100%;overflow-x:hidden!important}",
      "@media(max-width:700px){[data-content-root]{max-width:100vw!important;overflow:hidden!important}[data-content-root] *{min-width:0!important;max-width:100vw;overflow-wrap:anywhere}[data-content-root] [style*='white-space:nowrap'],[data-content-root] [style*='white-space: nowrap']{white-space:normal!important}[data-content-root] [style*='letter-spacing']{letter-spacing:.08em}[data-content-root] section,[data-content-root] [data-edsec]{width:100%!important;max-width:100vw!important;margin-left:0!important;margin-right:0!important}[id='personalizar'],[data-edsec='personalizar']{padding-left:clamp(14px,4vw,22px)!important;padding-right:clamp(14px,4vw,22px)!important;overflow:hidden!important}[id='personalizar'] p,[id='personalizar'] h1,[id='personalizar'] h2,[id='personalizar'] h3,[id='personalizar'] span{max-width:100%!important}[id='personalizar'] [style*='display:flex'],[id='personalizar'] [style*='display: flex']{max-width:100%!important;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}[id='personalizar'] [style*='grid-template-columns']{grid-template-columns:1fr!important}[data-hoodie]{max-width:min(92vw,420px)!important;margin-left:auto!important;margin-right:auto!important}.pew1-fb-bar{left:10px;right:10px;bottom:10px;transform:none;overflow:auto;justify-content:flex-start;border-radius:18px}.pew1-fb-btn{white-space:nowrap}.pew1-fb-sections,.pew1-fb-links,.pew1-fb-config,.pew1-fb-panel{left:10px!important;right:10px!important;top:auto!important;bottom:78px!important;width:auto!important;max-height:68vh}.pew1-fb-section-row{grid-template-columns:1fr}.pew1-fb-mini-actions{justify-content:flex-start}}"
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
        saveDraft();
      };
      reader.readAsDataURL(file);
    });
    document.body.appendChild(input);
  }

  function openLogin() {
    if (active || document.querySelector("[data-pew1-fallback-login]")) return;
    css();
    var panel = document.createElement("div");
    panel.className = "pew1-fb-panel";
    panel.setAttribute("data-pew1-fallback-admin", "");
    panel.setAttribute("data-pew1-fallback-login", "");
    panel.innerHTML = '<h2>Admin PEW1</h2><p>Ingresa la clave para editar textos, imagenes, links y secciones de la landing.</p><input type="password" placeholder="Clave" data-pew1-fallback-pass><div class="pew1-fb-actions"><button class="pew1-fb-btn primary" data-pew1-fallback-enter>Entrar</button><button class="pew1-fb-btn" data-pew1-fallback-close>Cerrar</button></div><p data-pew1-fallback-error style="display:none;color:#ff8a80;margin-top:10px">Clave incorrecta.</p>';
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

  function renderBar() {
    document.querySelectorAll("[data-pew1-fallback-bar],[data-pew1-fallback-sections],[data-pew1-fallback-links],[data-pew1-fallback-config]").forEach(function (el) {
      el.remove();
    });

    var bar = document.createElement("div");
    bar.className = "pew1-fb-bar";
    bar.setAttribute("data-pew1-fallback-admin", "");
    bar.setAttribute("data-pew1-fallback-bar", "");
    bar.innerHTML = '<button class="pew1-fb-btn primary" data-pew1-fallback-edit>Editar</button><button class="pew1-fb-btn" data-pew1-fallback-links-btn>Links</button><button class="pew1-fb-btn" data-pew1-fallback-sections-btn>Secciones</button><button class="pew1-fb-btn primary" data-pew1-fallback-publish>Publicar</button><button class="pew1-fb-btn" data-pew1-fallback-config>Config</button><button class="pew1-fb-btn" data-pew1-fallback-export>Exportar</button><button class="pew1-fb-btn" data-pew1-fallback-discard>Descartar</button><button class="pew1-fb-btn" data-pew1-fallback-exit>Salir</button>';
    document.body.appendChild(bar);

    bar.querySelector("[data-pew1-fallback-edit]").addEventListener("click", function () {
      editing = !editing;
      bar.querySelector("[data-pew1-fallback-edit]").textContent = editing ? "Editando..." : "Editar";
      if (editing) {
        try {
          armEditing();
        } catch (error) {
          console.error("[PEW1 admin] No se pudo activar edicion", error);
        }
      } else {
        disarmEditing();
      }
    });
    bar.querySelector("[data-pew1-fallback-links-btn]").addEventListener("click", toggleLinksPanel);
    bar.querySelector("[data-pew1-fallback-sections-btn]").addEventListener("click", toggleSectionsPanel);
    bar.querySelector("[data-pew1-fallback-publish]").addEventListener("click", publishAuto);
    bar.querySelector("[data-pew1-fallback-config]").addEventListener("click", toggleConfigPanel);
    bar.querySelector("[data-pew1-fallback-export]").addEventListener("click", exportJson);
    bar.querySelector("[data-pew1-fallback-discard]").addEventListener("click", function () {
      if (!confirm("Descartar cambios locales?")) return;
      localStorage.removeItem(DRAFT_KEY);
      location.reload();
    });
    bar.querySelector("[data-pew1-fallback-exit]").addEventListener("click", function () {
      active = false;
      editing = false;
      sessionStorage.removeItem("pew1_admin");
      disarmEditing();
      document.querySelectorAll("[data-pew1-fallback-admin]").forEach(function (el) { el.remove(); });
    });
  }

  function toggleSectionsPanel() {
    closeFloatingPanels("[data-pew1-fallback-sections]");
    var old = document.querySelector("[data-pew1-fallback-sections]");
    if (old) {
      old.remove();
      return;
    }
    var panel = document.createElement("div");
    panel.className = "pew1-fb-sections";
    panel.setAttribute("data-pew1-fallback-admin", "");
    panel.setAttribute("data-pew1-fallback-sections", "");
    var html = "<h2 style=\"font-size:18px;margin:0 0 12px\">Secciones</h2>";
    document.querySelectorAll("[data-edsec]").forEach(function (sec) {
      var key = sec.getAttribute("data-edsec");
      var label = sec.getAttribute("data-edlabel") || key;
      var hidden = overrides.hidden && overrides.hidden[key];
      html += '<div class="pew1-fb-section-row"><span>' + escapeHtml(label) + '</span><div class="pew1-fb-mini-actions"><button class="pew1-fb-btn" data-pew1-toggle-sec="' + escapeAttr(key) + '">' + (hidden ? "Mostrar" : "Ocultar") + '</button><button class="pew1-fb-btn" data-pew1-dup-sec="' + escapeAttr(key) + '">Duplicar</button><button class="pew1-fb-btn" data-pew1-del-sec="' + escapeAttr(key) + '">Quitar</button></div></div>';
    });
    panel.innerHTML = html;
    document.body.appendChild(panel);
    panel.querySelectorAll("[data-pew1-toggle-sec]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-pew1-toggle-sec");
        overrides.hidden[key] = !overrides.hidden[key];
        saveDraft();
        applyOverrides();
        panel.remove();
        toggleSectionsPanel();
      });
    });
    panel.querySelectorAll("[data-pew1-dup-sec]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        duplicateSection(btn.getAttribute("data-pew1-dup-sec"));
        panel.remove();
        toggleSectionsPanel();
      });
    });
    panel.querySelectorAll("[data-pew1-del-sec]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeSection(btn.getAttribute("data-pew1-del-sec"));
        panel.remove();
        toggleSectionsPanel();
      });
    });
  }

  function closeFloatingPanels(except) {
    ["[data-pew1-fallback-sections]", "[data-pew1-fallback-links]", "[data-pew1-fallback-config]"].forEach(function (sel) {
      if (sel !== except) document.querySelectorAll(sel).forEach(function (el) { el.remove(); });
    });
  }

  function duplicateSection(key) {
    var sec = document.querySelector('[data-edsec="' + key + '"]');
    if (!sec) return;
    var clone = sec.cloneNode(true);
    var id = Date.now().toString(36);
    var label = (sec.getAttribute("data-edlabel") || key) + " copia";
    clone.setAttribute("data-pew1-added-section", id);
    clone.setAttribute("data-edsec", "added-" + id);
    clone.setAttribute("data-edlabel", label);
    sec.parentNode.insertBefore(clone, sec.nextSibling);
    overrides.added = overrides.added || [];
    overrides.added.push({ id: id, after: key, label: label, html: clone.outerHTML });
    saveDraft();
  }

  function removeSection(key) {
    var addedId = key.indexOf("added-") === 0 ? key.replace("added-", "") : "";
    if (addedId) {
      overrides.added = (overrides.added || []).filter(function (item) { return item.id !== addedId; });
      var added = document.querySelector('[data-edsec="' + key + '"]');
      if (added) added.remove();
    } else {
      overrides.hidden[key] = true;
      applyOverrides();
    }
    saveDraft();
  }

  function toggleLinksPanel() {
    closeFloatingPanels("[data-pew1-fallback-links]");
    var old = document.querySelector("[data-pew1-fallback-links]");
    if (old) { old.remove(); return; }
    var panel = document.createElement("div");
    panel.className = "pew1-fb-links";
    panel.setAttribute("data-pew1-fallback-admin", "");
    panel.setAttribute("data-pew1-fallback-links", "");
    var html = '<h2 style="font-size:18px;margin:0 0 12px">Links editables</h2>';
    var links = Array.prototype.slice.call(root().querySelectorAll("a[href]")).filter(function (a) { return !skip(a); });
    links.forEach(function (link) {
      var key = pathKey(link);
      var text = (link.innerText || link.textContent || "Link").trim().slice(0, 70);
      html += '<label class="pew1-fb-link-row"><span>' + escapeHtml(text) + '</span><input class="pew1-fb-input" data-pew1-link-key="' + escapeAttr(key) + '" value="' + escapeAttr(link.getAttribute("href") || "") + '"></label>';
    });
    panel.innerHTML = html + '<p class="pew1-fb-status">Edita el destino y se guarda como borrador. Luego usa Publicar.</p>';
    document.body.appendChild(panel);
    panel.querySelectorAll("[data-pew1-link-key]").forEach(function (input) {
      input.addEventListener("input", function () {
        var key = input.getAttribute("data-pew1-link-key");
        overrides.links[key] = input.value.trim();
        applyOverrides();
        saveDraft();
      });
    });
  }

  function toggleConfigPanel() {
    closeFloatingPanels("[data-pew1-fallback-config]");
    var old = document.querySelector("[data-pew1-fallback-config]");
    if (old) { old.remove(); return; }
    var cfg = adminConfig();
    var panel = document.createElement("div");
    panel.className = "pew1-fb-config";
    panel.setAttribute("data-pew1-fallback-admin", "");
    panel.setAttribute("data-pew1-fallback-config", "");
    panel.innerHTML = '<h2 style="font-size:18px;margin:0 0 12px">Publicación automática</h2>' +
      configInput("owner", "Owner", cfg.owner) +
      configInput("repo", "Repo", cfg.repo) +
      configInput("branch", "Branch", cfg.branch) +
      configInput("path", "Archivo", cfg.path) +
      configInput("token", "GitHub token", cfg.token, "password") +
      '<div class="pew1-fb-actions"><button class="pew1-fb-btn primary" data-pew1-save-config>Guardar config</button></div>' +
      '<p class="pew1-fb-status">Usa un token fine-grained con permiso Contents read/write para este repo. El token queda guardado solo en este navegador.</p>';
    document.body.appendChild(panel);
    panel.querySelector("[data-pew1-save-config]").addEventListener("click", function () {
      var next = {};
      panel.querySelectorAll("[data-pew1-config-field]").forEach(function (input) {
        next[input.getAttribute("data-pew1-config-field")] = input.value.trim();
      });
      saveAdminConfig(next);
      alert("Configuración guardada.");
    });
  }

  function configInput(name, label, value, type) {
    return '<label class="pew1-fb-config-row"><span>' + label + '</span><input class="pew1-fb-input" type="' + (type || "text") + '" data-pew1-config-field="' + name + '" value="' + escapeAttr(value || "") + '"></label>';
  }

  function exportJson() {
    var blob = new Blob([JSON.stringify(overrides, null, 2)], { type: "application/json" });
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
      toggleConfigPanel();
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
    setPublishStatus("Publicando...");
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
        localStorage.removeItem(DRAFT_KEY);
        setPublishStatus("Publicado. GitHub Pages se actualizará en unos minutos.");
        alert("Publicado correctamente. GitHub Pages se actualizará en unos minutos.");
      })
      .catch(function (err) {
        console.error("[PEW1 admin] publish failed", err);
        setPublishStatus("No se pudo publicar. Revisa token, repo y permisos.");
        alert("No se pudo publicar automático. Puedes usar Exportar como respaldo.");
      });
  }

  function setPublishStatus(text) {
    var bar = document.querySelector("[data-pew1-fallback-bar]");
    if (!bar) return;
    var el = bar.querySelector("[data-pew1-publish-status]");
    if (!el) {
      el = document.createElement("span");
      el.setAttribute("data-pew1-publish-status", "");
      el.style.cssText = "color:#9A9A95;font-size:11px;white-space:nowrap;padding:0 8px";
      bar.appendChild(el);
    }
    el.textContent = text;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  function enterAdmin() {
    active = true;
    sessionStorage.setItem("pew1_admin", "1");
    document.querySelectorAll("[data-pew1-fallback-login]").forEach(function (el) { el.remove(); });
    css();
    ensureFileInput();
    applyOverrides();
    renderBar();
  }

  function initAdmin() {
    css();
    loadPublished().then(function (published) {
      if (published) overrides = mergeOverrides(overrides, published);
      loadDraft();
      applyOverrides();
    });
    if (sessionStorage.getItem("pew1_admin") === "1") enterAdmin();
    else if (location.hash.toLowerCase() === "#admin" || location.hash.toLowerCase() === "#editar") openLogin();
    window.addEventListener("hashchange", function () {
      if (location.hash.toLowerCase() === "#admin" || location.hash.toLowerCase() === "#editar") openLogin();
    });
    window.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "e") {
        event.preventDefault();
        if (active) return;
        openLogin();
      }
    });
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

  ready(initAdmin);
  initAerosolFallback();
})();
