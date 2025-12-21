"use client";

import { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/ProductCard";

type DBProduct = {
  _id: string;
  name: string;
  spec: string;    // Description/specification
  img?: string;
  price: number;
};

export default function ProductPage() {
  const [products, setProducts] = useState<DBProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#5B3A1E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#6B4A2E] rounded-full blur-3xl"></div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-28 relative z-10" />

      {/* Header Section */}
      <section className="px-6 mb-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5B3A1E] rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#5B3A1E] tracking-tight mb-4 animate-fade-in">
            Our Products
          </h1>
          <p className="text-sm md:text-base text-[#6B5135] max-w-2xl mx-auto leading-relaxed">
            Discover premium quality rice products, meticulously crafted for everyday cooking and export excellence. Each variety brings the finest flavors to your table.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    product={{
                      id: product._id,
                      name: product.name,
                      spec: product.spec,
                      img: product.img,
                      price: product.price,
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E5D3B3] rounded-full mb-4">
                <svg className="w-8 h-8 text-[#5B3A1E]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-[#6B5135] text-sm md:text-base font-light">
                No products available at the moment. Please check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}