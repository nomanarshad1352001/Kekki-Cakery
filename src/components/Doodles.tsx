export function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function HeartOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 1l2.4 8.6L23 12l-8.6 2.4L12 23l-2.4-8.6L1 12l8.6-2.4L12 1z" />
    </svg>
  );
}

export function SquiggleSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d="M2 8 Q 12 2 22 8 T 42 8 T 62 8 T 82 8 T 102 8 T 122 8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/** Kekki wordmark — Fraunces logotype with a heart dot */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        className={`grid size-9 place-items-center rounded-full ${
          dark ? "bg-lav/25 text-blush" : "bg-lav-soft text-lav-deep"
        }`}
      >
        <Heart className="size-4" />
      </span>
      <span className="leading-none">
        <span
          className={`font-display block text-[1.35rem] font-black tracking-[0.08em] ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          KEKKI
        </span>
        <span
          className={`block text-[0.55rem] font-semibold tracking-[0.52em] ${
            dark ? "text-lav" : "text-lav-deep"
          }`}
        >
          CAKERY
        </span>
      </span>
    </span>
  );
}
