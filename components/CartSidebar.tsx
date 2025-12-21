"use client";

import { useCart, CartItem } from "../context/CartContext";
import { FC, useState } from "react";

const CartSidebar: FC = () => {
  const { isOpen, closeCart, items, removeFromCart, totalAmount, clearCart } = useCart();

  // User info
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
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
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

      let data: any = {};
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }

      console.log("Checkout response:", data);

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
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-[#F5F5DC] shadow-lg z-50 transform transition-transform duration-300 flex flex-col border-l border-[#E5D3B3] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#E5D3B3] sticky top-0 bg-[#F5F5DC] z-50">
          <h2 className="text-base text-[#5B3A1E] font-semibold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-2xl font-bold text-[#5B3A1E] hover:text-[#C19A6B]"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-[#6B5135] text-sm">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center p-2 bg-white rounded shadow-sm"
              >
                <div>
                  <p className="text-[#5B3A1E] text-sm font-medium">{item.productName}</p>
                  <p className="text-[#6B5135] text-xs">
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

        {/* User Info & Checkout */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#E5D3B3] space-y-2 sticky bottom-0 bg-[#F5F5DC]">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5D3B3] rounded focus:outline-none focus:ring-2 focus:ring-[#5B3A1E] text-sm"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5D3B3] rounded focus:outline-none focus:ring-2 focus:ring-[#5B3A1E] text-sm"
            />
            <input
              type="text"
              placeholder="Address (optional)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5D3B3] rounded focus:outline-none focus:ring-2 focus:ring-[#5B3A1E] text-sm"
            />

            <p className="text-[#5B3A1E] text-sm mt-2 mb-2 font-medium">
              Total: ₨{totalAmount.toLocaleString("en-PK")}
            </p>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              onClick={handleCheckout}
              className={`w-full py-2 rounded text-white text-sm ${
                loading
                  ? "bg-[#6B4A2E] cursor-not-allowed"
                  : "bg-[#5B3A1E] hover:bg-[#6B4A2E]"
              } transition-colors`}
              disabled={loading}
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
