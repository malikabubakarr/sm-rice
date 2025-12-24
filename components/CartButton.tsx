"use client";

import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function CartButton() {
  const { totalItems, toggleCart } = useCart();
  const [animate, setAnimate] = useState(false);

  // Trigger animation when totalItems changes (e.g., a new order added)
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500); // animation lasts 0.5s
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <button
      onClick={toggleCart}
      className={`
        relative p-3 text-2xl rounded-full 
        bg-[#5B3A1E] text-white shadow-lg 
        hover:bg-[#6B4A2E] hover:scale-105 transition-transform duration-200
        ${animate ? "animate-pulse" : ""}
      `}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      🛒
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {totalItems}
        </span>
      )}
    </button>
  );
}
