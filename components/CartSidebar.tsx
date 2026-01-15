"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const CartSidebar: FC = () => {
  const { isOpen, closeCart, items, removeFromCart, totalAmount } = useCart();
  const router = useRouter();

  // Force light mode on mobile browsers
  useEffect(() => {
    document.documentElement.style.colorScheme = "light";
  }, []);

  const goToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full z-50 flex flex-col
        transform transition-transform duration-300
        border-l shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "#FAF7F1",
          borderColor: "#E8D9C4",
          color: "#5B3A1E",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-4 py-3 border-b"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E8D9C4",
          }}
        >
          <h2 className="text-base font-semibold">Your Cart</h2>

          <button
            onClick={closeCart}
            className="text-2xl leading-none"
            style={{ color: "#5B3A1E" }}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm" style={{ color: "#7B6A58" }}>
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center p-3 rounded-lg shadow-sm"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div>
                  <p className="text-sm font-medium">{item.productName}</p>
                  <p className="text-xs" style={{ color: "#7B6A58" }}>
                    {item.quantity} × ₨{item.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-lg font-bold"
                  style={{ color: "#C0392B" }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="p-4 border-t space-y-3"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E8D9C4" }}
          >
            <p className="font-semibold text-sm">
              Total: ₨{totalAmount.toLocaleString()}
            </p>

            <button
              onClick={goToCheckout}
              className="w-full py-2 rounded-md text-sm font-medium text-white transition"
              style={{ backgroundColor: "#5B3A1E" }}
            >
              Go to Checkout
            </button>

            <button
              onClick={closeCart}
              className="w-full py-2 rounded-md text-sm border transition"
              style={{
                borderColor: "#E8D9C4",
                color: "#5B3A1E",
                backgroundColor: "#FFFFFF",
              }}
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
