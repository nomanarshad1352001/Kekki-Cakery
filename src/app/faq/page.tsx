import type { Metadata } from "next";
import { ArrowUpRight, MessageCircleHeart } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QUOTE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ — Ordering, Delivery, Halal & Payment",
  description:
    "Answers on lead times, urgent orders, islandwide delivery, self-collection, halal certification, storage, PayNow and Kekki Club rewards.",
};

export default function FaqPage() {
  return (
    <>
      <section className="paper-dots border-b border-lav-line bg-lav-soft pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">
              Questions, answered sweetly
            </p>
            <h1 className="font-display mt-3 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-tight text-ink">
              Frequently asked{" "}
              <em className="squiggle font-light text-lav-dark italic">questions</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <FaqAccordion />
        </Reveal>

        <Reveal className="mt-14">
          <div className="rounded-[2.5rem] border border-lav-line bg-white p-8 text-center shadow-soft sm:p-10">
            <MessageCircleHeart className="mx-auto size-10 text-lav-deep" />
            <p className="font-display mt-4 text-2xl font-black text-ink">Still curious?</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed font-medium text-grape/70">
              The fastest way to reach a real human (who also pipes buttercream) is through
              our quote form — cake questions get priority seating.
            </p>
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-lav-deep px-8 py-4 text-sm font-black tracking-wide text-white uppercase shadow-lift transition-all hover:-translate-y-1 hover:bg-lav-dark"
            >
              Ask us anything
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
