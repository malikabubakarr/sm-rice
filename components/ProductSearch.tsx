"use client";

export interface Product {
  _id: string;
  name: string;
  spec: string;
  img: string;
  price: number;
  createdAt?: string;
}


export function ProductSearch({ products }: { products: Product[] }) {
  return (
    <div className="max-w-xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-3 border rounded-lg"
      />
    </div>
  );
}
