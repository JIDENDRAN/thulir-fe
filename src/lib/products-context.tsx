import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { type Product } from "./products-data";
import { fetchApi } from "./api";

type ProductsCtx = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
};

const Ctx = createContext<ProductsCtx | null>(null);
const KEY = "thulir_products_v1";

import capsules from "../assets/product-capsules.jpg";
import oil from "../assets/product-oil.jpg";
import hair from "../assets/product-hair.jpg";
import skin from "../assets/product-skin.jpg";
import health from "../assets/product-health.jpg";
import eye from "../assets/product-eye.jpg";

const imageMap: Record<string, string> = {
  capsules,
  oil,
  hair,
  skin,
  health,
  eye,
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchApi('/products');
        // Map string keys to actual image imports if they exist in imageMap
        const mappedData = data.map((p: Product) => ({
          ...p,
          image: imageMap[p.image] || p.image,
        }));
        setProducts(mappedData);
      } catch (err) {
        console.error('Failed to load products from API', err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const value = useMemo<ProductsCtx>(() => ({
    products,
    addProduct: async (product) => {
      try {
        const newProduct = await fetchApi('/products', {
          method: 'POST',
          body: JSON.stringify(product),
        });
        setProducts((prev) => [...prev, newProduct]);
      } catch (error) {
        console.error('Failed to add product', error);
        alert('Failed to add product: ' + (error as Error).message);
      }
    },
    updateProduct: async (id, updatedFields) => {
      try {
        const updated = await fetchApi(`/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedFields),
        });
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
      } catch (error) {
        console.error('Failed to update product', error);
        alert('Failed to update product: ' + (error as Error).message);
      }
    },
    deleteProduct: async (id) => {
      try {
        await fetchApi(`/products/${id}`, { method: 'DELETE' });
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('Failed to delete product: ' + (error as Error).message);
      }
    },
  }), [products]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProducts() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useProducts must be used within ProductsProvider");
  return c;
}
