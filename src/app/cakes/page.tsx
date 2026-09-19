import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CakesBrowser } from "@/components/CakesBrowser";
import { Reveal } from "@/components/Reveal";
import { Heart } from "@/components/Doodles";
import { QUOTE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Cake Collection — Custom Cakes for Every Celebration",
  description:
    "Browse Kekki Cakery's full collection: classic, bento, wedding, 3D, photo, kids, floral and gender reveal cakes. MUIS Halal-certified, ready in as fast as 3 days.",
};

export default function CakesPage() {
  return (
    <>
      <section className="paper-dots border-b border-lav-line bg-lav-soft pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
              The Cake Shop
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-tight text-ink">
              Something for every{" "}
              <em className="squiggle font-light text-lav-dark italic">celebration</em>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed font-medium text-grape/80">
              Pick a ready-designed favourite and make it yours — or dream up something
              entirely new with our custom quote form.
              <Heart className="ml-2 inline size-4 text-blush-deep" />
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-24 text-center font-display text-2xl text-grape/50">Piping the catalogue…</div>}>
          <CakesBrowser />
        </Suspense>

        <Reveal className="mt-16">
          <div className="flex flex-col items-center justify-between gap-5 rounded-[2rem] border border-lav-line bg-white px-8 py-7 shadow-soft sm:flex-row">
            <div>
              <p className="font-display text-xl font-black text-ink">
                Can&apos;t find the one in your head?
              </p>
              <p className="mt-1 text-sm font-medium text-grape/70">
                Fully custom designs start with a quote — send references, get pricing in a day.
              </p>
            </div>
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-lav-deep px-7 py-3.5 text-sm font-black tracking-wide text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-lav-dark"
            >
              Get a Cake Quote
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
