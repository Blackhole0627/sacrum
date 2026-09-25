# SACRUM — Step 1: Design and Architecture

Internal working document. Scope: new website + e-commerce (in-stock products) + CMS + Datafast/Kushki.

## 1. What we know

- Client says: needs the website AND an e-commerce for in-stock products.
- No public information found. Web search returns nothing about a SACRUM brand in Ecuador. It is probably new or unlaunched.
- Business category, audience, price level, and visual identity: **unknown**.

Industry: **TBD** (do not guess in front of the client). Working assumption: premium consumer goods / lifestyle e-commerce, since it sits in the same client group as MUBB.

## 2. What to find out (ask later, alongside the first deliverables, not before)

1. What does SACRUM sell? (category, price range)
2. Who is the customer?
3. Does it have a logo, colors, or brand guide?
4. Is it related to MUBB visually, or a separate identity?
5. Does it need bilingual ES/EN?
6. Domain?

## 3. Plan without waiting: modular design

Because the answers are unknown, Step 1 should produce a neutral, flexible system that can take any identity:

- **Design tokens** (colors, fonts, spacing) in one file, so re-skinning takes minutes.
- **Block library** for the CMS. Editors compose pages from the blocks:
  - Hero (image/video + title)
  - Text + image (2 layouts)
  - Featured products
  - Category grid
  - Full-width image / gallery
  - Quote / brand statement
  - Newsletter / contact form
  - FAQ
  - Rich text
- **Store** is the same system as the MUBB store (see `../2-mubb-store`). Build it once as a shared package, style it per brand.

## 4. Sitemap (draft, adjust when the category is known)

```
/                     Home (hero, brand statement, featured products, categories, story, newsletter)
/tienda               Catalog
/tienda/[category]    Category
/tienda/[product]     Product
/carrito              Cart
/checkout             Checkout
/pedido/...           Success / rejected / pending / status
/nosotros             About / brand story
/contacto             Contact form
/[page]               Any page built from CMS blocks
/politicas            Shipping, returns, terms, privacy
```

## 5. Home wireframe (draft)

```
[ Logo        Shop  About  Contact           Cart(0) ]
[ HERO: full-bleed image + brand line + [Shop now]   ]
[ Brand statement (2 lines)                          ]
[ Categories: 3–4 large image tiles                  ]
[ Featured products: 4 cards                         ]
[ Story block: image + short text + link to About    ]
[ Newsletter / contact                               ]
[ Footer                                             ]
```

## 6. Data model

Same as MUBB store (see `../2-mubb-store/STEP1-design-and-architecture.md`, section 5), plus site content:

| Entity | Main fields |
|---|---|
| Page | id, slug, title, seo, blocks[] |
| Block | type, fields (per block type) |
| ContactMessage | id, name, email, phone, message, created_at, status |
| SiteSettings | logo, contact info, social links, nav, footer, CTA buttons |

## 7. Deliverables for this project

- [ ] Ask the SACRUM questions (section 2) with the first design delivery
- [ ] Design tokens file (neutral default)
- [ ] Wireframes: home, category, product, cart, checkout, about, contact (desktop, tablet, mobile)
- [ ] Block library sketches
- [ ] Data model shared with MUBB store
