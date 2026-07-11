# Animal Interior — Serie 2026 · Plan de implementación

**Fecha:** 2026-07-11 · **Rama:** `feature/animal-interior-series` (construye sobre `obras-gallery`)
**Estado:** PLAN — pendiente de aprobación antes de programar.

---

## 1. Arquitectura detectada (auditoría)

| Componente | Realidad encontrada |
|---|---|
| Landing `home.sarkpew1.com` | GitHub Pages sirviendo `main` (raíz) de este repo. **No hay framework**: `index.html` es un bundle de un solo archivo (~5.4MB) — el HTML real vive en un bloque `__bundler/template` (JSON string) que se reconstruye en runtime vía `documentElement.replaceWith`. No hay Vite/React/rutas/`src/`. |
| Estilos | Inline styles + Montserrat/Archivo Black/Anton. Identidad oscura (#0A0F2E, naranja #FF7A00, tarjetas glass). |
| Tienda `sarkpew1.com` | Shopify plan Basic, CLP, sin Shopify Payments (pasarela local). La home del tema carga el landing en un iframe → ya están sincronizados. |
| Carrito/checkout | Viven 100% en Shopify. El landing solo enlaza con `target="_parent"`. Personalizador = iframe aparte. **Nada de esto se toca.** |
| Sincronización ya operativa | (commit `444b03e`) La sección "Obras originales" del landing es un carrusel que lee en vivo `https://sarkpew1.com/collections/originals/products.json` (endpoint público, CORS `*`, sin token). |
| Colección | `ORIGINALES`, handle `originals`, gid `344606572641`, manual, 5 productos activos, orden BEST_SELLING. |
| Productos actuales | Títulos estilo `" Resguardo " - Original Paint`; type `Pintura Original`; vendor PEW1; tags sucios (`Painting`, `Paints`, `Prints`, `Sample Product`); body: "Acrylics on canvas", "130 x 100cm" (⚠️ Sagrado Prohibido: **150 x 125cm**), "Frame not included". Inventario 1 c/u. Precio $2.200.000 CLP. |
| Envíos | Delivery profile "Obras Originales" (envío por cotizar $0 + mensaje) ya configurado — no se toca. |
| Admin del landing | `#admin` clave + "Publicar en vivo" (GitHub Contents API). Los overrides de texto usan paths por índice DOM → el carrusel va marcado `data-no-edit`. |
| SEO/Analytics | Title/meta básicos. **No hay analytics instalado** → no se agrega plataforma nueva (regla del brief). |
| GitHub Pages deploy | Push directo a `main`; sin workflow. ⚠️ **Bloqueador vigente: la credencial git local es de solo lectura (push → 403).** |
| Catálogo PDF | Existe fuera del repo: `03_ARTE/Catalogo_2026/SARK_Catalogo_2026_ANIMAL_INTERIOR.pdf` (5.3MB, versión negra) + variante BLANCO. |

## 2. Decisión de arquitectura (divergencias razonadas vs. el brief)

El brief asume un frontend headless con Storefront API, metafields y `src/lib/shopify/`. **Ese stack no existe aquí** y crearlo desde cero rompería el admin/bundler actual. Se logra el mismo objetivo (Shopify = fuente única de verdad, cero duplicación manual) con piezas más simples y robustas:

| Brief pedía | Se implementa | Por qué |
|---|---|---|
| Storefront API + token + `src/lib/shopify/` | **Endpoint público `products.json`** (ya probado y en producción con el carrusel) | Sin secretos que gestionar ni exponer; CORS abierto; mismo dato de precio/stock/imágenes en tiempo real. |
| Metafields (`artwork_number`, `artwork_status`, …) | **Tags estructurados** en cada producto: `serie:animal-interior`, `n:1`…`n:5`, `estado:disponible|reservada|vendida` + body_html curatorial | `products.json` **no expone metafields**, sí expone tags y body. Editables desde el admin de Shopify sin código. Metafields quedan como upgrade futuro si se migra a Storefront API. |
| Metaobject `art_series` (total 8, completadas 5) | **Descripción de la colección** lleva el manifiesto + marcador `[total:8]`; completadas = conteo de productos publicados con `serie:animal-interior` | Editable en Shopify → el 5/8 y la barra de progreso se actualizan solos al publicar la obra VI. |
| Handle nuevo `animal-interior-2026` | **Se mantiene `originals`**; solo se retitula la colección a "Animal Interior — Serie 2026" | Cambiar el handle rompe los links del tema, del landing y de campañas existentes. El title sí cambia (es lo visible). |
| Página React `/animal-interior` | **`animal-interior/index.html` estático** en el repo (página independiente, ~60KB + catálogo PDF) servido por GitHub Pages en `home.sarkpew1.com/animal-interior/` | Una página autónoma no depende del bundler ni arriesga el index actual. |
| Página Shopify `/pages/animal-interior` | `pageCreate` vía API con iframe a la página del landing (mismo patrón que la home del tema) | Una sola implementación visual, dos URLs. |
| Galería fondo blanco | **Museo minimalista negro** (coherente con la identidad SARK y con el catálogo 2026 ya diseñado en negro) | El brief también exige "coherencia con la identidad de SARK"; ante el conflicto gana la identidad real. Variante blanca del catálogo disponible si se prefiere. |
| Analytics events | Se omite | No hay plataforma de analytics activa; el brief prohíbe agregar una nueva en ese caso. |
| Tests automatizados | Validaciones manuales + estados simulados (colección vacía, sin imagen, sold, placeholder) durante la verificación en navegador | No hay test runner en el repo; montar uno para una página estática es sobreingeniería. |

## 3. Modelo de datos (en Shopify, editable sin código)

**Colección `originals`** → title "Animal Interior — Serie 2026"; descripción = manifiesto ("El ser humano como puente…") + `[total:8]`.

**Cada obra** (producto):
- Título limpio: `Rugido`, `Persistencia`, `Sombras y Vuelo`, `Sagrado Prohibido`, `Resguardo` (se elimina `" … " - Original Paint`; el handle NO cambia → SEO y links intactos).
- Tags: `serie:animal-interior`, `n:<1-8>`, `estado:<disponible|reservada|vendida>` (+ se limpian `Sample Product`/`Prints`).
- Body: descripción curatorial (textos del brief, etapa 12) + ficha técnica (Acrílico sobre tela · dimensiones reales · 2026 · certificado incluido · envío por cotizar).
- Inventario 1, política DENY (verificar), precio CLP.

**Estados en el frontend** (derivados, sin edición manual):
- `disponible` → precio + "Ver obra"/compra.
- `reservada` (tag) → badge "Reservada", sin compra, CTA "Consultar estado".
- `vendida` (tag) o `available:false` → "Colección privada", sin precio ni compra, permanece en el archivo visual.
- Posiciones `n` sin producto publicado (6,7,8) → placeholder editorial "VI · Próximamente" (número romano, sin imagen falsa, sin compra).

**Flujo "termino la obra VI":** crear producto → tags `serie:animal-interior`, `n:6`, `estado:disponible` → agregar a la colección → publicar. La página pasa sola a 6/8 y el placeholder VI se reemplaza. Cero código.

## 4. Archivos

**Nuevos:**
- `animal-interior/index.html` — página de la serie (hero 5/8 + barra de progreso, manifiesto, grilla 8 posiciones, catálogo, CTA consulta, JSON-LD `VisualArtwork`/`Product`, OG/Twitter, responsive, lazy images).
- `catalogo/SARK_Catalogo_2026_ANIMAL_INTERIOR.pdf` — copiado del vault (5.3MB, se abre en pestaña nueva; no se incrusta).
- `docs/animal-interior-implementation-plan.md` (este documento).
- `docs/animal-interior-content-guide.md` — cómo marcar reservada/vendida, publicar obra VI, cambiar textos/precios/fotos, reemplazar el PDF.

**Modificados:**
- `index.html` (landing principal): corregir "Óleo y aerosol" → "Acrílico sobre tela" en la sección obras (dato real de la tienda) y enlazar "Ver la serie completa" → `/animal-interior/`. El carrusel existente queda igual (ya sincroniza).

**En Shopify (vía API, con confirmación previa):** retitular colección + descripción; actualizar 5 productos (título/tags/body); crear página `/pages/animal-interior` (iframe).

## 5. Etapas de ejecución

1. **Shopify — modelo de datos** (30 min): colección + 5 productos. *Reversible: se guarda snapshot JSON de títulos/tags/body previos en `docs/`.*
2. **Página de la serie** (`animal-interior/index.html`): maquetación museo negro + fetch `products.json` + estados + placeholders + fallback estático (igual que el carrusel).
3. **Catálogo + contacto:** PDF al repo; CTA WhatsApp (+56 9 3573 3021) y mailto con obra/URL/precio/estado prellenados.
4. **Ajustes landing principal** (medium + link serie).
5. **Verificación en navegador** (desktop/móvil, estados simulados) → commit → **push a `main`** (requiere resolver credenciales) → página Shopify `pageCreate`.

## 6. Riesgos y reversión

- **Push bloqueado (403):** nada llega a producción hasta tener token con `Contents: Read and write` o push manual del usuario. Riesgo #1 y actual.
- **Retitular productos:** el handle no cambia, los links no se rompen; snapshot previo permite revertir con un script.
- **Tags:** si el usuario ya usa `Painting/Paints` para filtros del tema, se conservan además de los nuevos.
- **products.json cachea ~1 min en CDN:** los cambios tardan un minuto en verse — aceptable.
- **Reversión total:** `git revert` de los commits de la rama; Shopify se restaura desde el snapshot.

## 7. Preguntas abiertas (bloquean etapas puntuales, no el inicio)

1. **"Sombra y Vuelo" vs "Sombras y Vuelo"** — la tienda dice "Sombras" (plural). ¿Cuál es el nombre correcto de la obra?
2. **Sagrado Prohibido 150×125** (tienda) vs 130×100 (brief) — se asume que la tienda manda, ¿confirmas?
3. **Catálogo negro o blanco** para el botón "Ver catálogo".
4. **Credenciales de push** (ver riesgo #1).
