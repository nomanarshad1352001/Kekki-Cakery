"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/data";
import clsx from "clsx";

export function FaqAccordion() {
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <div className="space-y-12">
      {FAQS.map((group, gi) => (
        <div key={group.group}>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-lav-deep font-display text-sm font-black text-white">
              {gi + 1}
            </span>
            <h2 className="font-display text-2xl font-black text-ink">{group.group}</h2>
          </div>
          <div className="space-y-3">
            {group.items.map((item, ii) => {
              const id = `${gi}-${ii}`;
              const isOpen = open === id;
              return (
                <div
                  key={id}
                  className={clsx(
                    "overflow-hidden rounded-[1.5rem] border bg-white transition-all duration-300",
                    isOpen ? "border-lav-deep shadow-soft" : "border-lav-line"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-bold text-ink sm:text-lg">
                      {item.q}
                    </span>
                    <span
                      className={clsx(
                        "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-lav-deep bg-lav-deep text-white"
                          : "border-lav-line text-grape"
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed font-medium text-grape/75">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
