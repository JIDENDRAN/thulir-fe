import capsules from "../assets/product-capsules.jpg";
import oil from "../assets/product-oil.jpg";
import hair from "../assets/product-hair.jpg";
import skin from "../assets/product-skin.jpg";
import health from "../assets/product-health.jpg";
import eye from "../assets/product-eye.jpg";

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

export const products: Product[] = [
  { id: "capsules", title: "Herbal Capsules", tag: "HERBAL", price: 450, mrp: 550, desc: "Pure herbal supplements for daily strength & immunity.", image: capsules },
  { id: "oil", title: "Herbal Pain Oil", tag: "HERBAL", price: 320, mrp: 400, desc: "Traditional oils for pain, joints and muscular relief.", image: oil },
  { id: "hair", title: "Hair Care Oil", tag: "HERBAL", price: 380, mrp: 450, desc: "Herbal hair oil & tonic for hair growth and greying.", image: hair },
  { id: "skin", title: "Skin Care Cream", tag: "HERBAL", price: 299, mrp: 399, desc: "Natural skin cream and pack — glow the herbal way.", image: skin },
  { id: "health", title: "Wellness Tonic", tag: "WELLNESS", price: 520, mrp: 620, desc: "General wellness herbal tonic for daily health.", image: health },
  { id: "eye", title: "Herbal Eye Drops", tag: "HERBAL", price: 180, mrp: 220, desc: "Gentle herbal eye drops and eye care.", image: eye },
];
