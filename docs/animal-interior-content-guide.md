# Animal Interior — Guía de contenido (sin tocar código)

Todo se administra desde el **admin de Shopify**. La página de la serie (`home.sarkpew1.com/animal-interior/`) y el carrusel del landing leen la tienda en vivo; los cambios se ven en ~1 minuto (caché del CDN).

## Dónde vive cada cosa

| Dato | Dónde se edita |
|---|---|
| Título de la serie, manifiesto, total de obras | Colección **Animal Interior — Serie 2026** (handle `originals`) → descripción |
| Título de una obra | Producto → título (el handle/URL no cambia solo — no lo cambies) |
| Precio | Producto → variante → precio |
| Número dentro de la serie | Tag `n:1` … `n:8` |
| Estado | Tag `estado:disponible` / `estado:reservada` / `estado:vendida` |
| Texto curatorial + ficha técnica | Producto → descripción (la página extrae las dimensiones de ahí, formato `130 × 100 cm`) |
| Fotos | Producto → medios (la primera imagen es la que se muestra) |
| Catálogo PDF | Archivo `catalogo/SARK_Catalogo_2026_ANIMAL_INTERIOR.pdf` en el repo (reemplazar y push) |

## Reglas de tags (importante)

Cada obra de la serie lleva **exactamente**:
- `serie:animal-interior`
- `n:X` (posición 1–8, sin repetir)
- un solo `estado:…`

## Operaciones frecuentes

**Marcar una obra como reservada** → en el producto, cambia el tag `estado:disponible` por `estado:reservada`. La web muestra "Reservada", quita la compra directa y deja "Consultar estado".

**Marcar como vendida** → cambia el tag a `estado:vendida` (y deja el inventario en 0 si se vendió fuera de Shopify). La web muestra "Colección privada", sin precio ni compra; la obra sigue visible como archivo de la serie. *Si se vende por el checkout de Shopify, el inventario llega a 0 y la web la marca vendida sola — el tag es opcional en ese caso pero recomendado.*

**Publicar la obra VI** →
1. Crea el producto (título limpio, ej. `Nombre De La Obra`; foto principal; precio; inventario 1; "continuar vendiendo sin stock" **desactivado**).
2. Descripción: texto curatorial + línea `Acrílico sobre tela · 130 × 100 cm` (u otra medida).
3. Tags: `serie:animal-interior`, `n:6`, `estado:disponible`.
4. Agrégalo a la colección **Animal Interior — Serie 2026**.
5. Listo: la página pasa sola de V/VIII a VI/VIII y el placeholder VI se reemplaza. Igual para VII y VIII.

**Cambiar el total de la serie** (ej. de 8 a 10) → en la descripción de la colección hay un marcador oculto `<span data-serie-total="8" …>`; cambia el número (editar como HTML: botón `<>` del editor).

**Reemplazar el catálogo** → sobrescribe `catalogo/SARK_Catalogo_2026_ANIMAL_INTERIOR.pdf` en el repo `pew1sark/PEW1-2.0-WEB` y haz push a `main` (o súbelo por la web de GitHub).

## Si algo se ve mal

- Espera 1–2 minutos (caché) y recarga con Cmd+Shift+R.
- Revisa que la obra tenga los 3 tags y esté **activa** y **publicada** en el canal Online Store.
- La página tiene respaldo estático: si Shopify no responde, muestra el estado del último snapshot (5 obras).
- Para revertir los textos/tags de productos al estado anterior a 2026-07-11: `docs/animal-interior-shopify-snapshot-2026-07-11.json` guarda títulos, tags y descripciones originales.
