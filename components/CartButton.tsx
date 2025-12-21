"use client";

import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-xl hover:text-orange-500 transition-colors"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      🛒
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
}
