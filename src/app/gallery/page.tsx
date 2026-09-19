import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { GalleryBrowser } from "@/components/GalleryBrowser";
import { Heart } from "@/components/Doodles";

export const metadata: Metadata = {
  title: "Cake Gallery — Recent Custom Bakes",
  description:
    "Browse Kekki Cakery's gallery of recent custom cakes — weddings, birthdays, bento cakes and more. Love a design? Turn it into your own with our quote form.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="paper-dots border-b border-lav-line bg-lav-soft pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">The Gallery</p>
            <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-tight text-ink">
              Proof that cake can be{" "}
              <em className="squiggle font-light text-lav-dark italic">art</em>
              <Heart className="ml-3 inline size-9 text-blush-deep" />
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed font-medium text-grape/80">
              A little scrapbook of recent Kekki bakes. Filter by occasion, fall in love,
              then send it to us through the quote form.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <GalleryBrowser />
      </section>
    </>
  );
}
