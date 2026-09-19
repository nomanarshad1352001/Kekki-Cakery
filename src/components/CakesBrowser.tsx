"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import clsx from "clsx";

export function CakesBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("cat") ?? "all";
  const [cat, setCat] = useState(initial);

  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  const select = (slug: string) => {
    setCat(slug);
    router.replace(slug === "all" ? "/cakes" : `/cakes?cat=${slug}`, { scroll: false });
  };

  return (
    <div>
      {/* Filter pills */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        <FilterPill active={cat === "all"} onClick={() => select("all")}>
          All Cakes
        </FilterPill>
        {CATEGORIES.map((c) => (
          <FilterPill key={c.slug} active={cat === c.slug} onClick={() => select(c.slug)}>
            {c.name}
          </FilterPill>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-grape/60">
        <p>
          Showing <span className="font-black text-ink">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "cake" : "cakes"}
          {cat !== "all" && (
            <>
              {" "}
              in <span className="text-lav-dark">{CATEGORIES.find((c) => c.slug === cat)?.name}</span>
            </>
          )}
        </p>
        <p className="inline-flex items-center gap-1.5 text-xs">
          <SlidersHorizontal className="size-3.5" />
          Fully booked dates are auto-blocked at checkout
        </p>
      </div>

      <motion.div layout className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "shrink-0 rounded-full border px-5 py-2.5 text-xs font-black tracking-wide whitespace-nowrap uppercase transition-all",
        active
          ? "border-lav-deep bg-lav-deep text-white shadow-soft"
          : "border-lav-line bg-white text-grape hover:border-lav hover:text-lav-dark"
      )}
    >
      {children}
    </button>
  );
}
