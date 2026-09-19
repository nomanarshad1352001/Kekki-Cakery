import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck, CakeSlice, HandHeart, Leaf } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Mascot } from "@/components/Mascot";
import { Heart, HeartOutline, Sparkle } from "@/components/Doodles";
import { QUOTE_URL, px } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Kekki — Good Cakes, Brighter Days",
  description:
    "Kekki Cakery is a MUIS Halal-certified custom cakery in Singapore. Meet the bakers behind 12,000+ less-sweet, hand-piped celebration cakes.",
};

const BELIEFS = [
  {
    icon: CakeSlice,
    title: "Cake is the love language",
    desc: "A cake shows up to life's biggest seconds — first cries, first steps, forever yeses. We bake like we're invited, because we are.",
  },
  {
    icon: Leaf,
    title: "Less sweet, more everything",
    desc: "Sugar should carry flavour, not smother it. Our recipes are tuned gentler so the good stuff — vanilla, pandan, dark chocolate — sings.",
  },
  {
    icon: HandHeart,
    title: "Everyone gets a slice",
    desc: "Halal-certified, thoughtfully sourced and clearly labelled. No one should have to ask twice whether they can eat the cake.",
  },
];

const STATS = [
  { n: "12k+", label: "cakes hand-piped" },
  { n: "200+", label: "five-star reviews" },
  { n: "4.9", label: "Google rating" },
  { n: "100%", label: "Halal-certified" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-lav-line bg-lav-soft pt-40 pb-20">
        <HeartOutline className="absolute top-32 right-[10%] size-12 animate-float-slow text-lav" />
        <Sparkle className="absolute bottom-16 left-[8%] size-5 animate-wiggle text-gold" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">Our Story</p>
            <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-tight text-ink">
              Good cakes,{" "}
              <em className="squiggle font-light text-lav-dark italic">brighter days</em>
              <Heart className="ml-3 inline size-9 text-blush-deep" />
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed font-medium text-grape/80">
              Kekki started in a home kitchen with one oven, one piping bag and a stubborn
              belief: celebration cake in Singapore could be prettier, gentler and kinder
              to everyone at the table.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={px(5953870, 700)}
                    alt="Kekki baker hand-piping a chocolate cake in the studio kitchen"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={px(5964573, 700)}
                    alt="Fresh bakes being filled with cream at Kekki Cakery"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-lav-line bg-white px-6 py-3 shadow-lift">
                <Mascot
                  size={40}
                  alt="Kekki mascot"
                  className="size-10 rounded-full object-cover"
                />
                <p className="text-xs font-black tracking-wide whitespace-nowrap text-ink uppercase">
                  Founded with love · Singapore
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">From home oven to studio</p>
            <h2 className="font-display mt-4 text-[clamp(1.9rem,3.5vw,3rem)] leading-tight font-black tracking-tight text-ink">
              Twelve thousand cakes later, we still pipe every swirl by hand.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed font-medium text-grape/80">
              <p>
                What began as weekend bento cakes for friends turned into a full studio on
                Lavender Lane — a sunlit kitchen where every order still starts with a
                conversation about your celebration.
              </p>
              <p>
                Today we&apos;re the quiet backdrop to proposals, first birthdays, weddings
                and office farewells across the island, trusted by teams at Victoria&apos;s
                Secret, AIA and Randstad. And yes — we still taste-test every new flavour.
                Quality control is very important to us. Very.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-4 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-lav-line bg-white p-4 text-center shadow-soft">
                  <p className="font-display text-2xl font-black text-lav-dark sm:text-3xl">{s.n}</p>
                  <p className="mt-1 text-[0.62rem] leading-tight font-bold tracking-wide text-grape/60 uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Beliefs */}
      <section className="paper-dots border-y border-lav-line bg-cream-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">What we believe</p>
            <h2 className="font-display mt-3 text-[clamp(1.9rem,3.5vw,3rem)] font-black tracking-tight text-ink">
              Three things we&apos;ll never compromise
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.09}>
                <div className="h-full rounded-[2rem] border border-lav-line bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <span className="grid size-13 place-items-center rounded-2xl bg-lav-soft text-lav-dark">
                    <b.icon className="size-6" />
                  </span>
                  <p className="font-display mt-6 text-xl leading-snug font-black text-ink">{b.title}</p>
                  <p className="mt-3 text-sm leading-relaxed font-medium text-grape/70">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12">
            <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-gradient-to-br from-lav-deep to-blue-deep px-8 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
                  <BadgeCheck className="size-7" />
                </span>
                <div>
                  <p className="font-display text-2xl font-black">MUIS Halal-Certified kitchen</p>
                  <p className="mt-1 max-w-xl text-sm font-medium text-white/80">
                    Certified and audited so everyone at your table can enjoy with confidence —
                    no compromises, no fine print anxiety.
                  </p>
                </div>
              </div>
              <a
                href={QUOTE_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black tracking-wide text-lav-dark uppercase transition-all hover:-translate-y-1 hover:bg-blush hover:text-grape-ink"
              >
                Start your cake story
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
