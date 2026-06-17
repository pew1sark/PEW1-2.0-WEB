# PEWÏ — Design System

> **ARTE QUE TRANSFORMA. IDENTIDAD QUE PERDURA.**
> *(Art that transforms. Identity that endures.)*

PEWÏ is a **personal urban-art brand** — the identity of an independent artist working
in the language of street art, stencils and spray. The brand exists to *"crear arte que
transforma espacios y conecta emociones"* (create art that transforms spaces and connects
emotions). Its visual identity fuses **hand illustration** with a **firm, contemporary
typographic system**.

The hero mark is a **birdhouse perched on a fountain-pen nib**, crowned with three little
"pew" spray-marks — equal parts birdsong, graffiti tag, and the act of making a mark. It is
rendered as a bold, hand-inked line illustration.

---

## Sources

This system was reconstructed from two sources:

- `uploads/345a9931-2738-4225-91b7-25dec4cf250c.png` — *"MANUAL DE MARCA"* one-page brand
  guide (logo principal, versión negativa, tipografía, paleta de colores, usos del logo,
  aplicaciones y mockups).
- **https://www.sarkpew1.com** — the artist's live Shopify store (Nicolas Sark Pew1). Real
  catalog, artist statement, product imagery and prices (CLP) were pulled from here to
  populate the portfolio UI kit *as a visualization model*. Product images live in
  `assets/work/`.

No codebase or Figma file was provided. The portfolio UI kit is a **remodel of the artist's
live store** (sarkpew1.com) in the PEWÏ brand language — real products, prices and imagery,
shown as a visualization model, fully responsive for desktop and mobile. No slide template
was supplied, so none was fabricated.

Logo, icon, wordmark and mockup imagery were extracted directly from the manual artboard and
keyed to clean transparent PNGs (see `assets/`).

---

## Language

The source brand material is in **Spanish (Latin American)**. Copy in this system is written
in Spanish to stay true to the brand voice; English glosses are provided in the guidelines.

---

## Index / Manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import` list only.
- `readme.md` — this file.
- `SKILL.md` — Agent-Skill wrapper for downloadable use.

**`tokens/`** — design tokens, each `@import`ed by `styles.css`
- `colors.css` · `typography.css` · `spacing.css` · `fonts.css` · `base.css`

**`assets/`** — extracted brand imagery
- `pewi-lockup.png` / `pewi-lockup-white.png` — full vertical lockup (icon + wordmark)
- `pewi-icon.png` / `pewi-icon-white.png` — birdhouse icon only
- `pewi-wordmark.png` / `pewi-wordmark-white.png` — horizontal "PEWÏ" wordmark
- `mockup-sign.png`, `mockup-sticker.png`, `mockup-aerosol.png`, `mockup-hoodie.png`,
  `mockup-card.png` — lifestyle application photos

**`guidelines/`** — foundation specimen cards (populate the Design System tab)

**`components/`** — reusable React primitives (see Components below)

**`ui_kits/portfolio/`** — PEW1 art-store & portfolio kit (remodel of sarkpew1.com)
  (`index.html` + `lib.jsx` + `products.jsx` + `sections.jsx` + `app.jsx`); responsive,
  with product lightbox and working cart drawer

**`SKILL.md`** — Agent-Skill wrapper for downloadable use

---

## Components

Authored under `components/` and exposed on `window.PEWDesignSystem_d6ec52`:

- **Button** — primary / secondary / ghost / accent, 3 sizes, icon support, the brand's hard
  keyline + offset-shadow press feel.
- **Badge** — small status / category tags (solid, outline, accent).
- **Tag** — pill chips for art categories (mural, stencil, lettering…).
- **Card** — content surface with optional hard-shadow "poster" variant.
- **Input** — text field with keyline border + orange focus.
- **SectionLabel** — the widely-tracked uppercase eyebrow used across the manual.

---

## UI Kits

- **`ui_kits/portfolio/`** — a click-through PEWÏ artist site: hero, work grid, commission
  CTA, and an inquiry form. Composes the component primitives.

---

---

## CONTENT FUNDAMENTALS — voice & copy

PEWÏ writes like an **artist talking about the work**, not a company selling a product.
The tone is **confident, warm, and a little poetic**, grounded in craft.

- **Language:** Spanish (LatAm). Natural, conversational, never corporate.
- **Person:** Speaks as **"yo" / first person** about the practice ("creo arte que
  transforma"), and addresses the viewer directly as **"tú"** when inviting action
  ("transforma tu espacio", "cuéntame tu idea"). Warm and personal — this is one artist.
- **Casing:** Section labels and primary statements are **UPPERCASE** with wide tracking
  (e.g. `PALETA DE COLORES`, `USOS DEL LOGO`). Body copy is sentence case. The wordmark
  **PEWÏ** is always all-caps with the dotted-Ï.
- **The Ï:** the diaeresis on the **Ï** is a brand signature — always keep it (PEWÏ, never
  "PEWI" or "Pewi" in display contexts).
- **Sentence length:** short, declarative, punchy. Manifesto cadence. Pairs of clauses
  separated by a period read like a tagline: *"Arte que transforma. Identidad que perdura."*
- **Vocabulary:** *arte, transformar, espacios, emociones, conexión, autenticidad,
  creatividad, urbano, mural, stencil, aerosol, identidad.* Avoid jargon, hype words,
  exclamation overload, and emoji.
- **Emoji:** **not used.** The brand expresses energy through the spray-marks and bold
  type, not emoji.
- **Taglines / examples (real & in-voice):**
  - *"Arte que transforma. Identidad que perdura."* (master tagline)
  - *"Crear arte que transforma espacios y conecta emociones."* (purpose)
  - *"Pewi es una marca personal que representa creatividad, autenticidad y conexión con
    el arte urbano."* (about)
  - In-voice CTAs: *"Transforma tu espacio"*, *"Cuéntame tu idea"*, *"Ver el trabajo"*.

---

## VISUAL FOUNDATIONS

**Overall vibe.** High-contrast, hand-inked, graphic-poster street art. Mostly
**monochrome** (ink black + warm paper white / deep navy), set alight by a single warm
**spray-orange** accent (amber as the support). It should feel screen-printed and physical,
never glossy or techy.

**Color.**
- Base is monochrome: ink black `#0B0B0D`, warm paper `#F4F4F2`, and the manual's deep navy
  `#0A0F2E` for dark sections (reads as a rich near-black).
- One accent does the heavy lifting: **spray-orange `#FF9800`**; **amber `#FFD34D`** is the
  secondary/highlight. Use accent sparingly — a rule, a focus ring, one key word, a button.
- Greys (`#8C8C8C → #666 → #454545`) are for structure and secondary text only.
- **Never** introduce blue/purple gradients or pastel palettes — off-brand.

**Type.** Display = the custom **PEWÏ** logotype (substituted with **Archivo Black** for
headlines) — heavy, geometric, UPPERCASE, tight tracking. Text/UI/body = **Montserrat**
(400–900). Section labels are uppercase Montserrat Bold with ~0.22em tracking. Big statements
are display caps; everything else is Montserrat.

**Backgrounds.** Flat fills — warm paper on light, navy/ink on dark. No gradients. Texture is
welcome when it reads as *physical*: concrete walls, screen-print grain, matte product
surfaces (the manual's mockups live on concrete and matte black). Full-bleed product/wall
photography is on-brand; decorative blurs are not.

**Borders & cards.** The signature device is a **hard 2px ink keyline** (`--bw-key`). Cards
are mostly **square (radius 0)** or barely-rounded (`--radius-sm` 3px). The hero/poster card
variant uses a **hard offset shadow** (`6px 6px 0` ink or orange) for a screen-printed,
sticker-like feel rather than soft elevation.

**Shadows.** Two systems: (1) restrained soft shadows for floating UI (`--shadow-sm/md/lg`,
low blur, low opacity), and (2) the graphic **hard-offset shadow** for posters, stickers and
emphasis. Prefer hard shadows for brand moments, soft for functional UI.

**Radii.** Small and sharp. Default 0; 3–6px for inputs/buttons; pills reserved for category
tags only.

**Motion.** Purposeful and quick. `--dur-base` 200ms, ease-out `cubic-bezier(.22,1,.36,1)`.
Fades + small transl(4–8px) rises; **no bounces, no parallax theatrics.** The "pew" marks may
do a tiny one-shot pop on hero entrance — never an infinite loop.

**Hover / press.**
- *Hover:* solid buttons darken (orange → `--orange-700`); ghost/outline fill with a faint
  ink/orange wash; cards lift slightly (soft) or nudge into their hard shadow.
- *Press:* translate down-right 2–3px so a hard-shadow element appears to "stamp" down, or a
  subtle scale 0.98 on flat buttons. Tactile, like pressing a stencil.

**Transparency & blur.** Used sparingly — a translucent ink scrim over photography for legible
overlays, light hairlines via `rgba`. No frosted-glass UI as a default.

**Layout.** Generous margins, strong left-alignment, confident use of negative space (the
manual breathes). A fixed top nav on the dark surface is on-brand. Grid-based work galleries.

---

## ICONOGRAPHY

PEWÏ has **no built-in icon font** and uses **no emoji** and **no unicode-glyph icons**. The
manual's only proprietary marks are:

- **The PEWÏ birdhouse icon** (`assets/pewi-icon.png` / `-white.png`) — the brand's primary
  symbol; a bold hand-inked line illustration. Use for app icons, favicons, stamps, and
  reduced-space lockups ("versión de ícono para espacios reducidos").
- **The "pew" spray-marks** — three short radiating dashes above the birdhouse; a recurring
  decorative accent that can stand alone as a flourish.
- **The PEWÏ wordmark** (`assets/pewi-wordmark.png`) — horizontal lockup for tight
  applications.

For **functional UI icons** (menus, arrows, social, form affordances) the system uses
**[Lucide](https://lucide.dev)** via CDN — chosen as the closest match to the brand's
hand-inked aesthetic: a clean, **2px stroke, rounded-join, outline** set that sits naturally
beside the logo's line weight. *(Substitution — flagged: the manual did not specify a UI icon
set.)* Use Lucide at `stroke-width: 2`, `currentColor`, never filled. Keep icons monochrome
(ink or white); reserve orange for the rare emphasised affordance.

Logos must follow the manual's **usos del logo**: principal (ink on light), negative (white on
dark), icon-only (reduced spaces), horizontal wordmark (specific applications). Maintain clear
space around the mark and never recolor it outside ink / white.

