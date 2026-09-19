import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { Heart } from "@/components/Doodles";

/**
 * "Railing" review slide — an infinite horizontal rail of customer
 * love notes. Pauses on hover, masked edges for a seamless glide.
 */
export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="group relative overflow-hidden py-2">
      {/* edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-cream-2 to-transparent sm:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-cream-2 to-transparent sm:w-32"
      />

      <div className="flex w-max animate-marquee-slow items-stretch gap-5 group-hover:[animation-play-state:paused]">
        {doubled.map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            aria-hidden={i >= TESTIMONIALS.length}
            className="relative flex w-[19rem] shrink-0 flex-col rounded-[1.75rem] border border-lav-line bg-white p-6 shadow-soft transition-transform duration-500 hover:-translate-y-2 sm:w-[22rem]"
          >
            <Quote className="absolute top-5 right-5 size-8 rotate-180 text-lav-soft" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="size-3.5 fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="font-display mt-4 flex-1 text-[1.05rem] leading-snug font-medium text-ink italic">
              “{t.quote}”
            </blockquote>
            <footer className="mt-5 flex items-center gap-3 border-t border-lav-line pt-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-lav to-blue font-display text-sm font-black text-white">
                {t.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-ink">{t.name}</p>
                <p className="truncate text-[0.68rem] font-semibold text-grape/60">
                  ordered the {t.cake}
                </p>
              </div>
              <Heart className="ml-auto size-3.5 shrink-0 text-blush-deep" />
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
