"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, Star } from "lucide-react";
import { Heart, HeartOutline, Sparkle } from "@/components/Doodles";
import { Mascot } from "@/components/Mascot";
import { QUOTE_URL } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const wordReveal = {
  hidden: { y: "115%", rotate: 5 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, delay: 0.25 + i * 0.09, ease: EASE },
  }),
};

function Word({ children, i, className }: { children: React.ReactNode; i: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span
        custom={i}
        variants={wordReveal}
        initial="hidden"
        animate="show"
        className={`inline-block will-change-transform ${className ?? ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* LED video backdrop with parallax */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 scale-[1.12]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/videos/5681755/pexels-photo-5681755.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920"
          className="size-full object-cover"
          aria-hidden
        >
          <source
            src="https://videos.pexels.com/video-files/5681755/5681755-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/5681755/5681755-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Luxury cream/light overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-cream/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/35" />

      {/* floating doodles */}
      <motion.div style={{ opacity: fade }}>
        <Heart className="absolute top-[22%] right-[12%] size-6 animate-float text-blush-deep/70" />
        <HeartOutline className="absolute top-[58%] right-[28%] size-8 animate-float-slow text-lav-deep/50" />
        <Sparkle className="absolute top-[30%] right-[38%] size-4 animate-wiggle text-gold" />
        <Sparkle className="absolute bottom-[24%] left-[46%] size-5 animate-float text-lav" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto w-full max-w-7xl px-4 pt-36 pb-28 sm:px-6 lg:px-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-lav-line bg-white/80 px-4 py-2 text-[0.68rem] font-black tracking-[0.24em] text-lav-dark uppercase backdrop-blur"
        >
          <BadgeCheck className="size-3.5" />
          MUIS Halal-Certified · Singapore
        </motion.span>

        <h1 className="font-display mt-7 max-w-3xl text-[clamp(3rem,8.5vw,6.5rem)] leading-[0.98] font-black tracking-tight text-ink">
          <Word i={0}>More</Word> <Word i={1}>than</Word>
          <br />
          <Word i={2}>just</Word>{" "}
          <Word i={3} className="squiggle font-light text-lav-dark italic">
            a&nbsp;cake
          </Word>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-7 max-w-md text-lg leading-relaxed font-medium text-grape"
        >
          Custom cakes for life&apos;s sweeter moments — baked less sweet, piped by
          hand and delivered with love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href={QUOTE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-lav-deep px-8 py-4 text-sm font-black tracking-wide text-white uppercase shadow-lift transition-all hover:-translate-y-1 hover:bg-lav-dark"
          >
            Get a Cake Quote
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href="/cakes"
            className="group inline-flex items-center gap-2.5 rounded-full border-2 border-ink/15 bg-white/70 px-8 py-[0.9rem] text-sm font-black tracking-wide text-ink uppercase backdrop-blur transition-all hover:-translate-y-1 hover:border-lav-deep hover:text-lav-dark"
          >
            Browse Cakes
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-grape/80"
        >
          <span className="inline-flex items-center gap-2">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-gold text-gold" />
              ))}
            </span>
            4.9 · 200+ Google reviews
          </span>
          <span className="hidden h-4 w-px bg-grape/20 sm:block" />
          <span>Ready in as fast as 4 days</span>
          <span className="hidden h-4 w-px bg-grape/20 sm:block" />
          <span>Free delivery above $120</span>
        </motion.div>
      </motion.div>

      {/* mascot bubble */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        className="absolute right-6 bottom-10 hidden items-end gap-3 md:flex lg:right-14"
      >
        <div className="relative mb-10 animate-float rounded-3xl rounded-br-sm border border-lav-line bg-white px-4 py-2.5 font-display text-lg font-black text-ink italic shadow-lift">
          Hi!
          <Heart className="absolute -top-2 -right-2 size-4 text-blush-deep" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-lav-deep/40" />
          <Mascot
            size={128}
            alt="Kekki, the Kekki Cakery mascot"
            className="size-32 animate-float-slow rounded-full object-cover shadow-lift"
          />
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-grape/60 sm:flex"
      >
        <span className="text-[0.6rem] font-black tracking-[0.3em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
