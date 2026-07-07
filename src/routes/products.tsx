import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Leaf, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import productsBg from "../assets/products-bg.jpg";
import { phoneNumber } from "../components/Layout";
import { useProducts } from "@/lib/products-context";
import { useCart, inr } from "@/lib/cart";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Herbal Products | Capsules, Oils, Hair & Skin Care — Thulir Healthcare" },
      { name: "description", content: "Shop Thulir Healthcare's pure herbal capsules, oils, hair care, skin care and eye care. Natural, side-effect free formulations." },
      { property: "og:title", content: "Herbal Products — Thulir Healthcare" },
      { property: "og:description", content: "Authentic Siddha & ayurvedic herbal products for everyday wellness." },
    ],
  }),
  component: Products,
});

function AddButton({ productId }: { productId: string }) {
  const { add } = useCart();
  const { products } = useProducts();
  const [added, setAdded] = useState(false);
  const p = products.find((x) => x.id === productId);
  if (!p) return null;
  return (
    <button
      onClick={() => {
        add({ id: p.id, title: p.title, price: p.price, image: p.image });
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-leaf-foreground transition-colors hover:bg-leaf/90"
    >
      {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
    </button>
  );
}

function Products() {
  const { products } = useProducts();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={productsBg} alt="Herbal products" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 to-forest/40" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-earth">Herbal Range</p>
          <h1 className="mt-3 text-4xl font-bold text-leaf-foreground sm:text-5xl">Our Herbal Products</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Pure, natural and side-effect free — crafted using traditional Siddha and ayurvedic formulations.
          </p>
          <div className="mt-6">
            <Link to="/cart" className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-foreground shadow">
              <ShoppingCart className="h-4 w-4" /> View Cart
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((c) => (
              <div key={c.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden">
                  <img src={c.image} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={800} />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-leaf px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-leaf-foreground">
                    <Leaf className="h-3 w-3" /> {c.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-card-foreground">{c.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.desc}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground">{inr(c.price)}</span>
                    {c.mrp && <span className="text-sm text-muted-foreground line-through">{inr(c.mrp)}</span>}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <AddButton productId={c.id} />
                    <a
                      href={`tel:+91${phoneNumber}`}
                      aria-label="Call"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:text-leaf"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
