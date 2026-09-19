# 🍰 CakeCraft Commerce — Kekki Cakery Edition

**A boutique-bakery e-commerce & order-management platform with built-in cake availability control.**

> Live demo build: a fully functional, luxury-feel custom cake storefront recreating the Kekki Cakery brand identity (lavender, cream & blue) with zero database dependency — all data is dummy/seed data, ready to be swapped for Shopify, Medusa or a real API.

---

## 1. Project Title

**CakeCraft Commerce** — *The Custom Cake Storefront & Production Platform*
Client implementation: **Kekki Cakery Singapore** (`kekki.club`)

**Tagline:** *Good Cakes, Brighter Days — more than just a cake.*

---

## 2. What This Platform Does

CakeCraft Commerce solves the single biggest problem that custom cake businesses have that
generic e-commerce platforms do **not** solve: **a cake is not a product on a shelf — it is a
booked production slot on a specific date.**

Ordinary Shopify/WooCommerce stores let a customer buy 40 cakes for tomorrow morning. This
platform prevents that. It combines a luxury storefront with a capacity-aware booking engine,
deep per-cake personalisation, and an automation-ready order workflow.

### The core loop
1. Customer lands on a cinematic video hero and browses collections or the filterable gallery.
2. They click a cake photo to open the **customiser** — size, flavour, extra cream, "extra beautiness" glow-up, name piped on the cake.
3. They pick a **delivery or self-collection date + AM/PM slot** from a calendar that already knows what's fully booked.
4. Secure checkout with card or PayNow, promo codes, free-delivery thresholds and GST handling.
5. Confirmation, reminders, care instructions and review requests fire automatically.
6. Anything too custom for the catalogue is routed to the existing quote form at `quote.kekki.club`.

---

## 3. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | **Next.js 16** (App Router, Turbopack) | Server components, SSG for product pages, file-based routing, best-in-class SEO |
| **Language** | **TypeScript 5.9** (strict) | Type-safe cart, pricing and availability logic |
| **UI Library** | **React 19.2** | Server + client component split |
| **Styling** | **Tailwind CSS v4** (CSS-first `@theme`) | Design tokens for the entire brand palette — retheme the whole site from one file |
| **Animation** | **Framer Motion 12** | Page transitions, scroll reveals, parallax hero, spring cart drawer, layout animations |
| **Icons** | **Lucide React** + custom SVG doodles | Consistent iconography + brand hearts/squiggles/sparkles |
| **Fonts** | **Fraunces** (display) + **Outfit** (sans) via `next/font` | Luxury editorial serif paired with a clean geometric sans, self-hosted & zero-CLS |
| **State** | React Context + `localStorage` | Persistent cart with no backend required |
| **Media** | Pexels CDN (photos + hero video), AI-generated mascot | Optimised via `next/image` remote patterns |
| **Utilities** | `clsx` | Conditional class composition |
| **Tooling** | ESLint 9, `next typegen`, `tsc --noEmit` | Type-checked, lint-clean production builds |
| **Backend-ready** | Drizzle ORM + PostgreSQL (scaffolded, unused) | Drop-in persistence when moving off dummy data |

### Deployment target
Vercel / Netlify / any Node host. Fully static except the health endpoint — 24 routes,
13 product pages pre-rendered at build time.

---

## 4. Who Will Buy This Platform

### Primary buyer — Custom cake studios & home bakeries
Businesses doing **£/$3k–50k per month** in made-to-order cakes who are currently drowning in
DM-based ordering. They have outgrown Instagram DMs and Google Forms but find Shopify can't
handle "we can only make 10 cakes on Saturday."

### Secondary buyers
| Segment | Pain solved |
|---|---|
| **Wedding & event cake designers** | Tiered pricing, consultations, long lead times, deposit workflows |
| **Dessert cafés & patisseries** | Pre-order + collection slots alongside walk-in trade |
| **Florists & gift-hamper businesses** | Identical model: perishable, date-booked, personalised, capacity-limited |
| **Cloud/ghost kitchens** | Daily production caps across multiple brands |
| **Chocolatiers & bakery chains** | Seasonal drops (Valentine's, CNY, Christmas) with hard capacity ceilings |
| **Agencies & freelancers** | White-label this as a premium build for any food client |

### Why they buy
- Stops over-booking and the reputational damage of cancelling a birthday cake.
- Removes 10–15 hours/week of manual DM order-taking and spreadsheet juggling.
- Increases average order value through the personalisation upsell ladder.
- Looks like a $15k bespoke design, not a $29 theme.

---

## 5. Key Features

### 🎂 Storefront & Brand
- Cinematic **LED video hero** with parallax scroll and staggered word-reveal headline
- Luxury ivory / royale-violet / champagne theme driven entirely by Tailwind `@theme` tokens
- Animated page transitions on every route (blur + rise)
- Marquee brand ticker, "Good Cakes Brighter Days" scrolling wordmark, giant gradient footer signature
- Custom AI-generated kawaii mascot with float/spin animations
- Fully responsive desktop → mobile, with a dedicated mobile nav sheet

### 🛍️ Commerce
- 13 products across **10 collections** (Classic, 3D, Photo, Kids, Flowers, Wedding, Bento, Gender Reveal, For Him, For Her)
- **"Buy This"** one-tap add, plus a **Customise** affordance on every card
- Clicking any cake photo reveals: *"Click photo for more options — sizes · 12 flavours · extra cream · name on cake"*
- Slide-out cart drawer with spring physics, quantity control and a **free-delivery progress bar**
- Promo engine: `WELCOME10`, `SWEET15`, `FREEDEL` with min-spend validation
- Card + **PayNow** (Singapore) checkout, GST-inclusive pricing, delivery-fee rules

### 🧁 Personalisation (revenue upsell ladder)
| Option | Price |
|---|---|
| Name / message piped on cake (live plaque preview) | +$8 |
| Extra Silky Cream Layer | +$10 |
| Full Bloom Glow-Up ("extra beautiness") | +$18 |
| Fresh Flower Mini Bouquet | +$28 |
| 24k Gold Leaf Finish | +$12 |
| Acrylic topper, chocolate plaque, candles, gift box | +$4–9 |

Plus 3 size tiers per cake and **12 photographed, clickable flavours** with a sweetness scale.

### 📅 Cake Availability Engine *(the differentiator)*
- Per-slot capacity (5 cakes AM + 5 PM = 10/day)
- **Minimum lead times** enforced per product (3–10 days)
- Automatic Monday closures + owner-blocked blackout dates
- Fully booked dates are **visually struck through and unselectable**
- "Almost full" amber indicators to drive urgency
- Separate morning (10am–1pm) / afternoon (2pm–6pm) availability
- Rush-order escape hatch routing to the quote form

### ⭐ Social Proof & Content
- **Infinite sliding review rail** — pauses on hover, gold stars, avatar initials, cake ordered
- Rating summary bar: 4.9 average · 200+ Google reviews · 12k+ cakes delivered
- Masonry **filterable gallery** with gallery-to-quote buttons on every image
- Instagram feed grid linking to `@kekkicakerysg`
- "Trusted by Brands" marquee

### 📨 Automation-Ready Workflow
Post-purchase timeline built into the confirmation screen: confirmation email → 24h reminder →
bake-day dispatch/ready update → review request, plus cake storage & handling instructions.

### 🔍 SEO & Performance
- Per-page metadata, OpenGraph, keyword targeting, semantic headings
- Descriptive alt text on every image, `next/image` optimisation
- SSG product pages with clean `/cakes/[slug]` URLs
- Custom SVG favicon, `metadataBase`, template titles

---

## 6. Route Map

```
/                 Home — video hero, values, bestsellers, reviews rail, collections, CTA, Instagram
/cakes            Filterable catalogue (10 collections)
/cakes/[slug]     Product customiser — sizes, flavours, add-ons, name-on-cake, date picker  (13 SSG pages)
/flavours         12 clickable photographed flavours → paired cakes
/gallery          Masonry filterable gallery + gallery-to-quote
/about            Brand story, stats, beliefs, halal assurance
/faq              4 grouped accordions (ordering, delivery, ingredients, payment)
/contact          Quote form / Instagram / Google Reviews + studio details
/checkout         4-step checkout + animated order confirmation
/project          This specification, presented in-app
/api/health       Health check
```

---

## 7. Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

All content lives in **`src/lib/data.ts`** (products, flavours, categories, gallery, reviews, FAQs)
and **`src/lib/availability.ts`** (capacity rules). Swap these for API calls to go live.

---

## 8. Roadmap / Optional Add-Ons

- **Production dashboard** — daily/weekly baking list, filter by production date, Pending → In Production → Ready → Completed, printable run sheets
- Customer accounts, order history and loyalty tiers
- Google Sheets / Xero sync for availability and invoicing
- Real payment gateway (Stripe SG / HitPay for PayNow)
- Admin CMS for editing sections without code
- GA4, Meta Pixel, Google Merchant Center wiring

---

*Built with Next.js, TypeScript, Tailwind CSS v4 and Framer Motion.*
