"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

/* ---------- TYPES ---------- */

type OrderProduct = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
};

type OrderAddress = {
  country: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
};

type Order = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: OrderAddress | null;
  products: OrderProduct[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

/* ---------- COMPONENT ---------- */

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  /* ---------- FETCH ORDERS ---------- */
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order");
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
      else setOrders([]);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------- UPDATE STATUS ---------- */
  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch("/api/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();

      if (data.success) fetchOrders();
      else alert("Failed to update status: " + (data.error || "Unknown error"));
    } catch (err) {
      console.error("Update status error:", err);
      alert("Error updating status");
    }

    setUpdating(null);
  };

  /* ---------- DELETE ORDER ---------- */
  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    setDeleting(id);

    try {
      const res = await fetch("/api/order", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) fetchOrders();
      else alert("Failed to delete order: " + (data.error || "Unknown error"));
    } catch (err) {
      console.error("Delete order error:", err);
      alert("Error deleting order");
    }

    setDeleting(null);
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-[#5B3A1E] mb-6">Manage Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 italic">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-[#C19A6B] text-white">
              <tr>
                <th className="p-3 border">Products</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Address</th>
                <th className="p-3 border">Qty</th>
                <th className="p-3 border">Total (₨)</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const totalQty = order.products.reduce(
                  (sum, p) => sum + p.quantity,
                  0
                );

                return (
                  <tr key={order._id} className="hover:bg-gray-50">
                    {/* PRODUCTS */}
                    <td className="p-2 font-medium">
                      {order.products.map((p) => p.productName).join(", ")}
                    </td>

                    {/* NAME */}
                    <td className="p-2">{order.name}</td>

                    {/* PHONE */}
                    <td className="p-2">{order.phone}</td>

                    {/* EMAIL */}
                    <td className="p-2">{order.email || "—"}</td>

                    {/* ADDRESS */}
                    <td className="p-2 text-sm leading-5">
                      {order.address ? (
                        <>
                          {order.address.street}
                          <br />
                          {order.address.city}, {order.address.province}
                          <br />
                          {order.address.country} — {order.address.postalCode}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* TOTAL QTY */}
                    <td className="p-2 text-center">{totalQty}</td>

                    {/* TOTAL PRICE */}
                    <td className="p-2 text-center">
                      ₨{order.totalAmount.toLocaleString("en-PK")}
                    </td>

                    {/* STATUS */}
                    <td className="p-2 text-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        disabled={updating === order._id}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      {updating === order._id && (
                        <span className="ml-2 text-sm text-gray-500">
                          Updating...
                        </span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="p-2 text-center text-sm">
                      {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        disabled={deleting === order._id}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {deleting === order._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
