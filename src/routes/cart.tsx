import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, inr } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Thulir Healthcare" },
      { name: "description", content: "Review your herbal products before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, setQty, remove } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our herbal range and add something you love.</p>
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground">
          Shop Products <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((it) => (
            <li key={it.id} className="flex gap-4 p-4">
              <img src={it.image} alt={it.title} className="h-24 w-24 rounded-lg object-cover" width={96} height={96} />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{it.title}</h3>
                  <button onClick={() => remove(it.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{inr(it.price)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Decrease" className="p-2 hover:text-leaf">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Increase" className="p-2 hover:text-leaf">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-semibold text-foreground">{inr(it.price * it.qty)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{inr(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">Free</dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold text-leaf">{inr(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground"
          >
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/products" className="mt-3 inline-flex w-full items-center justify-center text-sm text-muted-foreground hover:text-leaf">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
