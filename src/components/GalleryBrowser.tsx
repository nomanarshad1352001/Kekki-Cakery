"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Camera } from "lucide-react";
import { CATEGORIES, GALLERY, QUOTE_URL, categoryBySlug } from "@/lib/data";
import clsx from "clsx";

const FILTER_SLUGS = ["all", ...new Set(GALLERY.map((g) => g.category))];

export function GalleryBrowser() {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? GALLERY : GALLERY.filter((g) => g.category === cat);

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {FILTER_SLUGS.map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => setCat(slug)}
            className={clsx(
              "shrink-0 rounded-full border px-5 py-2.5 text-xs font-black tracking-wide whitespace-nowrap uppercase transition-all",
              cat === slug
                ? "border-lav-deep bg-lav-deep text-white shadow-soft"
                : "border-lav-line bg-white text-grape hover:border-lav hover:text-lav-dark"
            )}
          >
            {slug === "all" ? "All Cakes" : (categoryBySlug(slug)?.name ?? slug)}
          </button>
        ))}
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs font-bold text-grape/60">
        <Camera className="size-4 text-lav-deep" />
        Every photo below left the studio exactly as shown — love one? Quote it straight from the card.
      </p>

      <motion.div layout className="mt-6 columns-2 gap-4 sm:columns-3 lg:columns-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((g, i) => (
            <motion.div
              key={g.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] shadow-soft"
            >
              <Image
                src={g.image}
                alt={`${g.title} — custom ${categoryBySlug(g.category)?.name.toLowerCase()} cake by Kekki Cakery`}
                width={700}
                height={880}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-grape-ink/85 via-grape-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="text-[0.6rem] font-black tracking-[0.22em] text-blush uppercase">
                  {categoryBySlug(g.category)?.name}
                </p>
                <p className="font-display text-lg font-black text-white">{g.title}</p>
                <a
                  href={QUOTE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[0.68rem] font-black tracking-wide text-lav-dark uppercase transition hover:bg-blush hover:text-grape-ink"
                >
                  Get a cake like this
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
