"use client";

import { useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("Pakistan");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank">("cod");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formInvalid =
    !name.trim() ||
    !phone.trim() ||
    !email.trim() ||
    !province.trim() ||
    !city.trim() ||
    !street.trim() ||
    !postalCode.trim();

  const handlePlaceOrder = async () => {
    setError("");

    if (items.length === 0) {
      alert("Your cart is empty");
      router.push("/");
      return;
    }

    if (formInvalid) {
      setError("Please fill all required fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          paymentMethod,
          address: {
            country,
            province,
            city,
            street,
            postalCode,
          },
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
        clearCart();

        router.push(
          `/thank-you?order=${encodeURIComponent(data.orderId)}`
        );
      } else {
        setError(data.error || "Order failed. Try again.");
      }
    } catch (e) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT: Details */}
          <div className="space-y-4">
            <h2 className="font-semibold">Customer Information</h2>

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h2 className="font-semibold mt-3">Shipping Address</h2>

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="Country *"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="Province / State *"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="City *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="Street / Area / House No *"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

            <input
              className="border rounded w-full p-2 text-sm"
              placeholder="Postal Code *"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            <h2 className="font-semibold mt-3">Payment Method</h2>

            <div className="space-y-2">
              <label className="flex gap-2 text-sm">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>

              <label className="flex gap-2 text-sm">
                <input
                  type="radio"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                Bank Transfer
              </label>

              {paymentMethod === "bank" && (
                <div className="text-xs border rounded p-2 bg-amber-50">
                  Transfer amount to our bank account.  
                  Use your Order ID as reference.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="space-y-3 border rounded p-4 bg-gray-50">
            <h2 className="font-semibold">Order Summary</h2>

            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.quantity} × {item.productName}
                </span>
                <span>
                  ₨{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}

            <hr />

            <p className="font-semibold">
              Total: ₨{totalAmount.toLocaleString()}
            </p>

            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={loading || formInvalid}
              className={`w-full py-2 rounded text-white mt-2 ${
                loading || formInvalid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5B3A1E] hover:bg-[#6B4A2E]"
              }`}
            >
              {loading ? "Placing order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
