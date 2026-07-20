import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Leaf, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import productsBg from "../assets/products-bg.jpg";
import { phoneNumber } from "../components/Layout";
import { useProducts } from "@/lib/products-context";
import { useCart, inr } from "@/lib/cart";
import { API_BASE_URL } from "@/lib/api";
import { Star, MessageCircle, X, Search as SearchIcon, Filter } from "lucide-react";

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
      className="inline-flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-leaf px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-leaf-foreground transition-colors hover:bg-leaf/90"
    >
      {added ? <><Check className="h-3 w-3 sm:h-4 sm:w-4" /> Added</> : <><ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span></>}
    </button>
  );
}

function ReviewsModal({ productId, productTitle, onClose }: { productId: string; productTitle: string; onClose: () => void }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews initially
  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`);
      if (res.ok) setReviews(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    loadReviews();
  });

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment })
      });
      if (res.ok) {
        setName("");
        setComment("");
        setRating(5);
        loadReviews();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
          <h2 className="text-xl font-bold text-foreground">Reviews for {productTitle}</h2>
          <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Customer Reviews</h3>
            {loading ? (
              <p className="text-muted-foreground">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-muted-foreground italic">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-muted/20 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{r.name}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-4 w-4 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-card-foreground">{r.comment}</p>
                    <span className="mt-2 block text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-border pt-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Write a Review</h3>
            <form onSubmit={submitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground">Rating</label>
                <div className="mt-1 flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button type="button" key={s} onClick={() => setRating(s)} className="p-1">
                      <Star className={`h-6 w-6 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted hover:text-yellow-400'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Your Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Comment</label>
                <textarea required rows={3} value={comment} onChange={e => setComment(e.target.value)} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 shadow-sm focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf"></textarea>
              </div>
              <button disabled={submitting} type="submit" className="w-full rounded-lg bg-leaf px-4 py-2 font-semibold text-leaf-foreground hover:bg-leaf/90 disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const { products } = useProducts();
  const [reviewModalProduct, setReviewModalProduct] = useState<{ id: string, title: string } | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allTags = ["All", ...Array.from(new Set(products.map((p) => p.tag)))];

  const filteredProducts = products.filter((p) => {
    const matchesTag = selectedTag === "All" || p.tag === selectedTag;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

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

      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-muted/10 border-b border-border/50">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 text-muted-foreground mr-2 font-medium text-sm shrink-0">
              <Filter className="h-4 w-4" /> Filter:
            </div>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${selectedTag === tag
                    ? 'bg-leaf border-leaf text-white shadow-sm'
                    : 'bg-background border-border text-muted-foreground hover:border-leaf/50 hover:text-foreground'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72 shrink-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm shadow-sm transition-colors focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <button onClick={() => { setSelectedTag("All"); setSearchQuery(""); }} className="mt-4 text-leaf font-semibold hover:underline">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((c) => {
                const reviewCount = c.reviews?.length || 0;
                const avgRating = reviewCount > 0
                  ? (c.reviews!.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount).toFixed(1)
                  : null;

                return (
                  <div key={c.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <Link to={`/product/${c.id}`} className="relative aspect-square overflow-hidden block">
                      <img src={c.image} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={800} />
                      <span className="absolute left-2 top-2 sm:left-3 sm:top-3 inline-flex items-center gap-1 rounded-full bg-leaf px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-leaf-foreground">
                        <Leaf className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {c.tag}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-3 sm:p-5">
                      <Link to={`/product/${c.id}`} className="hover:text-leaf">
                        <h3 className="text-sm sm:text-lg font-bold text-card-foreground leading-tight line-clamp-1">{c.title}</h3>
                      </Link>
                      <p className="mt-1 flex-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">{c.desc}</p>
                      <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2">
                        <span className="text-base sm:text-xl font-bold text-foreground">{inr(c.price)}</span>
                        {c.mrp && <span className="text-[10px] sm:text-sm text-muted-foreground line-through">{inr(c.mrp)}</span>}
                      </div>
                      <div className="mt-1 flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground">
                        <Star className={`h-3 w-3 sm:h-4 sm:w-4 ${avgRating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                        {avgRating ? (
                          <><span className="font-medium text-foreground">{avgRating}</span> ({reviewCount})</>
                        ) : (
                          <span>No reviews</span>
                        )}
                      </div>
                      {c.reviews && c.reviews.length > 0 && (
                        <div className="hidden sm:block mt-3 rounded-lg bg-muted/30 p-2 sm:p-3 text-xs italic text-muted-foreground line-clamp-2 border border-border/50">
                          "{c.reviews[0].comment}" <span className="font-semibold text-foreground/80">— {c.reviews[0].name}</span>
                        </div>
                      )}
                      <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2">
                        <AddButton productId={c.id} />
                        <button
                          onClick={() => setReviewModalProduct({ id: c.id, title: c.title })}
                          className="hidden sm:inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground hover:text-leaf hover:bg-leaf/10"
                          title="Reviews"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {reviewModalProduct && (
        <ReviewsModal
          productId={reviewModalProduct.id}
          productTitle={reviewModalProduct.title}
          onClose={() => setReviewModalProduct(null)}
        />
      )}
    </>
  );
}
