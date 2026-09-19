import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Code2,
  Gauge,
  Layers,
  Palette,
  Search,
  ShoppingCart,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Heart, Sparkle } from "@/components/Doodles";

export const metadata: Metadata = {
  title: "Project Spec — CakeCraft Commerce",
  description:
    "CakeCraft Commerce: the custom cake storefront & production platform. Full tech stack, feature set, target clients and capabilities.",
};

const STACK = [
  { name: "Next.js 16", role: "App Router · Turbopack · SSG", icon: Layers },
  { name: "TypeScript 5.9", role: "Strict, fully type-safe logic", icon: Code2 },
  { name: "React 19.2", role: "Server + client components", icon: Layers },
  { name: "Tailwind CSS v4", role: "CSS-first @theme design tokens", icon: Palette },
  { name: "Framer Motion 12", role: "Transitions, parallax, springs", icon: Sparkles },
  { name: "Lucide React", role: "Icons + custom SVG doodles", icon: Wand2 },
  { name: "Fraunces + Outfit", role: "next/font, zero-CLS typography", icon: Palette },
  { name: "Context + localStorage", role: "Persistent cart, no backend", icon: ShoppingCart },
  { name: "Drizzle + PostgreSQL", role: "Scaffolded for real persistence", icon: Gauge },
];

const FEATURES = [
  {
    icon: CalendarClock,
    title: "Cake Availability Engine",
    tag: "The differentiator",
    points: [
      "5 AM + 5 PM slots = 10 cakes/day capacity",
      "Per-product minimum lead times (3–10 days)",
      "Owner-blocked blackout dates & Monday closures",
      "Fully booked dates struck through & unselectable",
      "Amber 'almost full' urgency indicators",
    ],
  },
  {
    icon: Wand2,
    title: "Personalisation Upsell Ladder",
    tag: "Revenue driver",
    points: [
      "Name piped on cake with live preview (+$8)",
      "Extra Silky Cream Layer (+$10)",
      "Full Bloom Glow-Up / extra beautiness (+$18)",
      "Gold leaf, bouquets, toppers, candles (+$4–28)",
      "3 size tiers × 12 photographed flavours",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Commerce & Checkout",
    tag: "Conversion",
    points: [
      "13 cakes across 10 filterable collections",
      "'Buy This' one-tap add + customise affordance",
      "Spring cart drawer with free-delivery progress",
      "Card + PayNow, GST-inclusive, promo codes",
      "Delivery vs free self-collection logic",
    ],
  },
  {
    icon: Users,
    title: "Social Proof & Content",
    tag: "Trust",
    points: [
      "Infinite sliding review rail (pauses on hover)",
      "4.9 rating · 200+ reviews · 12k+ cakes bar",
      "Masonry gallery with gallery-to-quote buttons",
      "Instagram grid + trusted-by-brands marquee",
      "Existing quote-form integration preserved",
    ],
  },
  {
    icon: Search,
    title: "SEO & Performance",
    tag: "Growth",
    points: [
      "Per-page metadata, OpenGraph, keywords",
      "13 product pages pre-rendered (SSG)",
      "Descriptive alt text + next/image optimisation",
      "Clean /cakes/[slug] semantic URLs",
      "GA4 / Meta Pixel ready",
    ],
  },
  {
    icon: Sparkles,
    title: "Luxury Motion Design",
    tag: "Brand feel",
    points: [
      "Cinematic LED video hero with parallax",
      "Staggered word-reveal headlines",
      "Blur-and-rise page transitions on all routes",
      "Scroll reveals, marquees, hover lifts",
      "Custom AI mascot with float/spin animation",
    ],
  },
];

const CLIENTS = [
  { title: "Custom cake studios & home bakeries", desc: "Outgrown Instagram DMs, need capacity-aware ordering. The primary buyer." },
  { title: "Wedding & event cake designers", desc: "Tiered pricing, consultations, deposits and long lead times." },
  { title: "Dessert cafés & patisseries", desc: "Pre-orders and collection slots alongside walk-in trade." },
  { title: "Florists & gift-hamper brands", desc: "Same model — perishable, date-booked, personalised, capacity-limited." },
  { title: "Cloud & ghost kitchens", desc: "Daily production caps enforced across multiple brands." },
  { title: "Agencies & freelancers", desc: "White-label as a premium build for any food-service client." },
];

export default function ProjectPage() {
  return (
    <>
      {/* Hero */}
      <section className="paper-dots relative overflow-hidden border-b border-lav-line bg-lav-soft pt-40 pb-20">
        <Sparkle className="absolute top-32 right-[10%] size-6 animate-wiggle text-gold" />
        <Heart className="absolute bottom-16 left-[8%] size-8 animate-float text-blush-deep/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
              Project Specification
            </p>
            <h1 className="font-display mt-3 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[1] font-black tracking-tight text-ink">
              CakeCraft{" "}
              <em className="squiggle font-light text-lav-dark italic">Commerce</em>
            </h1>
            <p className="font-display mt-4 text-xl font-medium text-grape italic sm:text-2xl">
              The custom cake storefront &amp; production platform
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed font-medium text-grape/80">
              Client implementation: <strong className="text-ink">Kekki Cakery Singapore</strong>. A
              luxury boutique-bakery e-commerce experience with a capacity-aware booking engine at
              its core — because a cake isn&apos;t a product on a shelf, it&apos;s a booked
              production slot on a specific date.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion", "React 19"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-lav-deep/30 bg-white px-4 py-2 text-xs font-black tracking-wide text-lav-dark"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem / solution */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-lav-line bg-white p-8 shadow-soft">
              <p className="text-xs font-black tracking-[0.24em] text-blush-deep uppercase">
                The problem
              </p>
              <h2 className="font-display mt-3 text-2xl font-black text-ink">
                Generic e-commerce breaks for made-to-order cakes
              </h2>
              <p className="mt-4 text-sm leading-relaxed font-medium text-grape/75">
                A standard Shopify or WooCommerce store will happily let a customer buy 40 cakes
                for tomorrow morning. Bakeries then cancel birthdays, refund angrily, and lose
                reviews. Meanwhile orders arrive through Instagram DMs, WhatsApp and Google Forms,
                and get reconciled by hand in a spreadsheet — 10 to 15 hours of admin every week.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-[2rem] bg-gradient-to-br from-lav-deep to-blue-deep p-8 text-white shadow-lift">
              <p className="text-xs font-black tracking-[0.24em] text-blush uppercase">
                The solution
              </p>
              <h2 className="font-display mt-3 text-2xl font-black">
                A storefront that understands kitchen capacity
              </h2>
              <p className="mt-4 text-sm leading-relaxed font-medium text-white/85">
                CakeCraft pairs a luxury, conversion-focused storefront with a booking engine that
                enforces daily capacity, AM/PM slots, lead times and blackout dates before payment
                is ever taken. Deep personalisation lifts average order value, and every order
                lands ready for automated confirmations, reminders and review requests.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tech stack */}
      <section className="paper-dots-strong border-y border-lav-line bg-cream-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
              Technologies used
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,3rem)] font-black tracking-tight text-ink">
              Tech stack
              <Heart className="ml-3 inline size-6 text-blush-deep" />
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.07}>
                <div className="flex h-full items-start gap-4 rounded-[1.75rem] border border-lav-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-lav-soft text-lav-dark">
                    <s.icon className="size-5" />
                  </span>
                  <span>
                    <span className="font-display block text-lg font-black text-ink">{s.name}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-grape/65">{s.role}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
            Capabilities
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,3rem)] font-black tracking-tight text-ink">
            What the platform does
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col rounded-[2rem] border border-lav-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-lav-soft text-lav-dark">
                    <f.icon className="size-5" />
                  </span>
                  <span className="rounded-full bg-blush/70 px-3 py-1.5 text-[0.6rem] font-black tracking-wider text-grape-ink uppercase">
                    {f.tag}
                  </span>
                </div>
                <p className="font-display mt-5 text-xl leading-snug font-black text-ink">
                  {f.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-snug font-medium text-grape/75">
                      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-lav-deep" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Target clients */}
      <section className="border-y border-lav-line bg-lav-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
              Market fit
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,3rem)] font-black tracking-tight text-ink">
              Who will buy this platform
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed font-medium text-grape/75">
              Any business selling <strong className="text-ink">perishable, personalised,
              date-booked goods with a hard daily production ceiling</strong>.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENTS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.07}>
                <div className="h-full rounded-[1.75rem] border border-lav-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <span className="font-display grid size-9 place-items-center rounded-full bg-lav-deep text-sm font-black text-white">
                    {i + 1}
                  </span>
                  <p className="font-display mt-4 text-base leading-snug font-black text-ink">
                    {c.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-grape/70">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { n: "10–15 hrs", l: "admin saved weekly" },
                { n: "0", l: "over-booked dates" },
                { n: "+30%", l: "AOV via personalisation" },
              ].map((s) => (
                <div key={s.l} className="rounded-[1.75rem] bg-white p-6 text-center shadow-soft">
                  <p className="font-display text-3xl font-black text-lav-dark">{s.n}</p>
                  <p className="mt-1 text-[0.68rem] font-bold tracking-wider text-grape/60 uppercase">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-lav-deep via-lav-dark to-blue-deep p-10 text-center text-white shadow-lift sm:p-16">
            <div className="absolute -right-20 -bottom-24 size-80 rounded-full bg-blue/30 blur-3xl" />
            <div className="absolute -top-20 -left-16 size-72 rounded-full bg-blush/25 blur-3xl" />
            <div className="relative">
              <Sparkle className="mx-auto size-8 animate-wiggle text-gold" />
              <h2 className="font-display mt-5 text-[clamp(1.9rem,4vw,3.2rem)] leading-tight font-black">
                See the platform in action
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed font-medium text-white/80">
                Every feature described here is live in this build — browse the collection, open a
                cake to customise it, try a fully booked date, and run a full checkout.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/cakes"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black tracking-wide text-lav-dark uppercase transition-all hover:-translate-y-1 hover:bg-blush hover:text-grape-ink"
                >
                  Browse the storefront
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/checkout"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 px-8 py-[0.9rem] text-sm font-black tracking-wide text-white uppercase transition-all hover:border-white hover:bg-white/10"
                >
                  Try the checkout
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
