"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Heart, Sparkle } from "@/components/Doodles";

/**
 * Kekki mascot with a graceful branded fallback.
 * If the illustration can't load (e.g. asset missing from a deploy),
 * an animated heart badge renders in its place so the design never breaks.
 */
export function Mascot({
  size = 128,
  className,
  alt = "Kekki, the Kekki Cakery mascot",
  fill = false,
}: {
  size?: number;
  className?: string;
  alt?: string;
  fill?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={clsx(
          "relative grid place-items-center overflow-hidden rounded-full bg-gradient-to-br from-lav via-lav-deep to-blue-deep shadow-lift",
          fill && "absolute inset-0",
          className
        )}
        style={fill ? undefined : { width: size, height: size }}
      >
        <Heart className="size-[42%] animate-wiggle text-white drop-shadow-lg" />
        <Sparkle className="absolute top-[18%] right-[20%] size-[11%] text-blush" />
        <Sparkle className="absolute bottom-[20%] left-[18%] size-[9%] text-gold" />
        <span className="absolute inset-0 rounded-full border-2 border-dashed border-white/40" />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src="/kekki-mascot.png"
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src="/kekki-mascot.png"
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
