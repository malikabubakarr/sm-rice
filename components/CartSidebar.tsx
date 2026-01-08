"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { FC } from "react";

const CartSidebar: FC = () => {
  const { isOpen, closeCart, items, removeFromCart, totalAmount } = useCart();
  const router = useRouter();

  const goToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full z-50 flex flex-col
        transform transition-transform duration-300
        bg-[#FAF7F1] dark:bg-[#121212]
        border-l border-[#E8D9C4] dark:border-neutral-700
        shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b bg-white dark:bg-[#1C1C1C]">
          <h2 className="text-base font-semibold">Your Cart</h2>

          <button onClick={closeCart} className="text-2xl leading-none">
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-[#1E1E1E] shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium">{item.productName}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ₨{item.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-600 text-lg font-bold"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t space-y-3 bg-white dark:bg-[#181818]">
            <p className="font-semibold text-sm">
              Total: ₨{totalAmount.toLocaleString()}
            </p>

            <button
              onClick={goToCheckout}
              className="w-full py-2 rounded-md text-sm font-medium text-white bg-[#5B3A1E] hover:bg-[#6B4A2E]"
            >
              Go to Checkout
            </button>

            <button
              onClick={closeCart}
              className="w-full py-2 rounded-md text-sm border"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
