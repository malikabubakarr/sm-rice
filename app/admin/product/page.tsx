"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  description: string;
  price?: number;
  img?: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setImg("");
  };

  // Add OR Update product
  const handleSubmit = async () => {
    if (!name || !description || !price) return;

    const payload = {
      name,
      description,
      price: parseFloat(price),
      img,
    };

    await fetch("/api/products", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editingId ? { _id: editingId, ...payload } : payload
      ),
    });

    resetForm();
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (_id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });
    fetchProducts();
  };

  // Start editing
  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price?.toString() || "");
    setImg(product.img || "");
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#5B3A1E] text-center">
        Products Admin
      </h1>

      {/* Add / Edit Product Form */}
      <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded flex-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-3 rounded w-32"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="border p-3 rounded flex-1"
        />

        <button
          onClick={handleSubmit}
          className="bg-[#5B3A1E] text-white px-6 py-3 rounded hover:bg-[#C19A6B]"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-3 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#C19A6B] text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-[#F0E5D8]">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.description}</td>
                  <td className="p-3 font-semibold">
                    PKR {p.price?.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {p.img ? (
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-10 object-contain"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500 italic">
                  No products yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
