"use client";

import { useState, useEffect } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();

  // Force light mode globally on this page
  useEffect(() => {
    document.documentElement.style.colorScheme = "light";
  }, []);

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
          address: { country, province, city, street, postalCode },
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
        router.push(`/thank-you?order=${encodeURIComponent(data.orderId)}`);
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
    <div
      className="min-h-screen py-10"
      style={{ backgroundColor: "#FAF7F1", color: "#4A2F18" }}
    >
      <div
        className="max-w-5xl mx-auto p-6 rounded-xl shadow-lg bg-white border"
        style={{ borderColor: "#E8D9C4" }}
      >
        <h1 className="text-3xl font-bold mb-6" style={{ color: "#5B3A1E" }}>
          Checkout
        </h1>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Customer Information</h2>

              <input
                className="input"
                placeholder="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="input"
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="input"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <h2 className="font-semibold text-lg mt-4">Shipping Address</h2>

              <input
                className="input"
                placeholder="Country *"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <input
                className="input"
                placeholder="Province / State *"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />

              <input
                className="input"
                placeholder="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                className="input"
                placeholder="Street / Area / House No *"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              <input
                className="input"
                placeholder="Postal Code *"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />

              <h2 className="font-semibold text-lg mt-4">Payment Method</h2>

              <div className="space-y-2 text-sm">
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>

                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                  />
                  Bank Transfer
                </label>

                {paymentMethod === "bank" && (
                  <div
                    className="text-xs border rounded p-3 bg-[#FFF6E5]"
                    style={{ borderColor: "#E8D9C4" }}
                  >
                    Transfer amount to our bank account. Use your Order ID as
                    reference.
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="space-y-3 border rounded-xl p-5 bg-[#FAF7F1]"
              style={{ borderColor: "#E8D9C4" }}
            >
              <h2 className="font-semibold text-lg">Order Summary</h2>

              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} × {item.productName}
                  </span>
                  <span>₨{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <hr style={{ borderColor: "#E8D9C4" }} />

              <p className="font-semibold text-lg">
                Total: ₨{totalAmount.toLocaleString()}
              </p>

              {error && <p className="text-red-600 text-xs">{error}</p>}

              {/* PLACE ORDER BUTTON WITH TRUCK ANIMATION */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading || formInvalid}
                className="truck-button w-full py-3 rounded-lg text-white mt-3 relative overflow-hidden"
                style={{
                  backgroundColor: loading || formInvalid ? "#B8A89A" : "#5B3A1E",
                }}
              >
                <span className="relative z-10">
                  {loading ? "Placing order..." : "Place Order"}
                </span>

                {/* Truck icon animation */}
                {loading && (
                  <div className="truck absolute top-1/2 left-0 w-8 h-8 -translate-y-1/2">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white w-full h-full animate-driveTruck"
                    >
                      <path d="M3 7h14v7H3V7zm0-2h14a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2zM8 12a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2zM5 18a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input styling and truck animation */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #E8D9C4;
          font-size: 14px;
          background: #ffffff;
          color: #4a2f18;
        }

        .input:focus {
          outline: none;
          border-color: #5b3a1e;
          box-shadow: 0 0 0 2px rgba(91, 58, 30, 0.1);
        }

        .animate-driveTruck {
          animation: driveTruck 2s linear forwards;
        }

        @keyframes driveTruck {
          0% {
            left: -20%;
            transform: translateY(-50%) scale(0.8);
          }
          50% {
            transform: translateY(-50%) scale(1);
          }
          100% {
            left: 110%;
            transform: translateY(-50%) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}