"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS, QUOTE_URL } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { Heart, Logo } from "@/components/Doodles";
import clsx from "clsx";

const TICKER = [
  "Good Cakes, Brighter Days",
  "MUIS Halal-Certified",
  "Free islandwide delivery above $120",
  "200+ five-star Google reviews",
  "Less sweet, more flavour",
  "Custom cakes in as fast as 4 days",
];

export function Navbar() {
  const pathname = usePathname();
  const { count, setOpen, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement ticker */}
      <div className="overflow-hidden bg-gradient-to-r from-grape-deep via-lav-dark to-blue-deep py-2 text-cream">
        <div className="flex w-max animate-marquee items-center gap-8">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-8 text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
              {t}
              <Heart className="size-2.5 text-blush" />
            </span>
          ))}
        </div>
      </div>

      {/* Main bar */}
      <div
        className={clsx(
          "transition-all duration-500",
          scrolled
            ? "bg-cream/90 shadow-soft backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Kekki Cakery home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                    active
                      ? "bg-lav-soft text-lav-dark"
                      : "text-grape hover:bg-lav-soft/60 hover:text-lav-dark"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-lav-deep px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-lav-dark hover:shadow-lift md:inline-flex"
            >
              Get a Cake Quote
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open cart"
              className="relative grid size-11 place-items-center rounded-full border border-lav-line bg-white text-grape shadow-soft transition hover:-translate-y-0.5 hover:text-lav-dark"
            >
              <ShoppingBag className="size-5" />
              {hydrated && count > 0 && (
                <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-blush-deep text-[0.65rem] font-black text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-label="Toggle menu"
              className="grid size-11 place-items-center rounded-full border border-lav-line bg-white text-grape shadow-soft lg:hidden"
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-4 mt-2 rounded-3xl border border-lav-line bg-cream/95 p-4 shadow-lift backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between border-b border-lav-line/70 py-3.5 font-display text-xl font-bold text-ink last:border-0"
                >
                  {l.label}
                  <ArrowUpRight className="size-4 text-lav-deep" />
                </Link>
              ))}
            </nav>
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-lav-deep py-3.5 text-sm font-bold text-white"
            >
              Get a Cake Quote <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-3 text-center text-[0.68rem] font-medium tracking-wide text-grape/60">
              Urgent orders based on availability
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
