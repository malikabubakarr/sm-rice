// components/ProductViewTracker.tsx
"use client";

import { useEffect } from "react";
import { trackViewContent } from "../utils/tiktokPixel";  // Adjust path to your tiktokPixel.tsx

interface Product {
  _id: string;
  name: string;
  spec: string;
  img?: string;
  price: number;
}

interface ProductViewTrackerProps {
  product: Product;
}

export default function ProductViewTracker({ product }: ProductViewTrackerProps) {
  useEffect(() => {
    // Track ViewContent when the product loads
    trackViewContent(product._id, product.price, 'PKR');
  }, [product]);  // Runs once when product data is available

  return null;  // No UI, just for tracking
}