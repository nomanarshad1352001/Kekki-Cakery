"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartAddOn = { name: string; price: number };

export type ItemFulfillment = {
  method: "delivery" | "collection";
  date: string;
  slot: "am" | "pm";
  slotLabel: string;
};

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  unitPrice: number;
  qty: number;
  flavour?: string;
  addons: CartAddOn[];
  fulfillment?: ItemFulfillment;
  note?: string;
};

type NewItem = Omit<CartItem, "key">;

type CartContextType = {
  items: CartItem[];
  addItem: (item: NewItem) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

const makeKey = (i: NewItem) =>
  [
    i.slug,
    i.size,
    i.flavour ?? "-",
    i.addons.map((a) => a.name).join("+") || "-",
    i.fulfillment ? `${i.fulfillment.date}-${i.fulfillment.slot}` : "-",
  ].join("|");

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kekki-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* fresh start */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("kekki-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: NewItem) => {
    const key = makeKey(item);
    setItems((prev) => {
      const existing = prev.find((p) => p.key === key);
      if (existing) {
        return prev.map((p) =>
          p.key === key ? { ...p, qty: Math.min(p.qty + item.qty, 20) } : p
        );
      }
      return [...prev, { ...item, key }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback(
    (key: string) => setItems((prev) => prev.filter((p) => p.key !== key)),
    []
  );

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.key !== key)
        : prev.map((p) => (p.key === key ? { ...p, qty } : p))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    return {
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.unitPrice * i.qty, 0),
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        setQty,
        clear,
        count,
        subtotal,
        open,
        setOpen,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
