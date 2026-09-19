/* Cake availability engine (demo data layer).
 * Mirrors how the real store works: fixed daily capacity split across
 * morning / afternoon slots, a minimum lead time, Monday closures and
 * owner-blocked blackout dates. Bookings are derived deterministically
 * from a date hash so the demo behaves consistently day to day. */

export const SLOT_CAPACITY = 5;
export const DAILY_CAPACITY = SLOT_CAPACITY * 2;

export const SLOTS = [
  { id: "am" as const, label: "Morning", window: "10am – 1pm" },
  { id: "pm" as const, label: "Afternoon", window: "2pm – 6pm" },
];

export type SlotId = (typeof SLOTS)[number]["id"];

export type DayStatus =
  | "past"
  | "lead"
  | "closed"
  | "blocked"
  | "full"
  | "limited"
  | "open";

export type DayInfo = {
  status: DayStatus;
  amLeft: number;
  pmLeft: number;
  amFull: boolean;
  pmFull: boolean;
  reason?: string;
};

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
};

export const toISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const todayMidnight = () => {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
};

export function getDayInfo(iso: string, leadDays = 4): DayInfo {
  const date = new Date(`${iso}T00:00:00`);
  const diffDays = Math.round(
    (date.getTime() - todayMidnight().getTime()) / 86400000
  );

  if (diffDays < 0) return { status: "past", amLeft: 0, pmLeft: 0, amFull: true, pmFull: true };
  if (diffDays < leadDays)
    return { status: "lead", amLeft: 0, pmLeft: 0, amFull: true, pmFull: true, reason: `Needs ${leadDays}+ days` };
  if (date.getDay() === 1)
    return { status: "closed", amLeft: 0, pmLeft: 0, amFull: true, pmFull: true, reason: "Closed Mondays" };

  const h = hash(iso);

  // ~1 in 11 days is owner-blocked (fully booked events, bake-off days)
  if (h % 11 === 0)
    return { status: "blocked", amLeft: 0, pmLeft: 0, amFull: true, pmFull: true, reason: "Fully booked" };

  const amBooked = h % (SLOT_CAPACITY + 1);
  const pmBooked = (h >> 4) % (SLOT_CAPACITY + 1);
  const amLeft = SLOT_CAPACITY - amBooked;
  const pmLeft = SLOT_CAPACITY - pmBooked;
  const amFull = amLeft <= 0;
  const pmFull = pmLeft <= 0;

  if (amFull && pmFull)
    return { status: "full", amLeft, pmLeft, amFull, pmFull, reason: "Fully booked" };

  const total = amLeft + pmLeft;
  return {
    status: total <= 3 ? "limited" : "open",
    amLeft,
    pmLeft,
    amFull,
    pmFull,
  };
}

export const formatLong = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatShort = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
  });
