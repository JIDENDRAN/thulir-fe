import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { useCart, inr } from "@/lib/cart";
import { ShoppingCart, Check, Star, ArrowLeft, Heart } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetails,
});

function ProductDetails() {
  const { id } = useParams({ from: "/product/$id" });
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-foreground">Product not found</p>
        <Link to="/products" className="text-leaf hover:underline">
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    add({ id: product.id, title: product.title, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const specifications = product.specifications || {};
  const hasSpecs = Object.keys(specifications).length > 0;
  
  const reviewCount = product.reviews?.length || 0;
  const avgRating = reviewCount > 0
    ? (product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-leaf">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-leaf">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-8">
            <button className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-red-500">
              <Heart className="h-6 w-6" />
            </button>
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{product.title}</h1>
            
            {/* Rating summary */}
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
               <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${avgRating && s <= Math.round(Number(avgRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                  ))}
               </div>
               <span className="text-leaf hover:underline cursor-pointer">
                 {reviewCount > 0 ? `${reviewCount} Reviews` : 'Be the first to Review'}
               </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">{inr(product.price)}</span>
              {product.mrp && <span className="text-lg text-muted-foreground line-through">{inr(product.mrp)}</span>}
              {product.mrp && product.price < product.mrp && (
                <span className="rounded-full bg-leaf/10 px-2 py-0.5 text-xs font-bold text-leaf">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Pincode Check (Mock UI as per screenshot) */}
            <div className="mt-8 border-y border-border py-6">
               <p className="text-sm font-medium text-foreground mb-2">Delivery</p>
               <div className="flex gap-2 max-w-sm">
                 <input type="text" placeholder="Enter pincode" className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-leaf focus:outline-none" />
                 <button className="rounded-md bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">CHECK</button>
               </div>
               <p className="mt-2 text-xs text-muted-foreground">Enter pincode for exact delivery dates and charge</p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-leaf px-8 py-3 text-sm font-bold text-leaf-foreground shadow-sm hover:bg-leaf/90 transition-colors"
              >
                {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                {added ? 'Added' : 'Add to Cart'}
              </button>
              <button 
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-forest px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-forest/90 transition-colors"
              >
                Buy Now
              </button>
            </div>
            
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
               <Check className="h-4 w-4 text-leaf" /> Safe and Secure payments. 100% Authentic products
            </p>

          </div>
        </div>

        {/* Specifications & Description Section */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
             
             <div>
                {hasSpecs && (
                  <div className="mb-12">
                    <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-2 py-2 border-b border-border/50">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium text-foreground">{value as React.ReactNode}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                   <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">Description</h3>
                   <div className="prose prose-sm max-w-none text-muted-foreground">
                     <p>{product.desc}</p>
                   </div>
                </div>
             </div>

             {/* Right side: Summary of Reviews */}
             <div className="border-t border-border pt-12 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
                <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">Reviews & Ratings</h3>
                <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/20 rounded-xl border border-border/50">
                   {reviewCount === 0 ? (
                     <>
                       <div className="flex mb-2">
                         {[1, 2, 3, 4, 5].map((s) => (
                           <Star key={s} className="h-6 w-6 text-muted" />
                         ))}
                       </div>
                       <p className="text-sm font-medium text-muted-foreground mb-4">No Ratings Yet</p>
                       <p className="text-xs text-muted-foreground mb-4">Have You Used this Product?</p>
                       <button className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-forest/90">
                         Rate and Write a Review
                       </button>
                     </>
                   ) : (
                     <>
                        <div className="text-5xl font-bold text-foreground mb-2">{avgRating}</div>
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-5 w-5 ${s <= Math.round(Number(avgRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{reviewCount} Ratings</p>
                     </>
                   )}
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
