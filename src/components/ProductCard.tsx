"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Wand2 } from "lucide-react";
import type { Product } from "@/lib/data";
import { categoryBySlug, money } from "@/lib/data";
import { useCart } from "@/lib/cart";
import clsx from "clsx";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();

  const quickAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: product.sizes[0].name,
      unitPrice: product.basePrice,
      qty: 1,
      addons: [],
    });
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-lav-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
      style={{ transitionDelay: `${index * 20}ms` }}
    >
      <Link href={`/cakes/${product.slug}`} className="relative block aspect-[4/4.6] overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — ${categoryBySlug(product.category)?.name ?? "cake"} by Kekki Cakery`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-grape-ink/70 via-grape-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {product.badges[0] && (
          <span
            className={clsx(
              "absolute top-3 left-3 rounded-full px-3 py-1 text-[0.62rem] font-black tracking-wider uppercase",
              product.badges[0] === "New"
                ? "bg-mint text-emerald-900"
                : product.badges[0] === "Less Sweet"
                  ? "bg-blue-soft text-blue-deep"
                  : "bg-blush text-grape-ink"
            )}
          >
            {product.badges[0]}
          </span>
        )}

        {/* Always-visible customise hint */}
        <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/85 text-lav-dark shadow-soft backdrop-blur transition-all duration-500 group-hover:scale-0">
          <Wand2 className="size-4" />
        </span>

        {/* Hover reveal — tells customer exactly what's inside */}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 rounded-2xl border border-white/25 bg-white/20 p-3 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="flex items-center gap-1.5 text-[0.68rem] font-black tracking-wide text-white uppercase">
            <Wand2 className="size-3.5 shrink-0" />
            Click photo for more options
          </p>
          <p className="mt-1 text-[0.62rem] leading-snug font-semibold text-white/85">
            Sizes · 12 flavours · extra cream · name on cake
          </p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.62rem] font-black tracking-[0.22em] text-lav-deep uppercase">
          {categoryBySlug(product.category)?.name}
        </p>
        <Link
          href={`/cakes/${product.slug}`}
          className="font-display mt-1 text-lg leading-snug font-bold text-ink transition-colors hover:text-lav-dark"
        >
          {product.name}
        </Link>
        <div className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] font-semibold text-grape/60">
          <Star className="size-3.5 fill-gold text-gold" />
          {product.rating.toFixed(1)}
          <span className="text-grape/40">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <p className="text-sm font-medium text-grape/60">
            from <span className="font-display text-xl font-black text-ink">{money(product.basePrice)}</span>
          </p>
          <span className="text-[0.62rem] font-bold tracking-wider text-grape/40 uppercase">
            {product.leadDays}-day lead
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`Buy ${product.name}`}
            className="group/btn flex flex-1 items-center justify-center gap-2 rounded-full bg-lav-deep py-3 text-[0.7rem] font-black tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-lav-dark hover:shadow-lift"
          >
            <ShoppingBag className="size-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            Buy This
          </button>
          <Link
            href={`/cakes/${product.slug}`}
            aria-label={`Customise ${product.name} — sizes, flavours and add-ons`}
            title="More options: sizes, flavours, extra cream, name on cake"
            className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-lav-line text-lav-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-lav-deep hover:bg-lav-soft"
          >
            <Wand2 className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
