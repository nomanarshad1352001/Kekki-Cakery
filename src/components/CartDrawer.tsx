"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { DELIVERY, money, QUOTE_URL } from "@/lib/data";
import { Mascot } from "@/components/Mascot";
import { formatShort, SLOTS } from "@/lib/availability";

export function CartDrawer() {
  const { open, setOpen, items, setQty, removeItem, subtotal, hydrated } = useCart();

  const toFree = Math.max(0, DELIVERY.freeOver - subtotal);
  const progress = Math.min(100, (subtotal / DELIVERY.freeOver) * 100);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-grape-ink/45 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-lav-line px-6 py-5">
              <p className="font-display text-xl font-black text-ink">
                Your Cake Box
                <span className="ml-2 text-sm font-semibold text-grape/50">
                  {hydrated ? items.length : 0} {items.length === 1 ? "item" : "items"}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="grid size-10 place-items-center rounded-full border border-lav-line bg-white text-grape transition hover:text-lav-dark"
              >
                <X className="size-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <Mascot
                  size={140}
                  alt="Kekki mascot"
                  className="size-36 animate-float rounded-full object-cover shadow-soft"
                />
                <p className="font-display text-2xl font-black text-ink">
                  Your box is feeling light
                </p>
                <p className="text-sm text-grape/70">
                  Every celebration deserves a centrepiece. Let&apos;s fix that.
                </p>
                <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                  <Link
                    href="/cakes"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-lav-deep px-6 py-3 text-sm font-bold text-white transition hover:bg-lav-dark"
                  >
                    Browse Cakes
                  </Link>
                  <a
                    href={QUOTE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-lav-line bg-white px-6 py-3 text-sm font-bold text-lav-dark transition hover:bg-lav-soft"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-lav-line px-6 py-4">
                  <div className="mb-2 flex justify-between text-xs font-semibold text-grape/70">
                    {toFree > 0 ? (
                      <span>
                        <span className="font-black text-lav-dark">{money(toFree)}</span> away from free delivery
                      </span>
                    ) : (
                      <span className="font-black text-emerald-600">Free delivery unlocked!</span>
                    )}
                    <span>{money(DELIVERY.freeOver)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-lav-soft">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="h-full rounded-full bg-gradient-to-r from-lav to-blush-deep"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <motion.div
                      layout
                      key={item.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 rounded-3xl border border-lav-line bg-white p-3.5 shadow-soft"
                    >
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-display text-[0.95rem] leading-tight font-bold text-ink">
                            {item.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="text-grape/40 transition hover:text-blush-deep"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-[0.7rem] font-medium text-grape/60">
                          {item.size}
                          {item.flavour ? ` · ${item.flavour}` : ""}
                        </p>
                        {item.addons.length > 0 && (
                          <p className="text-[0.65rem] text-grape/50">
                            + {item.addons.map((a) => a.name).join(", ")}
                          </p>
                        )}
                        {item.fulfillment && (
                          <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-lav-soft px-2 py-0.5 text-[0.62rem] font-bold text-lav-dark">
                            {item.fulfillment.method === "delivery" ? "Delivery" : "Collection"} ·{" "}
                            {formatShort(item.fulfillment.date)} ·{" "}
                            {SLOTS.find((s) => s.id === item.fulfillment?.slot)?.label}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-lav-line px-1.5 py-1">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(item.key, item.qty - 1)}
                              className="grid size-6 place-items-center rounded-full text-grape transition hover:bg-lav-soft"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-4 text-center text-xs font-black">{item.qty}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(item.key, item.qty + 1)}
                              className="grid size-6 place-items-center rounded-full text-grape transition hover:bg-lav-soft"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <p className="text-sm font-black text-ink">{money(item.unitPrice * item.qty)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-lav-line bg-white px-6 py-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-grape/70">Subtotal</span>
                    <span className="font-display text-2xl font-black text-ink">{money(subtotal)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-lav-deep py-4 text-sm font-black tracking-wide text-white uppercase transition-all hover:bg-lav-dark"
                  >
                    <ShoppingBag className="size-4" />
                    Checkout
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="mt-2.5 text-center text-[0.68rem] text-grape/50">
                    Cards & PayNow accepted · MUIS Halal-Certified kitchen
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
