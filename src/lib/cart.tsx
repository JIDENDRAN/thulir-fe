import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "thulir_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => ({
    items,
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.qty * i.price, 0),
    add: (item, qty = 1) =>
      setItems((prev) => {
        const ex = prev.find((p) => p.id === item.id);
        if (ex) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p));
        return [...prev, { ...item, qty }];
      }),
    remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
    setQty: (id, qty) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => (p.id === id ? { ...p, qty } : p)),
      ),
    clear: () => setItems([]),
  }), [items, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
