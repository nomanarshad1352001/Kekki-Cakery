"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, Sunrise, Sun } from "lucide-react";
import { getDayInfo, SLOTS, toISO, type SlotId } from "@/lib/availability";
import { QUOTE_URL } from "@/lib/data";
import clsx from "clsx";

export type DateSlot = { date: string; slot: SlotId };

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function DatePicker({
  leadDays = 4,
  value,
  onChange,
}: {
  leadDays?: number;
  value: DateSlot | null;
  onChange: (v: DateSlot | null) => void;
}) {
  const now = new Date();
  const [view, setView] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), 1)
  );

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = first.getDay();
    const list: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) list.push(null);
    for (let d = 1; d <= daysInMonth; d++) list.push(new Date(year, month, d));
    return list;
  }, [view]);

  const canPrev =
    view.getFullYear() > now.getFullYear() ||
    (view.getFullYear() === now.getFullYear() && view.getMonth() > now.getMonth());

  const maxView = new Date(now.getFullYear(), now.getMonth() + 3, 1);
  const canNext = view < maxView;

  const selectedInfo = value ? getDayInfo(value.date, leadDays) : null;

  return (
    <div className="rounded-3xl border border-lav-line bg-white p-4 sm:p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-lg font-bold text-ink">
          {view.toLocaleDateString("en-SG", { month: "long", year: "numeric" })}
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label="Previous month"
            disabled={!canPrev}
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
            className="grid size-8 place-items-center rounded-full border border-lav-line text-grape transition hover:bg-lav-soft disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            disabled={!canNext}
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
            className="grid size-8 place-items-center rounded-full border border-lav-line text-grape transition hover:bg-lav-soft disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="pb-1 text-[0.65rem] font-bold tracking-widest text-grape/50">
            {d}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`x-${i}`} />;
          const iso = toISO(d);
          const info = getDayInfo(iso, leadDays);
          const disabled = ["past", "lead", "closed", "blocked", "full"].includes(info.status);
          const selected = value?.date === iso;
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              title={info.reason}
              onClick={() => {
                if (selected) return;
                const fresh = getDayInfo(iso, leadDays);
                onChange({ date: iso, slot: fresh.amFull ? "pm" : "am" });
              }}
              className={clsx(
                "relative flex h-10 flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all",
                selected
                  ? "bg-lav-deep text-white shadow-glow"
                  : disabled
                    ? "text-grape/25 line-through decoration-grape/20"
                    : "text-ink hover:bg-lav-soft hover:text-lav-dark"
              )}
            >
              {d.getDate()}
              {!disabled && !selected && (
                <span
                  className={clsx(
                    "absolute bottom-1 size-1 rounded-full",
                    info.status === "limited" ? "bg-gold" : "bg-emerald-400"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-lav-line pt-3 text-[0.7rem] font-medium text-grape/70">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400" /> Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-gold" /> Almost full
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3" /> {leadDays}-day minimum lead time
        </span>
      </div>

      {value && selectedInfo && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold tracking-[0.18em] text-grape/60 uppercase">
            Time slot
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SLOTS.map((s) => {
              const full = s.id === "am" ? selectedInfo.amFull : selectedInfo.pmFull;
              const left = s.id === "am" ? selectedInfo.amLeft : selectedInfo.pmLeft;
              const active = value.slot === s.id;
              const Icon = s.id === "am" ? Sunrise : Sun;
              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={full}
                  onClick={() => onChange({ ...value, slot: s.id })}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-all",
                    active
                      ? "border-lav-deep bg-lav-soft shadow-glow"
                      : full
                        ? "border-lav-line bg-cream opacity-45"
                        : "border-lav-line hover:border-lav hover:bg-lav-soft/50"
                  )}
                >
                  <Icon className={clsx("size-4 shrink-0", active ? "text-lav-deep" : "text-grape/60")} />
                  <span className="leading-tight">
                    <span className="block text-xs font-bold text-ink">{s.label}</span>
                    <span className="block text-[0.65rem] text-grape/60">
                      {full ? "Full" : `${s.window} · ${left} left`}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p className="mt-4 text-[0.72rem] leading-relaxed text-grape/60">
        Need it sooner? Urgent orders are based on availability —{" "}
        <a href={QUOTE_URL} target="_blank" rel="noreferrer" className="font-semibold text-lav-dark underline underline-offset-2">
          request a rush quote
        </a>
        .
      </p>
    </div>
  );
}
