"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export interface Product {
  _id: string;
  name: string;
  spec: string;
  img?: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const shortDesc =
    product.spec.length > 80
      ? product.spec.slice(0, 80) + "..."
      : product.spec;

  return (
    <div className="bg-white border border-[#E5D3B3] rounded-xl shadow-md p-6 hover:scale-105 transition flex flex-col">
      <Link href={`/products/${product._id}`} className="relative h-72 mb-5 block">
        <Image
          src={product.img || "/rice-product-feature.png"}
          alt={product.name}
          fill
          className="object-contain p-3"
        />
      </Link>

      <Link href={`/products/${product._id}`}>
        <h2 className="text-xl font-semibold text-[#5B3A1E] hover:underline">
          {product.name}
        </h2>
      </Link>

      <p className="mt-1 text-sm leading-relaxed text-[#6B5135]">
        <span className="font-semibold text-[#5B3A1E]">Description:</span>{" "}
        {showFullDesc ? product.spec : shortDesc}
        {product.spec.length > 80 && (
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="ml-1 text-[#5B3A1E] font-medium hover:underline"
          >
            {showFullDesc ? "Read Less" : "Read More"}
          </button>
        )}
      </p>

      <p className="mt-3 font-bold text-[#6B4A2E]">
        PKR {product.price.toLocaleString()}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <label className="text-sm font-medium text-[#5B3A1E]">Qty:</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20 text-[#5B3A1E] border-[#E5D3B3] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5B3A1E]"
        />
      </div>

      <button
        onClick={() => {
          addToCart({
            productId: product._id,
            productName: product.name,
            price: product.price,
            quantity,
          });
          alert("🛒 Added to cart");
        }}
        className="mt-6 w-full bg-[#5B3A1E] text-white py-3 rounded-full font-medium shadow-md hover:bg-[#6B4A2E] transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
}
