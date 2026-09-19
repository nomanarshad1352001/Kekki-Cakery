import Link from "next/link";
import { ArrowUpRight, MapPin, Clock3 } from "lucide-react";
import { Heart, InstagramIcon, Logo, Sparkle } from "@/components/Doodles";
import { Mascot } from "@/components/Mascot";
import { DELIVERY, IG_URL, QUOTE_URL, REVIEWS_URL } from "@/lib/data";

const SHOP_LINKS = [
  { href: "/cakes", label: "All Cakes" },
  { href: "/cakes?cat=bento", label: "Bento Cakes" },
  { href: "/cakes?cat=wedding", label: "Wedding Cakes" },
  { href: "/flavours", label: "Flavours" },
  { href: "/gallery", label: "Gallery" },
];

const HELP_LINKS = [
  { href: "/about", label: "About Kekki" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/checkout", label: "Checkout" },
  { href: "/project", label: "Project Spec" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-grape-deep text-cream">
      {/* soft glows */}
      <div className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-lav-deep/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-blue-deep/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* CTA strip */}
        <div className="mb-14 flex flex-col items-center gap-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:flex-row md:justify-between md:p-10">
          <div className="flex items-center gap-6">
            <div className="relative hidden shrink-0 sm:block">
              <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-lav/50" />
              <Mascot
                size={96}
                alt="Kekki the cake mascot waving hello"
                className="size-24 animate-float rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-2xl font-black italic sm:text-3xl">
                Good Cakes, Brighter Days
                <Heart className="ml-2 inline size-5 text-blush" />
              </p>
              <p className="mt-2 max-w-md text-sm text-cream/70">
                Show us what you love — we&apos;ll bring it to cake. Quotes answered within one working day.
              </p>
            </div>
          </div>
          <a
            href={QUOTE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-blush px-7 py-4 text-sm font-black tracking-wide text-grape-ink uppercase transition-all hover:-translate-y-1 hover:bg-cream hover:shadow-lift"
          >
            Get a Cake Quote
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Columns */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              Beautiful cakes, thoughtfully made in Singapore. Custom cakes for life&apos;s sweeter moments — less sweet, more flavour.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:-translate-y-1 hover:border-blush hover:text-blush"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={REVIEWS_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Google reviews"
                className="grid size-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:-translate-y-1 hover:border-blush hover:text-blush"
              >
                <span className="font-display text-sm font-black">G</span>
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-black tracking-[0.28em] text-lav uppercase">Shop</p>
            <ul className="space-y-2.5 text-sm text-cream/75">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-blush">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-black tracking-[0.28em] text-lav uppercase">Help</p>
            <ul className="space-y-2.5 text-sm text-cream/75">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-blush">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={QUOTE_URL} target="_blank" rel="noreferrer" className="transition hover:text-blush">
                  Custom Quote
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-black tracking-[0.28em] text-lav uppercase">Visit the Studio</p>
            <ul className="space-y-3 text-sm text-cream/75">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blush" />
                {DELIVERY.address}
              </li>
              <li className="flex gap-2.5">
                <Clock3 className="mt-0.5 size-4 shrink-0 text-blush" />
                {DELIVERY.hours}
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Visa", "Mastercard", "PayNow", "Atome"].map((p) => (
                <span key={p} className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-bold tracking-wider text-cream/70">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Giant signature wordmark */}
        <div aria-hidden className="pointer-events-none relative mt-20 -mb-4 overflow-hidden text-center select-none">
          <Heart className="absolute top-2 left-[12%] size-6 animate-float text-blush/60" />
          <Sparkle className="absolute top-6 right-[14%] size-5 animate-wiggle text-gold/70" />
          <p className="text-xs font-black tracking-[0.5em] text-cream/40 uppercase">
            Good cakes · brighter days
          </p>
          <p
            className="font-display leading-[0.85] font-black tracking-tight whitespace-nowrap text-transparent"
            style={{
              fontSize: "clamp(3rem, 11.5vw, 11.5rem)",
              backgroundImage:
                "linear-gradient(180deg, #b7a5e6 0%, #8a70cb 45%, rgba(138,112,203,0.35) 78%, rgba(44,36,80,0.9) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            KEKKI CAKERY
          </p>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-4 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[0.72rem] text-cream/50 sm:flex-row">
          <p>© 2026 Kekki Cakery. All rights reserved. Baked with love in Singapore.</p>
          <p className="inline-flex items-center gap-1.5">
            MUIS Halal-Certified
            <Sparkle className="size-3 text-gold" />
            Urgent orders based on availability
          </p>
        </div>
      </div>
    </footer>
  );
}
