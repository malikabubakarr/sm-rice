"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("order"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] dark:bg-[#121212] px-4">
      <div className="max-w-xl w-full bg-white dark:bg-[#191919] rounded-2xl shadow-xl p-6 md:p-8 border border-[#E5D3B3] dark:border-neutral-800">
        
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-3xl">✔️</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#5B3A1E] dark:text-neutral-100 text-center">
          Order Placed Successfully!
        </h1>

        <p className="text-sm text-center mt-2 text-[#6B5135] dark:text-neutral-400">
          Thank you for shopping with us — we’re processing your order.
        </p>

        {orderId && (
          <div className="mt-5 bg-[#FFF8EE] dark:bg-[#222222] border border-[#E5D3B3] dark:border-neutral-700 rounded-xl p-4 text-center">
            <p className="text-sm text-[#6B5135] dark:text-neutral-300">
              Your Order ID
            </p>
            <p className="font-semibold text-[#5B3A1E] dark:text-neutral-50 mt-1">
              {orderId}
            </p>

            <p className="text-xs mt-2 text-[#8A6A48] dark:text-neutral-400">
              Keep this for tracking and support.
            </p>
          </div>
        )}

        <p className="text-sm mt-5 text-center text-gray-600 dark:text-neutral-400">
          A confirmation email has been sent to your inbox.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <Link
            href="/"
            className="w-full py-2.5 rounded-md text-center font-medium bg-[#5B3A1E] hover:bg-[#6B4A2E] text-white transition"
          >
            Continue Shopping
          </Link>

          
        </div>
      </div>
    </div>
  );
}
