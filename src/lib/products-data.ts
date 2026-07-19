export type Product = {
  id: string;
  title: string;
  tag: string;
  price: number;
  mrp?: number;
  desc: string;
  image: string;
  reviews?: any[];
};

export const products: Product[] = [];
