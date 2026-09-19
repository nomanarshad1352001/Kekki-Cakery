"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgePercent,
  BellRing,
  CakeSlice,
  Check,
  CreditCard,
  Heart,
  Loader2,
  Lock,
  MailCheck,
  PartyPopper,
  QrCode,
  ShoppingBag,
  Star,
  Store,
  Truck,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { DELIVERY, findDiscount, money, type Discount } from "@/lib/data";
import { formatLong, SLOTS } from "@/lib/availability";
import { DatePicker, type DateSlot } from "@/components/DatePicker";
import { Mascot } from "@/components/Mascot";
import clsx from "clsx";

type Placed = {
  id: string;
  name: string;
  email: string;
  method: "delivery" | "collection";
  date: string;
  slot: "am" | "pm";
  total: number;
  items: number;
};

export function CheckoutFlow() {
  const { items, subtotal, clear, hydrated } = useCart();

  // contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joinClub, setJoinClub] = useState(true);
  // fulfilment
  const [method, setMethod] = useState<"delivery" | "collection">("delivery");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [note, setNote] = useState("");
  const [dateSlot, setDateSlot] = useState<DateSlot | null>(null);
  // payment
  const [payMethod, setPayMethod] = useState<"card" | "paynow">("card");
  const [cardNo, setCardNo] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  // discount
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<Discount | null>(null);
  const [codeMsg, setCodeMsg] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);

  /* pricing */
  const discountAmt = useMemo(() => {
    if (!applied || applied.type !== "percent") return 0;
    return Math.round(subtotal * (applied.value / 100));
  }, [applied, subtotal]);

  const deliveryFee = useMemo(() => {
    if (method === "collection") return 0;
    if (applied?.type === "freeDelivery") return 0;
    if (subtotal - discountAmt >= DELIVERY.freeOver) return 0;
    return DELIVERY.fee;
  }, [method, applied, subtotal, discountAmt]);

  const total = Math.max(0, subtotal - discountAmt + deliveryFee);

  /* Prefill date from first item that carries one */
  const itemDates = items.filter((i) => i.fulfillment).map((i) => i.fulfillment!);
  const effectiveDateSlot: DateSlot | null =
    dateSlot ??
    (itemDates.length > 0 ? { date: itemDates[0].date, slot: itemDates[0].slot } : null);

  const applyCode = () => {
    setCodeMsg(null);
    if (!code.trim()) return;
    const found = findDiscount(code);
    if (!found) {
      setApplied(null);
      setCodeMsg("Hmm, that code doesn't ring a bell. Try WELCOME10!");
      return;
    }
    if (subtotal < found.minSpend) {
      setApplied(null);
      setCodeMsg(`This code needs a minimum spend of ${money(found.minSpend)}.`);
      return;
    }
    setApplied(found);
    setCodeMsg(`Applied — ${found.label}. Sweet!`);
  };

  const placeOrder = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.contact = "We'd love to know your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.contact = "A valid email keeps your receipt safe.";
    if (phone.trim().length < 8) e.contact = "A contact number helps our driver reach you.";
    if (method === "delivery" && (!address.trim() || postal.trim().length < 6))
      e.address = "We need a full delivery address and postal code.";
    if (!effectiveDateSlot) e.date = "Choose your cake day — fully booked dates are blocked automatically.";
    if (payMethod === "card") {
      if (cardNo.replace(/\s/g, "").length < 12 || !cardExp.trim() || cardCvc.trim().length < 3)
        e.payment = "Please complete your card details (this is a demo — any numbers work).";
    }
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector("[data-error]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const ds = effectiveDateSlot!;
      setPlaced({
        id: `KK-${Date.now().toString(36).toUpperCase().slice(-6)}`,
        name: name.trim(),
        email,
        method,
        date: ds.date,
        slot: ds.slot,
        total,
        items: items.reduce((n, i) => n + i.qty, 0),
      });
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  /* ------------------------------ SUCCESS VIEW ----------------------------- */
  if (placed) {
    const slotLabel = SLOTS.find((s) => s.id === placed.slot);
    return (
      <section className="paper-dots mx-auto max-w-3xl px-4 pt-40 pb-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.5rem] border border-lav-line bg-white shadow-lift"
        >
          <div className="relative bg-gradient-to-br from-lav-deep to-blue-deep px-8 py-12 text-center text-white">
            <PartyPopper className="mx-auto mb-4 size-10 animate-wiggle" />
            <p className="font-display text-3xl font-black sm:text-4xl">
              Order confirmed, {placed.name.split(" ")[0]}!
            </p>
            <p className="mt-3 text-sm font-semibold text-white/85">
              Order <span className="font-black text-blush">{placed.id}</span> · {placed.items}{" "}
              {placed.items === 1 ? "cake" : "cakes"} · {money(placed.total)}
            </p>
            <p className="mt-1 text-xs text-white/70">
              A confirmation email with cake care notes is on its way to {placed.email}.
            </p>
          </div>

          <div className="px-8 py-8">
            <div className="rounded-3xl bg-lav-soft p-6 text-center">
              <p className="text-xs font-black tracking-[0.24em] text-lav-dark uppercase">
                {placed.method === "delivery" ? "Delivery" : "Self-collection"}
              </p>
              <p className="font-display mt-2 text-2xl font-black text-ink">{formatLong(placed.date)}</p>
              <p className="mt-1 text-sm font-semibold text-grape/70">
                {slotLabel?.label} · {slotLabel?.window}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-xs font-black tracking-[0.24em] text-grape/60 uppercase">
                What happens next
              </p>
              <ol className="space-y-4">
                {[
                  { icon: MailCheck, t: "Confirmation email — sent", d: "Receipt, order summary and storage instructions." },
                  { icon: BellRing, t: "Gentle reminder — day before", d: "We'll nudge you 24h before your slot with handling tips." },
                  { icon: CakeSlice, t: "Bake day magic", d: `Your cake is piped fresh and ${placed.method === "delivery" ? "dispatched chilled" : "ready for collection"}.` },
                  { icon: Star, t: "After the party", d: "A little review request — tell us how the last crumb tasted." },
                ].map((s, i) => (
                  <motion.li
                    key={s.t}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    className="flex items-start gap-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-lav-soft text-lav-dark">
                      <s.icon className="size-4.5" />
                    </span>
                    <span>
                      <span className="block text-sm font-black text-ink">{s.t}</span>
                      <span className="block text-xs font-medium text-grape/60">{s.d}</span>
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="mt-8 rounded-3xl border border-dashed border-lav-deep/40 bg-blue-soft/60 p-5">
              <p className="text-sm font-black text-ink">Cake care 101</p>
              <p className="mt-1 text-xs leading-relaxed font-medium text-grape/70">
                Keep chilled until an hour before serving. Transport flat in the car footwell —
                never on the seat. Buttercream tastes best within 3 days (if it lasts that long).
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cakes"
                className="flex-1 rounded-full bg-lav-deep py-4 text-center text-sm font-black tracking-wide text-white uppercase transition hover:bg-lav-dark"
              >
                Bake another one
              </Link>
              <Link
                href="/gallery"
                className="flex-1 rounded-full border-2 border-lav-line py-4 text-center text-sm font-black tracking-wide text-lav-dark uppercase transition hover:bg-lav-soft"
              >
                Browse the gallery
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ------------------------------- EMPTY STATE ----------------------------- */
  if (hydrated && items.length === 0) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-44 pb-28 text-center sm:px-6">
        <Mascot
          size={160}
          alt="Kekki mascot"
          className="size-40 animate-float rounded-full object-cover shadow-lift"
        />
        <h1 className="font-display mt-8 text-4xl font-black text-ink">Nothing to check out… yet</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed font-medium text-grape/70">
          Your cake box is empty. Fill it with something worth celebrating and come right back.
        </p>
        <Link
          href="/cakes"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-lav-deep px-8 py-4 text-sm font-black tracking-wide text-white uppercase shadow-lift transition hover:-translate-y-0.5 hover:bg-lav-dark"
        >
          <ShoppingBag className="size-4" /> Browse the collection
        </Link>
      </section>
    );
  }

  /* -------------------------------- CHECKOUT ------------------------------- */
  return (
    <section className="mx-auto max-w-7xl px-4 pt-40 pb-24 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-black tracking-[0.3em] text-lav-deep uppercase">Almost cake o&apos;clock</p>
        <h1 className="font-display mt-2 text-[clamp(2.2rem,5vw,3.8rem)] font-black tracking-tight text-ink">
          Checkout
        </h1>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT — forms */}
        <div className="space-y-6">
          {/* Contact */}
          <div data-error={errors.contact ? true : undefined} className="rounded-[2rem] border border-lav-line bg-white p-6 shadow-soft sm:p-8">
            <StepTitle n={1} title="Your details" />
            {errors.contact && <FieldError msg={errors.contact} />}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Kekki Lover" className={inputCls} />
              </Field>
              <Field label="Email">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@sweethome.sg" type="email" className={inputCls} />
              </Field>
              <Field label="Phone" className="sm:col-span-2">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+65 9123 4567" className={inputCls} />
              </Field>
            </div>
            <button
              type="button"
              onClick={() => setJoinClub((v) => !v)}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-lav-deep/40 bg-lav-soft/50 px-4 py-3 text-left transition hover:bg-lav-soft"
            >
              <span className={clsx("grid size-5 place-items-center rounded-md border", joinClub ? "border-lav-deep bg-lav-deep text-white" : "border-lav-line bg-white")}>
                {joinClub && <Check className="size-3.5" />}
              </span>
              <span className="text-xs font-semibold text-grape">
                Join the <span className="font-black text-lav-dark">Kekki Club</span> — birthday month treats &
                members-only codes. Free forever.
              </span>
              <Heart className="ml-auto size-4 shrink-0 text-blush-deep" />
            </button>
          </div>

          {/* Fulfilment */}
          <div data-error={errors.address ? true : undefined} className="rounded-[2rem] border border-lav-line bg-white p-6 shadow-soft sm:p-8">
            <StepTitle n={2} title="Delivery or self-collection" />
            {errors.address && <FieldError msg={errors.address} />}
            <div className="grid grid-cols-2 gap-2">
              <MethodCard
                active={method === "delivery"}
                onClick={() => setMethod("delivery")}
                icon={<Truck className="size-5" />}
                title="Islandwide Delivery"
                desc={subtotal - discountAmt >= DELIVERY.freeOver ? "Free (over $120)!" : `${money(DELIVERY.fee)} · free above ${money(DELIVERY.freeOver)}`}
              />
              <MethodCard
                active={method === "collection"}
                onClick={() => setMethod("collection")}
                icon={<Store className="size-5" />}
                title="Self-Collection"
                desc="Free · Lavender Lane Studio"
              />
            </div>
            {method === "delivery" ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-[1.6fr_1fr]">
                <Field label="Delivery address">
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Block, street, unit number" className={inputCls} />
                </Field>
                <Field label="Postal code">
                  <input value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="123456" className={inputCls} />
                </Field>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-blue-soft p-4 text-xs leading-relaxed font-semibold text-blue-deep">
                {DELIVERY.address} · {DELIVERY.hours}. Bring your order number — we&apos;ll have
                your cake boxed, chilled and ready to go.
              </div>
            )}
            <Field label="Note for our bakers (optional)" className="mt-4">
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Wording on cake, allergies, gate code…" className={inputCls} />
            </Field>
          </div>

          {/* Date */}
          <div data-error={errors.date ? true : undefined} className="rounded-[2rem] border border-lav-line bg-white p-6 shadow-soft sm:p-8">
            <StepTitle n={3} title="Choose your cake day" />
            {errors.date && <FieldError msg={errors.date} />}
            {itemDates.length > 0 && !dateSlot && (
              <p className="mb-3 rounded-xl bg-lav-soft px-4 py-2 text-xs font-bold text-lav-dark">
                Pre-filled from your cake box — you can change it here for the whole order.
              </p>
            )}
            <DatePicker
              leadDays={4}
              value={effectiveDateSlot}
              onChange={setDateSlot}
            />
          </div>

          {/* Payment */}
          <div data-error={errors.payment ? true : undefined} className="rounded-[2rem] border border-lav-line bg-white p-6 shadow-soft sm:p-8">
            <StepTitle n={4} title="Payment" />
            {errors.payment && <FieldError msg={errors.payment} />}
            <div className="grid grid-cols-2 gap-2">
              <MethodCard
                active={payMethod === "card"}
                onClick={() => setPayMethod("card")}
                icon={<CreditCard className="size-5" />}
                title="Card"
                desc="Visa · Mastercard · Amex"
              />
              <MethodCard
                active={payMethod === "paynow"}
                onClick={() => setPayMethod("paynow")}
                icon={<QrCode className="size-5" />}
                title="PayNow"
                desc="Scan & pay · SG banks"
              />
            </div>

            <AnimatePresence mode="wait">
              {payMethod === "card" ? (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 grid gap-4 sm:grid-cols-[1.6fr_1fr_0.7fr]"
                >
                  <Field label="Card number">
                    <input
                      value={cardNo}
                      onChange={(e) =>
                        setCardNo(
                          e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
                        )
                      }
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Expiry">
                    <input value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="12 / 28" className={inputCls} />
                  </Field>
                  <Field label="CVC">
                    <input value={cardCvc} onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" inputMode="numeric" className={inputCls} />
                  </Field>
                </motion.div>
              ) : (
                <motion.div
                  key="paynow"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-center gap-5 rounded-2xl border border-lav-line bg-cream p-5"
                >
                  <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-lav-deep to-blue-deep text-white">
                    <QrCode className="size-10" />
                  </div>
                  <div className="text-xs leading-relaxed font-semibold text-grape/80">
                    <p className="font-black text-ink">PayNow to UEN 202312345K — KEKKI CAKERY PTE. LTD.</p>
                    <p className="mt-1">
                      Place your order and we&apos;ll WhatsApp / email the QR within minutes.
                      Your slot is reserved instantly. <span className="text-grape/50">(Demo flow)</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-4 flex items-center gap-2 text-[0.68rem] font-semibold text-grape/50">
              <Lock className="size-3.5" />
              Payments are processed securely. Prices are GST-inclusive.
            </p>
          </div>
        </div>

        {/* RIGHT — summary */}
        <div className="rounded-[2rem] border border-lav-line bg-white p-6 shadow-soft lg:sticky lg:top-36">
          <p className="font-display text-xl font-black text-ink">Order summary</p>
          <div className="mt-4 max-h-72 space-y-4 overflow-y-auto pr-1">
            {items.map((i) => (
              <div key={i.key} className="flex gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={i.image} alt={i.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-ink">{i.name}</p>
                  <p className="text-[0.68rem] font-medium text-grape/60">
                    {i.size} × {i.qty}
                    {i.flavour && ` · ${i.flavour.split(" ").slice(0, 2).join(" ")}`}
                  </p>
                  {i.addons.length > 0 && (
                    <p className="text-[0.62rem] text-grape/45">+{i.addons.length} add-on{i.addons.length > 1 ? "s" : ""}</p>
                  )}
                </div>
                <p className="text-sm font-black text-ink">{money(i.unitPrice * i.qty)}</p>
              </div>
            ))}
          </div>

          {/* Discount */}
          <div className="mt-5 border-t border-lav-line pt-5">
            {applied ? (
              <div className="flex items-center justify-between rounded-2xl bg-mint/70 px-4 py-3">
                <span className="inline-flex items-center gap-2 text-xs font-black text-emerald-900">
                  <BadgePercent className="size-4" />
                  {applied.code} — {applied.label}
                </span>
                <button type="button" onClick={() => { setApplied(null); setCode(""); }} aria-label="Remove code" className="text-emerald-900/60 hover:text-emerald-900">
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Promo code"
                  className="min-w-0 flex-1 rounded-full border border-lav-line bg-cream px-4 py-2.5 text-xs font-bold tracking-widest text-ink uppercase outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-grape/40 focus:border-lav-deep"
                />
                <button
                  type="button"
                  onClick={applyCode}
                  className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-xs font-black tracking-wide text-white uppercase transition hover:bg-lav-dark"
                >
                  Apply
                </button>
              </div>
            )}
            {codeMsg && (
              <p className={clsx("mt-2 text-[0.68rem] font-bold", applied ? "text-emerald-700" : "text-blush-deep")}>
                {codeMsg}
              </p>
            )}
            <p className="mt-2 text-[0.65rem] font-medium text-grape/40">
              Kekki Club codes: WELCOME10 · SWEET15 · FREEDEL
            </p>
          </div>

          {/* Totals */}
          <div className="mt-5 space-y-2 border-t border-lav-line pt-5 text-sm font-semibold text-grape/80">
            <Row label="Subtotal" value={money(subtotal)} />
            {discountAmt > 0 && <Row label={`Discount (${applied?.code})`} value={`−${money(discountAmt)}`} accent />}
            <Row
              label={method === "delivery" ? "Delivery" : "Self-collection"}
              value={deliveryFee === 0 ? "FREE" : money(deliveryFee)}
              accent={deliveryFee === 0}
            />
            <div className="flex items-center justify-between border-t border-lav-line pt-3">
              <span className="font-display text-lg font-black text-ink">Total</span>
              <span className="font-display text-3xl font-black text-ink">{money(total)}</span>
            </div>
            <p className="text-right text-[0.65rem] text-grape/45">GST (9%) included</p>
          </div>

          <button
            type="button"
            onClick={placeOrder}
            disabled={placing}
            className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-lav-deep py-4.5 text-sm font-black tracking-wide text-white uppercase shadow-lift transition-all hover:-translate-y-0.5 hover:bg-lav-dark disabled:opacity-70"
          >
            {placing ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Piping your order…
              </>
            ) : (
              <>
                <Lock className="size-4" /> Place order — {money(total)}
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[0.65rem] font-semibold text-grape/50">
            Instant confirmation · Reminder before your slot · Review request after the party
          </p>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-2xl border border-lav-line bg-cream px-4 py-3 text-sm font-semibold text-ink outline-none transition placeholder:font-medium placeholder:text-grape/35 focus:border-lav-deep focus:bg-white";

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid size-8 place-items-center rounded-full bg-lav-deep font-display text-sm font-black text-white">
        {n}
      </span>
      <h2 className="font-display text-xl font-black text-ink">{title}</h2>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-1.5 block text-[0.68rem] font-black tracking-[0.14em] text-grape/60 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mb-4 rounded-xl bg-blush px-4 py-2.5 text-xs font-bold text-grape-ink">{msg}</p>
  );
}

function MethodCard({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
        active ? "border-lav-deep bg-lav-soft shadow-glow" : "border-lav-line bg-cream hover:border-lav"
      )}
    >
      <span className={clsx(active ? "text-lav-deep" : "text-grape/50")}>{icon}</span>
      <span>
        <span className="block text-sm font-black text-ink">{title}</span>
        <span className="block text-[0.66rem] font-semibold text-grape/60">{desc}</span>
      </span>
    </button>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className={clsx("font-black", accent ? "text-emerald-600" : "text-ink")}>{value}</span>
    </div>
  );
}
