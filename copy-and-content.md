# SACRUM — client copy and asset inventory (replaces the "unknown brand" placeholder)

Source: `wetransfer_sacrum_2026-09-24_2301/sacrum/` and `estructura sacrum .docx`. **This resolves the biggest open question from Step 1: what SACRUM is.**

## What SACRUM is
Handcrafted **religious and decorative sculptures**, made by Ecuadorian master artisans, over 30 years of craftsmanship. Positioned as premium and artisanal — "no machine could ever achieve" the hand-painted detail. Sold to homes, churches ("templos"), and collections worldwide. Bilingual ES/EN, confirmed in the doc itself (full parallel copy given for every section written so far).

This matches the original brief exactly: an in-stock e-commerce ("Disponibles en stock" is literally one of the filter categories in the client's own document) plus the option to customize a piece to order.

Industry: **Religious and decorative sculpture / artisanal sacred art, e-commerce with made-to-order customization.**

## Brand copy received (Inicio / Home)
> "En Sacrum, cada escultura nace de las manos de maestros artesanos ecuatorianos que han dedicado su vida al oficio de esculpir fe y belleza... Con más de 30 años de experiencia, esa vocación artesanal ha evolucionado hacia Sacrum..."

Leadership quote (pull-quote block): "Detrás de cada escultura Sacrum hay manos ecuatorianas, años de oficio y un compromiso con la excelencia que no se negocia. Desde Ecuador para el mundo."

**Values** (4, each with ES/EN copy): Tradición/Tradition, Precisión/Precision, Espiritualidad/Spirituality, Alcance global/Global reach.

## Catalog structure — confirmed taxonomy (ES/EN)

**Religiosas / Religious**
- Todas las religiosas / All religious
- Ángeles / Angels
- Cristos / Christs
- Crucifijos / Crucifixes
- Devocionales / Devotionals
- Sagrada Familia / Holy Family
- Santos / Saints
- Vírgenes / Virgin
- Vía Crucis / Estaciones — Stations of the Cross
- Metalería litúrgica (coronas, cetros, aureolas) — Liturgical metalware (crowns, scepters, halos)

**Decorativas / Decorative**
- Todas las decorativas / All decorative
- Esculturas de jardín/exterior / Garden-outdoor sculptures
- Piezas para interior / Indoor pieces
- Figuras históricas / Historical figures
- Esculturas monumentales / Monumental sculptures

**Cross-category filters (apply to both branches)**
- Esculturas grandes / Large statues
- Disponibles en stock / In stock, ready to ship  ← **this is the exact in-stock flag the store's data model needs**
- Personaliza tu pieza / Customize your piece  ← a product can be "in stock" or "made to order / customizable", not mutually exclusive

Update `shared/store-schema.sql`: `product` needs a `customizable boolean` flag alongside `status`, since a SACRUM piece can be sold both ways.

## Sitemap (confirmed, replaces the earlier draft)
```
Inicio (Home) · Nosotros (About) · Productos (Catalog) · Proceso (Process) · Servicios (Services) · Contacto
```
**Gap:** the client's document is unfinished. Only "Inicio" (full copy) and "Productos/Catálogo" (full copy, taxonomy) are written. **Nosotros, Proceso, Servicios, and Contacto exist only as nav labels with no content.** This is the main open item to send back to the client — everything else in Step 1 can proceed without it.

## Assets received
- **Logo:** `LOGO-SACRUM.ai` (vector), `LOGO-SACRUMtrnas.png` (transparent), `letras-SACRUM.png` (wordmark only), `icono-sacrum.png` / `icono-sacrum-sf.png` (icon marks). Wordmark style: thin uppercase sans-serif, the "R" mirrored — "SAᴚUM"-style mark, white on black.
- **Banner:** `banner-1.png` — full-bleed black hero, moody statue photography (a Virgin Mary sculpture backlit against a stained-glass window silhouette), headline "NUEVOS MODELOS" over the logo. This is real production creative, usable as-is for a Home hero or promo banner.
- **Product photography:** `fotosEsculturas/` — roughly 240 real files, clean white-background e-commerce shots (front/back or two angles per piece, e.g. `100-1.png` + `100-2.png`), plus a named subfolder `esculturas/` with specific pieces (`padre-pio`, `guadalupe-45`, `señor-faltante`) and `fotografias-esculturas/` with more of the same style. This is enough real product photography to populate the catalog in Step 2 without waiting on new photos.
- **Video:** `reel-v1.mp4` — a brand reel, usable as a Home hero video (matches the "video del estudio" pattern used on MUBB Design).

## Design direction — decided, built into `tokens.css` (changeable later)
- **Background:** black, matching `banner-1.png` and the logo lockup.
- **Product photography:** pure white background (matches the real photos), so cards read clean against the black site chrome.
- **Accent:** gold `#c9a24b`, from "metalería litúrgica (coronas, cetros, aureolas)" in the copy.
- **Type:** Montserrat, for consistency with MUBB and MUBB Design.

None of this required client input to move forward; it's a first pass built from their own material, and it's a one-file change (`tokens.css`) if they want it different.

## Decisions taken to keep moving (not blocking; revisit anytime)
1. **Nosotros, Proceso, Servicios, Contacto:** drafted in `draft-copy-pending-sections.md`, in the established brand voice, clearly marked as placeholder text (🖊) so nobody mistakes it for the client's own words. Structure and pages are built either way; only the words may change.
2. **Shipping for large/fragile pieces:** modeled with a `size_category` on `variant.options` (regular / large / monumental) so a shipping rule can key off it later; actual crating/freight logic is a Step 2+ detail once real handling costs are known.
3. **Customization fields:** defaulted to size, finish/color, and an optional inscription/dedication text field — the common set for made-to-order religious sculpture — via the existing `variant.options` jsonb, no schema change needed.
4. **Domain:** left unset in `site_settings`; doesn't block building the site itself.
