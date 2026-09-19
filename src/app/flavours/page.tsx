import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Feather } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Heart, Sparkle } from "@/components/Doodles";
import { FLAVOURS, productBySlug } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cake Flavours — Less Sweet, More Flavour",
  description:
    "Twelve thoughtfully crafted flavours, from Earl Grey Lavender to Ondeh Ondeh. Halal-certified, less-sweet by house style, with egg-free options.",
};

export default function FlavoursPage() {
  return (
    <>
      <section className="paper-dots border-b border-lav-line bg-lav-soft pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">The Flavour Menu</p>
            <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-tight text-ink">
              Less sweet,{" "}
              <em className="squiggle font-light text-lav-dark italic">more flavour</em>
              <Heart className="ml-3 inline size-9 text-blush-deep" />
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed font-medium text-grape/80">
              Twelve house flavours, all baked to our signature less-sweet style — rated on a
              gentle three-dot sweetness scale. Tap any flavour to see it dressed as a cake.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLAVOURS.map((f, i) => {
            const pair = productBySlug(f.pair);
            return (
              <Reveal key={f.slug} delay={(i % 3) * 0.07}>
                <Link
                  href={`/cakes/${f.pair}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-lav-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
                  aria-label={`${f.name} — see it on the ${pair?.name ?? "cake"}`}
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={f.image}
                      alt={`${f.name} cake by Kekki Cakery`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-107"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-grape-ink/45 via-transparent to-transparent opacity-80" />
                    {f.tag && (
                      <span className="absolute top-3.5 right-3.5 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[0.6rem] font-black tracking-widest text-white uppercase backdrop-blur-md">
                        {f.tag}
                      </span>
                    )}
                    <span
                      className="absolute bottom-3.5 left-3.5 grid size-9 place-items-center rounded-full border-2 border-white/80 shadow-soft"
                      style={{ background: f.swatch }}
                      aria-hidden
                    >
                      <Sparkle className="size-3.5 text-white/90" />
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-display text-xl leading-snug font-black text-ink transition-colors group-hover:text-lav-dark">
                      {f.name}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed font-medium text-grape/70">
                      {f.notes}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-lav-line pt-4">
                      <span className="flex items-center gap-1.5" aria-label={`Sweetness level ${f.sweetness} of 3`}>
                        {[1, 2, 3].map((d) => (
                          <span
                            key={d}
                            className={`size-2 rounded-full ${d <= f.sweetness ? "bg-blush-deep" : "bg-lav-line"}`}
                          />
                        ))}
                        <span className="ml-1.5 text-[0.62rem] font-bold tracking-wider text-grape/50 uppercase">
                          sweetness
                        </span>
                      </span>
                      {f.sweetness === 1 && (
                        <span className="inline-flex items-center gap-1 text-[0.62rem] font-black text-blue-deep uppercase">
                          <Feather className="size-3" /> lightest
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-lav-soft px-4 py-3 transition-colors duration-500 group-hover:bg-lav-deep">
                      <span className="text-[0.7rem] font-black tracking-wide text-lav-dark uppercase transition-colors duration-500 group-hover:text-white">
                        Taste it in — {pair?.name}
                      </span>
                      <ArrowUpRight className="size-4 text-lav-dark transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2.5rem] bg-gradient-to-br from-blue-soft to-lav-soft px-8 py-10 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-lav-dark shadow-soft">
                <BadgeCheck className="size-6" />
              </span>
              <div>
                <p className="font-display text-xl font-black text-ink">Every flavour, every cake — Halal-certified.</p>
                <p className="mt-1 text-sm font-medium text-grape/70">
                  Egg-free versions available for tagged flavours. Just ask in the order note.
                </p>
              </div>
            </div>
            <Link
              href="/cakes"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-black tracking-wide text-white uppercase transition-all hover:-translate-y-1 hover:bg-lav-dark"
            >
              Pick a cake
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
