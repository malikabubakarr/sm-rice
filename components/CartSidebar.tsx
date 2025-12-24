"use client";

import { useCart, CartItem } from "../context/CartContext";
import { FC, useState } from "react";

const CartSidebar: FC = () => {
  const { isOpen, closeCart, items, removeFromCart, totalAmount, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setError("");

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please enter your Name, Phone, and Address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          products: items.map((item: CartItem) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok && data.success) {
        alert(`Order placed successfully! Order ID: ${data.orderId}`);
        clearCart();
        closeCart();
        setName("");
        setPhone("");
        setAddress("");
      } else {
        setError(data.error || "Failed to place order");
      }
    } catch {
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
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
        className={`fixed top-0 right-0 w-full sm:w-96 h-full z-50 transform transition-transform duration-300 flex flex-col
        bg-[#F5F5DC] dark:bg-[#1C1C1C]
        border-l border-[#E5D3B3] dark:border-neutral-700
        shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-4 sticky top-0 z-50
          bg-[#F5F5DC] dark:bg-[#1C1C1C]
          border-b border-[#E5D3B3] dark:border-neutral-700"
        >
          <h2 className="text-base font-semibold text-[#5B3A1E] dark:text-neutral-100">
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="text-2xl font-bold text-[#5B3A1E] dark:text-neutral-300 hover:text-[#C19A6B]"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-[#6B5135] dark:text-neutral-400">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center p-3 rounded-lg
                bg-white dark:bg-[#262626]
                shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="text-sm font-medium text-[#5B3A1E] dark:text-neutral-100">
                    {item.productName}
                  </p>
                  <p className="text-xs text-[#6B5135] dark:text-neutral-400">
                    {item.quantity} × ₨{item.price.toLocaleString("en-PK")} = ₨
                    {(item.price * item.quantity).toLocaleString("en-PK")}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-600 text-lg font-bold hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout */}
        {items.length > 0 && (
          <div
            className="p-4 space-y-2 sticky bottom-0
            bg-[#F5F5DC] dark:bg-[#1C1C1C]
            border-t border-[#E5D3B3] dark:border-neutral-700"
          >
            {["Name", "Phone", "Address"].map((label, i) => (
              <input
                key={i}
                type="text"
                placeholder={label}
                value={i === 0 ? name : i === 1 ? phone : address}
                onChange={(e) =>
                  i === 0
                    ? setName(e.target.value)
                    : i === 1
                    ? setPhone(e.target.value)
                    : setAddress(e.target.value)
                }
                className="w-full px-3 py-2 rounded-md text-sm
                bg-white dark:bg-[#262626]
                border border-[#E5D3B3] dark:border-neutral-600
                text-[#5B3A1E] dark:text-neutral-100
                focus:outline-none focus:ring-2 focus:ring-[#5B3A1E]"
              />
            ))}

            <p className="text-sm font-semibold text-[#5B3A1E] dark:text-neutral-100">
              Total: ₨{totalAmount.toLocaleString("en-PK")}
            </p>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-2 rounded-md text-sm font-medium text-white transition
              ${
                loading
                  ? "bg-[#6B4A2E] opacity-70 cursor-not-allowed"
                  : "bg-[#5B3A1E] hover:bg-[#6B4A2E]"
              }`}
            >
              {loading ? "Placing Order..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
