import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Feather,
  Gift,
  Palette,
  Star,
  Wheat,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { Hero } from "@/components/Hero";
import { Heart, HeartOutline, InstagramIcon, Logo, Sparkle } from "@/components/Doodles";
import {
  BRANDS,
  CATEGORIES,
  INSTAGRAM,
  IG_URL,
  PRODUCTS,
  QUOTE_URL,
  REVIEWS_URL,
} from "@/lib/data";

const VALUES = [
  { icon: BadgeCheck, title: "MUIS Halal-Certified", desc: "Enjoy with confidence — suitable for everyone at the table." },
  { icon: Palette, title: "Customised your own cake", desc: "Tell us your ideas, we'll bring it to life in buttercream." },
  { icon: Feather, title: "Less Sweet", desc: "Our house style — more flavour, less guilt." },
  { icon: Wheat, title: "Quality ingredients", desc: "Thoughtfully sourced for a better, cleaner bite." },
  { icon: Star, title: "Over 200 five-star reviews", desc: "Trusted by many happy customers across Singapore." },
];

const BESTSELLER_SLUGS = ["lavender-dream", "cubby-bear-bento", "midnight-crunch", "bloom-and-berry"];

export default function HomePage() {
  const bestsellers = BESTSELLER_SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <>
      {/* ====================== HERO — cinematic LED video ====================== */}
      <Hero />

      {/* =========================== GIANT MARQUEE =========================== */}
      <section aria-hidden className="overflow-hidden border-y border-lav-line bg-cream-2 py-6">
        <div className="flex w-max animate-marquee-slow items-center gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black whitespace-nowrap text-ink italic">
                Good Cakes,
              </span>
              <Heart className="size-7 text-blush-deep" />
              <span className="font-display text-outline text-[clamp(2.2rem,5vw,4rem)] font-black whitespace-nowrap">
                Brighter Days
              </span>
              <Sparkle className="size-6 text-gold" />
            </span>
          ))}
        </div>
      </section>

      {/* =============================== VALUES ============================== */}
      <section className="paper-dots relative overflow-hidden bg-lav-soft py-24 sm:py-32">
        <HeartOutline className="absolute top-16 left-[6%] size-10 animate-float-slow text-lav" />
        <HeartOutline className="absolute right-[8%] bottom-16 size-14 animate-float text-lav/70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-display text-xl font-medium text-lav-dark italic">
              More than just a pretty cake
            </p>
            <h2 className="font-display mx-auto mt-4 max-w-4xl text-[clamp(1.9rem,4.5vw,3.4rem)] leading-tight font-black tracking-tight text-ink uppercase">
              Beautiful cakes, thoughtfully made
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full rounded-[1.75rem] border border-lav-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <div className="grid size-12 place-items-center rounded-2xl bg-lav-soft text-lav-dark transition-colors duration-500 group-hover:bg-lav-deep group-hover:text-white">
                    <v.icon className="size-5" />
                  </div>
                  <p className="font-display mt-5 text-lg leading-snug font-bold text-ink">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-grape/70">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= BESTSELLERS =========================== */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
                Fresh from the piping bag
              </p>
              <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] leading-tight font-black tracking-tight text-ink">
                Loved to the last crumb
                <Heart className="ml-3 inline size-7 text-blush-deep" />
              </h2>
            </div>
            <Link
              href="/cakes"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-ink/10 px-6 py-3 text-sm font-black text-ink uppercase transition-all hover:border-lav-deep hover:text-lav-dark"
            >
              View all cakes
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ TESTIMONIALS =========================== */}
      <section className="paper-dots-strong border-y border-lav-line bg-cream-2 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
              Customer Reviews
            </p>
            <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] font-black tracking-tight text-ink">
              What our customers say
              <Heart className="ml-3 inline size-7 text-blush-deep" />
            </h2>

            {/* Rating summary */}
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-7 gap-y-3 rounded-[2rem] border border-lav-line bg-white px-8 py-5 shadow-soft">
              <span className="flex items-center gap-2.5">
                <span className="font-display text-4xl font-black text-ink">4.9</span>
                <span className="text-left">
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </span>
                  <span className="mt-0.5 block text-[0.65rem] font-bold tracking-wider text-grape/60 uppercase">
                    average rating
                  </span>
                </span>
              </span>
              <span className="hidden h-10 w-px bg-lav-line sm:block" />
              <span className="text-left">
                <span className="font-display block text-2xl font-black text-lav-dark">200+</span>
                <span className="text-[0.65rem] font-bold tracking-wider text-grape/60 uppercase">
                  Google reviews
                </span>
              </span>
              <span className="hidden h-10 w-px bg-lav-line sm:block" />
              <span className="text-left">
                <span className="font-display block text-2xl font-black text-lav-dark">12k+</span>
                <span className="text-[0.65rem] font-bold tracking-wider text-grape/60 uppercase">
                  cakes delivered
                </span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Testimonials />
          </Reveal>
          <Reveal delay={0.15} className="mt-12 text-center">
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-lav-line bg-white px-6 py-3.5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid size-8 place-items-center rounded-full bg-blue-soft font-display text-sm font-black text-blue-deep">
                G
              </span>
              <span className="text-sm font-bold text-ink">
                <span className="text-lav-dark">200+ five-star</span> Google Reviews
              </span>
              <ArrowUpRight className="size-4 text-grape/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============================== BRANDS =============================== */}
      <section className="overflow-hidden py-20">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-black tracking-[0.3em] text-grape/50 uppercase">
            Trusted by brands
            <Heart className="ml-2 inline size-3 text-blush-deep" />
          </p>
        </Reveal>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-16">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className={
                  i % 3 === 0
                    ? "font-display text-2xl font-black tracking-tight whitespace-nowrap text-grape/55 italic"
                    : i % 3 === 1
                      ? "text-xl font-black tracking-[0.3em] whitespace-nowrap text-grape/45 uppercase"
                      : "font-display text-2xl font-light tracking-widest whitespace-nowrap text-grape/55"
                }
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= COLLECTION ============================ */}
      <section className="bg-lav-soft py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-black tracking-tight text-ink">
              Our Cake Collection
            </h2>
            <p className="font-display mt-3 text-xl font-medium text-lav-dark italic">
              Something for every celebration
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 5) * 0.07}>
                <Link
                  href={`/cakes?cat=${c.slug}`}
                  className="group relative block aspect-[3/4.2] overflow-hidden rounded-[1.75rem] shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
                >
                  <Image
                    src={c.image}
                    alt={`${c.name} — Kekki Cakery collection`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-grape-ink/80 via-grape-ink/10 to-transparent" />
                  <div className="absolute right-3 left-3 bottom-3">
                    <div className="rounded-2xl border border-white/25 bg-white/15 p-3.5 backdrop-blur-md transition-colors duration-500 group-hover:bg-white/25">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-display text-base leading-tight font-black text-white sm:text-lg">
                          {c.name}
                        </p>
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/90 text-ink transition-all duration-500 group-hover:rotate-45">
                          <ArrowUpRight className="size-3.5" />
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[0.68rem] font-medium text-white/85">
                        {c.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ CTA ================================ */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-lav-deep via-lav-dark to-blue-deep p-10 text-white shadow-lift sm:p-16">
            <Heart className="absolute top-10 left-10 size-8 animate-float text-white/25" />
            <HeartOutline className="absolute bottom-12 left-1/3 size-12 animate-float-slow text-white/20" />
            <Sparkle className="absolute top-16 right-1/4 size-5 animate-wiggle text-gold" />
            <div className="absolute -right-20 -bottom-24 size-80 rounded-full bg-blue/30 blur-3xl" />
            <div className="absolute -top-20 -left-16 size-72 rounded-full bg-blush/25 blur-3xl" />

            <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-black tracking-[0.3em] text-blush uppercase">
                  Dreaming of something custom?
                </p>
                <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] font-black">
                  Show us what you love.
                  <br />
                  We&apos;ll bring it to <em className="text-blush italic">cake</em>.
                  <Heart className="ml-3 inline size-8 text-blush" />
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed font-medium text-white/80">
                  Send us your design references and event details through our cake quote
                  form to get started. It&apos;s quick, easy and obligation-free.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={QUOTE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-black tracking-wide text-lav-dark uppercase transition-all hover:-translate-y-1 hover:bg-blush hover:text-grape-ink hover:shadow-lift"
                  >
                    Get a Cake Quote
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-[0.9rem] text-sm font-black tracking-wide text-white uppercase transition-all hover:border-white hover:bg-white/10"
                  >
                    See the Gallery
                  </Link>
                </div>
                <p className="mt-6 text-xs font-semibold tracking-wide text-white/60">
                  Urgent orders based on availability · Quotes within 1 working day
                </p>
              </div>

              <div className="relative mx-auto shrink-0">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-white/40" />
                <Image
                  src="/kekki-mascot.png"
                  alt="Kekki mascot waving hello"
                  width={220}
                  height={220}
                  className="size-44 animate-float rounded-full border-4 border-white/40 object-cover shadow-lift sm:size-56"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-blush px-4 py-1.5 text-[0.65rem] font-black tracking-widest text-grape-ink whitespace-nowrap uppercase">
                  Ready when you are
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Kekki Club strip */}
        <Reveal delay={0.12}>
          <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-[2rem] border border-lav-line bg-white px-8 py-6 shadow-soft sm:flex-row">
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-soft text-blue-deep">
                <Gift className="size-5" />
              </span>
              <div>
                <p className="font-display text-lg leading-tight font-black text-ink">
                  Join the Kekki Club
                </p>
                <p className="text-xs font-medium text-grape/60">
                  Free at checkout — birthday treats, members-only codes & early drops.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["WELCOME10", "SWEET15", "FREEDEL"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-dashed border-lav-deep/50 bg-lav-soft px-4 py-2 text-xs font-black tracking-widest text-lav-dark"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================== INSTAGRAM ============================ */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">@kekkicakerysg</p>
              <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] font-black tracking-tight text-ink">
                Recently at Kekki
                <Heart className="ml-3 inline size-7 text-blush-deep" />
              </h2>
            </div>
            <a
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-ink/10 px-6 py-3 text-sm font-black text-ink uppercase transition-all hover:border-lav-deep hover:text-lav-dark"
            >
              More on Instagram
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {INSTAGRAM.map((post, i) => (
            <Reveal key={post.caption} delay={i * 0.06}>
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-3xl shadow-soft"
                aria-label={`${post.caption} — Kekki Cakery on Instagram`}
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-lav-dark/80 p-3 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
                  <InstagramIcon className="size-6 text-white" />
                  <p className="text-center text-[0.65rem] leading-snug font-semibold text-white/90">
                    {post.caption}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16 flex justify-center">
          <div className="flex items-center gap-3 opacity-60">
            <HeartOutline className="size-4 text-lav-deep" />
            <Logo />
            <HeartOutline className="size-4 text-lav-deep" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
