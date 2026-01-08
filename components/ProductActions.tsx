"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  spec: string;
  img?: string;
  price: number;
}

interface Props {
  product: Product;
}

export default function ProductActions({ product }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity,
    });
    alert("🛒 Product added to cart");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-2">
        <label className="font-medium text-[#5B3A1E]">Quantity:</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1 text-[#5B3A1E] border-[#E5D3B3]"
        />
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-[#5B3A1E] text-white py-3 rounded-full font-medium shadow-md hover:bg-[#6B4A2E] transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
}
