# PEW1 — Landing (WEB 2.0)

Front visual de **sarkpew1.com** — Arte que transforma. Tipografía Archivo Black /
Montserrat, fondo graffiti aerosol interactivo, modo administrador y carrito Shopify.

Esta es la **versión nueva**. Si en Shopify quedó una versión antigua, reemplázala con
estos archivos.

## Archivos
- **index.html** — la web completa, en un solo archivo (todo embebido: fuentes, imágenes,
  scripts). Funciona tal cual, sin dependencias externas (salvo el iframe del personalizador
  y los enlaces a Shopify, que necesitan internet por diseño).
- **pew1-content.json** — contenido editable desde el modo administrador. Empieza vacío.
  Cuando edites la web y pulses **Publicar**, descargas un `pew1-content.json` nuevo: súbelo
  aquí (reemplazando este) y todos los visitantes verán tus cambios.

## Subir a GitHub (GitHub Pages)
1. Crea un repositorio (p. ej. `pew1-landing`).
2. Sube **index.html** y **pew1-content.json** a la raíz.
3. Settings → Pages → Source: `main` / carpeta raíz → Save.
4. Tu web queda en `https://TU-USUARIO.github.io/pew1-landing/`.

## Conectar tu dominio sarkpew1.com
- Apunta el dominio a GitHub Pages (Settings → Pages → Custom domain) **o** a otro hosting
  estático (Netlify / Vercel / Cloudflare Pages — arrastrar y soltar).
- Mueve la tienda Shopify a un subdominio (p. ej. `tienda.sarkpew1.com`) para que el dominio
  raíz muestre esta landing y Shopify siga intacto detrás.

## Modo administrador (solo tú)
- Entrar: añade `#admin` a la URL **o** pulsa `Ctrl + Shift + E` → clave.
- Editar: textos (clic y escribe), fotos (clic en la imagen), mostrar/ocultar secciones.
- **Publicar** descarga `pew1-content.json` → súbelo al repo para que sea público.
- Cambia la clave en el código fuente (`PEW1 Landing.dc.html`, variable `ADMIN_PASS`).

## Activar Shopify Storefront API (precio/stock/carrito en vivo)
En el código fuente, clase `Component`, cambia:
`SHOPIFY = { domain: 'sarkpew1.com', mode: 'storefront', token: 'TU_TOKEN' }`
El token Storefront (público, solo lectura + carrito) se crea en Shopify Admin → Apps →
Develop apps. Sin token, los botones usan enlaces directos (cero-riesgo).

---
**Nota:** `index.html` es un archivo compilado — no lo edites a mano. Los cambios de diseño
se hacen en el archivo fuente `PEW1 Landing.dc.html` y se recompila.
