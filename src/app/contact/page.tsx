import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin, Star, Store } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Heart, InstagramIcon } from "@/components/Doodles";
import { DELIVERY, IG_URL, QUOTE_URL, REVIEWS_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & Studio — Say Hello to Kekki",
  description:
    "Reach Kekki Cakery through our cake quote form, Instagram or Google Reviews, or visit our Lavender Lane studio for self-collection.",
};

const CARDS = [
  {
    title: "Cake Quote Form",
    desc: "The one true channel for custom designs, urgent orders and event queries. Replies within 1 working day.",
    href: QUOTE_URL,
    cta: "Open quote form",
    emoji: "♡",
    highlight: true,
  },
  {
    title: "Instagram",
    desc: "Daily bakes, behind-the-scenes piping and the occasional mascot cameo. DMs open for quick questions.",
    href: IG_URL,
    cta: "@kekkicakerysg",
    icon: "ig",
  },
  {
    title: "Google Reviews",
    desc: "Read 200+ honest reviews — or leave one and make a baker's entire week.",
    href: REVIEWS_URL,
    cta: "Read the reviews",
    icon: "g",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="paper-dots border-b border-lav-line bg-lav-soft pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">Say Hello</p>
            <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-tight text-ink">
              Let&apos;s talk{" "}
              <em className="squiggle font-light text-lav-dark italic">cake</em>
              <Heart className="ml-3 inline size-9 text-blush-deep" />
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={`group flex h-full flex-col rounded-[2rem] border p-7 transition-all duration-500 hover:-translate-y-2 ${
                  c.highlight
                    ? "border-lav-deep bg-gradient-to-br from-lav-deep to-blue-deep text-white shadow-lift"
                    : "border-lav-line bg-white shadow-soft hover:shadow-lift"
                }`}
              >
                <span
                  className={`grid size-12 place-items-center rounded-2xl ${
                    c.highlight ? "bg-white/15 text-blush" : "bg-lav-soft text-lav-dark"
                  }`}
                >
                  {c.icon === "ig" ? (
                    <InstagramIcon className="size-5" />
                  ) : c.icon === "g" ? (
                    <Star className="size-5" />
                  ) : (
                    <Heart className="size-5" />
                  )}
                </span>
                <p className={`font-display mt-5 text-xl font-black ${c.highlight ? "text-white" : "text-ink"}`}>
                  {c.title}
                </p>
                <p className={`mt-2 flex-1 text-sm leading-relaxed font-medium ${c.highlight ? "text-white/80" : "text-grape/70"}`}>
                  {c.desc}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-black tracking-wide uppercase ${
                    c.highlight ? "text-blush" : "text-lav-dark"
                  }`}
                >
                  {c.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Studio */}
        <Reveal className="mt-12">
          <div className="grid gap-8 overflow-hidden rounded-[2.5rem] border border-lav-line bg-white shadow-soft lg:grid-cols-2">
            <div className="relative min-h-72 overflow-hidden">
              <Image
                src="/kekki-mascot.png"
                alt="Kekki mascot welcoming you to the Lavender Lane studio"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-grape-ink/40 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-5 py-2.5 text-xs font-black tracking-wider text-ink uppercase backdrop-blur">
                Kekki Studio · Lavender Lane
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-soft text-blue-deep">
                <Store className="size-5" />
              </span>
              <h2 className="font-display mt-5 text-3xl font-black text-ink">Visit the studio</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed font-medium text-grape/70">
                Self-collections, tasting appointments and wedding consultations happen here.
                Drop by and smell the buttercream — Mondays are our bakers&apos; rest day.
              </p>
              <ul className="mt-6 space-y-3.5">
                <li className="flex items-start gap-3 rounded-2xl bg-cream px-4 py-3.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-lav-dark" />
                  <span className="text-sm font-semibold text-grape">{DELIVERY.address}</span>
                </li>
                <li className="flex items-start gap-3 rounded-2xl bg-cream px-4 py-3.5">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-lav-dark" />
                  <span className="text-sm font-semibold text-grape">{DELIVERY.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
