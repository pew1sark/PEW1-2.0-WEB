/* PEW1 — ajustes globales del storefront (cargado via Shopify ScriptTag).
   1) Widget de divisa (app "bacurr"): venia fijo arriba a la derecha con
      z-index maximo y tapaba el menu movil del landing (iframe) y el
      carrito en desktop. Se reubica abajo a la izquierda. */
(function () {
  var css = [
    ".bacurr-cur-block{top:auto!important;bottom:18px!important;right:auto!important;left:14px!important}",
    "@media(max-width:760px){.bacurr-cur-block{bottom:14px!important;left:12px!important}}"
  ].join("\n");
  var s = document.createElement("style");
  s.id = "pew1-fixes";
  s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
})();
