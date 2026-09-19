"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  Minus,
  Package,
  PartyPopper,
  PenLine,
  Plus,
  ShoppingBag,
  Star,
  Store,
  Truck,
} from "lucide-react";
import {
  ADDONS,
  FLAVOURS,
  NAME_ON_CAKE_MAX,
  NAME_ON_CAKE_PRICE,
  QUOTE_URL,
  categoryBySlug,
  money,
  type Product,
} from "@/lib/data";
import { SLOTS } from "@/lib/availability";
import { DatePicker, type DateSlot } from "@/components/DatePicker";
import { useCart } from "@/lib/cart";
import { Heart } from "@/components/Doodles";
import clsx from "clsx";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [flavour, setFlavour] = useState(FLAVOURS[0].name);
  const [addonSlugs, setAddonSlugs] = useState<string[]>([]);
  const [cakeName, setCakeName] = useState("");
  const [qty, setQty] = useState(1);
  const [method, setMethod] = useState<"delivery" | "collection">("delivery");
  const [dateSlot, setDateSlot] = useState<DateSlot | null>(null);
  const [nudge, setNudge] = useState(false);

  const size = product.sizes[sizeIdx];
  const trimmedName = cakeName.trim();
  const addons = useMemo(() => {
    const picked = ADDONS.filter((a) => addonSlugs.includes(a.slug));
    return trimmedName
      ? [...picked, { name: `Name on cake — “${trimmedName}”`, price: NAME_ON_CAKE_PRICE }]
      : picked;
  }, [addonSlugs, trimmedName]);
  const unitPrice = product.basePrice + size.price + addons.reduce((n, a) => n + a.price, 0);
  const total = unitPrice * qty;

  const toggleAddon = (slug: string) =>
    setAddonSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const addToCart = () => {
    if (!dateSlot) {
      setNudge(true);
      document.getElementById("date-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setNudge(false), 1600);
      return;
    }
    const slotLabel = `${SLOTS.find((s) => s.id === dateSlot.slot)?.label} (${SLOTS.find((s) => s.id === dateSlot.slot)?.window})`;
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: size.name,
      unitPrice,
      qty,
      flavour,
      addons: addons.map((a) => ({ name: a.name, price: a.price })),
      fulfillment: { method, date: dateSlot.date, slot: dateSlot.slot, slotLabel },
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-36 pb-20 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-xs font-semibold text-grape/60">
        <Link href="/" className="hover:text-lav-dark">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/cakes" className="hover:text-lav-dark">Cakes</Link>
        <ChevronRight className="size-3" />
        <Link href={`/cakes?cat=${product.category}`} className="hover:text-lav-dark">
          {categoryBySlug(product.category)?.name}
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Image */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/4.4] overflow-hidden rounded-[2.5rem] shadow-lift"
          >
            <Image
              src={product.image}
              alt={`${product.name} cake by Kekki Cakery Singapore`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {product.badges[0] && (
              <span className="absolute top-5 left-5 rounded-full bg-blush px-4 py-1.5 text-[0.68rem] font-black tracking-wider text-grape-ink uppercase">
                {product.badges[0]}
              </span>
            )}
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-xs font-bold text-ink backdrop-blur">
              <BadgeCheck className="size-4 text-lav-dark" />
              MUIS Halal-Certified
            </div>
          </motion.div>
          <div className="mt-4 flex items-center justify-center gap-2 text-[0.7rem] font-semibold text-grape/50">
            <Heart className="size-3 text-blush-deep" />
            Every cake is piped to order — slight variations make yours one of one.
          </div>
        </div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-black tracking-[0.28em] text-lav-deep uppercase">
            {categoryBySlug(product.category)?.name}
          </p>
          <h1 className="font-display mt-2 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.02] font-black tracking-tight text-ink">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-grape/70">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold text-gold" />
              ))}
            </span>
            {product.rating.toFixed(1)} · {product.reviews} reviews
          </div>
          <p className="mt-5 text-base leading-relaxed font-medium text-grape/80">{product.desc}</p>

          {/* Size */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-black tracking-[0.2em] text-grape/60 uppercase">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSizeIdx(i)}
                  className={clsx(
                    "rounded-2xl border px-4 py-3 text-left transition-all",
                    i === sizeIdx
                      ? "border-lav-deep bg-lav-soft shadow-glow"
                      : "border-lav-line bg-white hover:border-lav"
                  )}
                >
                  <span className="block text-sm font-black text-ink">{s.name}</span>
                  <span className="block text-[0.68rem] font-semibold text-grape/60">
                    {s.serves}
                    {s.price > 0 && ` · +${money(s.price)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Flavour */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-black tracking-[0.2em] text-grape/60 uppercase">
              Flavour <span className="ml-1 font-semibold normal-case">— all less sweet, all lovely</span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {FLAVOURS.map((f) => (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => setFlavour(f.name)}
                  className={clsx(
                    "flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-left transition-all",
                    flavour === f.name
                      ? "border-lav-deep bg-lav-soft shadow-glow"
                      : "border-lav-line bg-white hover:border-lav"
                  )}
                >
                  <span
                    className="size-4 shrink-0 rounded-full border border-black/10"
                    style={{ background: f.swatch }}
                  />
                  <span className="text-[0.72rem] leading-tight font-bold text-ink">{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personalise — name on cake */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-black tracking-[0.2em] text-grape/60 uppercase">
              Make it theirs <span className="ml-1 font-semibold normal-case">— write it on the cake</span>
            </p>
            <div className="rounded-[1.75rem] border border-dashed border-lav-deep/40 bg-gradient-to-br from-lav-soft/80 to-blue-soft/80 p-5">
              <label className="flex items-center gap-2 text-xs font-black text-grape" htmlFor="cake-name">
                <PenLine className="size-4 text-lav-deep" />
                Name or short message on the cake
                <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-[0.62rem] font-black text-lav-dark">
                  +{money(NAME_ON_CAKE_PRICE)} · hand-piped
                </span>
              </label>
              <input
                id="cake-name"
                value={cakeName}
                onChange={(e) => setCakeName(e.target.value.slice(0, NAME_ON_CAKE_MAX))}
                placeholder="e.g. Happy 21st Aisha"
                maxLength={NAME_ON_CAKE_MAX}
                className="mt-3 w-full rounded-2xl border border-lav-line bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition placeholder:font-medium placeholder:text-grape/35 focus:border-lav-deep"
              />
              <div className="mt-1.5 flex items-center justify-between text-[0.65rem] font-semibold text-grape/50">
                <span>Leave blank to skip — no charge</span>
                <span>
                  {cakeName.length}/{NAME_ON_CAKE_MAX}
                </span>
              </div>
              <AnimatePresence>
                {trimmedName && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 flex items-center gap-3"
                  >
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-lav-line bg-white px-5 py-2.5 shadow-soft">
                      <PartyPopper className="size-4 shrink-0 text-blush-deep" />
                      <span className="font-display truncate text-lg font-black text-lav-dark italic">
                        {trimmedName}
                      </span>
                    </span>
                    <span className="text-[0.62rem] leading-tight font-semibold text-grape/50">
                      Your piped plaque
                      <br />
                      preview
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-black tracking-[0.2em] text-grape/60 uppercase">
              Glow-ups & finishing touches{" "}
              <span className="ml-1 font-semibold normal-case">— extra cream, extra beautiness</span>
            </p>
            <div className="space-y-2">
              {ADDONS.map((a) => {
                const on = addonSlugs.includes(a.slug);
                return (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() => toggleAddon(a.slug)}
                    className={clsx(
                      "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
                      on ? "border-lav-deep bg-lav-soft" : "border-lav-line bg-white hover:border-lav"
                    )}
                  >
                    <span
                      className={clsx(
                        "grid size-5 shrink-0 place-items-center rounded-md border transition-all",
                        on ? "border-lav-deep bg-lav-deep text-white" : "border-lav-line bg-cream"
                      )}
                    >
                      {on && <Check className="size-3.5" />}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-ink">{a.name}</span>
                      <span className="block text-[0.68rem] font-medium text-grape/60">{a.desc}</span>
                    </span>
                    <span className="font-display text-sm font-black text-lav-dark">+{money(a.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fulfilment */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-black tracking-[0.2em] text-grape/60 uppercase">
              Delivery or self-collection
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod("delivery")}
                className={clsx(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all",
                  method === "delivery" ? "border-lav-deep bg-lav-soft shadow-glow" : "border-lav-line bg-white hover:border-lav"
                )}
              >
                <Truck className={clsx("size-5", method === "delivery" ? "text-lav-deep" : "text-grape/50")} />
                <span className="text-left">
                  <span className="block text-sm font-black text-ink">Islandwide Delivery</span>
                  <span className="block text-[0.68rem] font-semibold text-grape/60">$12 · free above $120</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("collection")}
                className={clsx(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all",
                  method === "collection" ? "border-lav-deep bg-lav-soft shadow-glow" : "border-lav-line bg-white hover:border-lav"
                )}
              >
                <Store className={clsx("size-5", method === "collection" ? "text-lav-deep" : "text-grape/50")} />
                <span className="text-left">
                  <span className="block text-sm font-black text-ink">Self-Collection</span>
                  <span className="block text-[0.68rem] font-semibold text-grape/60">Free · Lavender Lane</span>
                </span>
              </button>
            </div>
          </div>

          {/* Date */}
          <div id="date-picker" className="mt-4 scroll-mt-32">
            <AnimatePresence>
              {nudge && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-2 rounded-xl bg-blush px-4 py-2 text-xs font-bold text-grape-ink"
                >
                  Almost there — pick your cake day below so we can reserve your slot.
                </motion.p>
              )}
            </AnimatePresence>
            <DatePicker leadDays={product.leadDays} value={dateSlot} onChange={setDateSlot} />
          </div>

          {/* Qty + Add */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-lav-line bg-white px-3 py-2.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-8 place-items-center rounded-full text-grape transition hover:bg-lav-soft"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-5 text-center font-display text-lg font-black">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="grid size-8 place-items-center rounded-full text-grape transition hover:bg-lav-soft"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={addToCart}
              className="group flex flex-1 items-center justify-center gap-3 rounded-full bg-lav-deep px-6 py-4 text-sm font-black tracking-wide text-white uppercase shadow-lift transition-all hover:-translate-y-0.5 hover:bg-lav-dark"
            >
              <ShoppingBag className="size-4" />
              Add to Cake Box — {money(total)}
            </button>
          </div>
          {!dateSlot && (
            <p className="mt-2.5 text-center text-[0.7rem] font-semibold text-grape/50">
              Select your {method === "delivery" ? "delivery" : "collection"} date above — fully booked dates are blocked automatically.
            </p>
          )}

          {/* Trust chips */}
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-soft px-3.5 py-2 text-[0.68rem] font-bold text-blue-deep">
              <Clock3 className="size-3.5" /> {product.leadDays}-day lead time
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lav-soft px-3.5 py-2 text-[0.68rem] font-bold text-lav-dark">
              <Package className="size-3.5" /> Chilled, sturdy transport box
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blush/60 px-3.5 py-2 text-[0.68rem] font-bold text-grape-ink">
              <BadgeCheck className="size-3.5" /> MUIS Halal-Certified
            </span>
          </div>

          <a
            href={QUOTE_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 flex items-center justify-between rounded-2xl border border-dashed border-lav-deep/40 bg-lav-soft/60 px-5 py-4 transition-all hover:bg-lav-soft"
          >
            <p className="text-sm font-semibold text-grape">
              Want this design <span className="font-black text-ink">even more custom</span>? Colours, tiers, toppers…
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-black text-lav-dark">
              Quote me <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
