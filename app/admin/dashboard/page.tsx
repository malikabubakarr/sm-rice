"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, contactsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/order"),
          fetch("/api/contact"),
        ]);

        let products = { products: [] };
        let orders = { orders: [] };
        let contacts = { contacts: [] };

        if (productsRes.ok) {
          try {
            products = await productsRes.json();
          } catch (e) {
            console.error("Failed to parse products JSON:", e);
          }
        } else {
          console.error("Products API error:", productsRes.status);
        }

        if (ordersRes.ok) {
          try {
            orders = await ordersRes.json();
          } catch (e) {
            console.error("Failed to parse orders JSON:", e);
          }
        } else {
          console.error("Orders API error:", ordersRes.status);
        }

        if (contactsRes.ok) {
          try {
            contacts = await contactsRes.json();
          } catch (e) {
            console.error("Failed to parse contacts JSON:", e);
          }
        } else {
          console.error("Contacts API error:", contactsRes.status);
        }

        setStats({
          totalProducts: products.products?.length || 0,
          totalOrders: orders.orders?.length || 0,
          totalContacts: contacts.contacts?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats({
          totalProducts: 0,
          totalOrders: 0,
          totalContacts: 0,
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#5B3A1E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#6B4A2E] rounded-full blur-3xl"></div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20 relative z-10" />

      <div className="relative z-10 p-6">
        {/* Header Section */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5B3A1E] rounded-full mb-6 shadow-lg">
              <svg className="w-8 h-8 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-[#5B3A1E] tracking-tight mb-4">
              Admin Dashboard
            </h1>
            <p className="text-sm md:text-base text-[#6B5135] max-w-2xl mx-auto leading-relaxed">
              Welcome to the admin panel. Manage your products, orders, and contacts efficiently.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 animate-slide-up">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3] text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#5B3A1E] rounded-full mb-4">
                  <svg className="w-6 h-6 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-light text-[#5B3A1E]">Total Products</h3>
                <p className="text-2xl font-light text-[#6B4A2E] mt-2">{stats.totalProducts}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3] text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#5B3A1E] rounded-full mb-4">
                  <svg className="w-6 h-6 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-light text-[#5B3A1E]">Total Orders</h3>
                <p className="text-2xl font-light text-[#6B4A2E] mt-2">{stats.totalOrders}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3] text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#5B3A1E] rounded-full mb-4">
                  <svg className="w-6 h-6 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-lg font-light text-[#5B3A1E]">Total Contacts</h3>
                <p className="text-2xl font-light text-[#6B4A2E] mt-2">{stats.totalContacts}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="animate-slide-up">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-[#5B3A1E] mb-6 text-center">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3] text-center">
                <h4 className="text-base font-light text-[#5B3A1E] mb-4">Manage Products</h4>
                <a href="/admin/product" className="inline-block bg-[#5B3A1E] text-white px-4 py-2 rounded-lg font-light hover:bg-[#6B4A2E] transition-colors duration-300 text-sm">
                  Go to Products
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3] text-center">
                <h4 className="text-base font-light text-[#5B3A1E] mb-4">View Orders</h4>
                <a href="/admin/order" className="inline-block bg-[#5B3A1E] text-white px-4 py-2 rounded-lg font-light hover:bg-[#6B4A2E] transition-colors duration-300 text-sm">
                  Go to Orders
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3] text-center">
                <h4 className="text-base font-light text-[#5B3A1E] mb-4">Check Contacts</h4>
                <a href="/admin/contact" className="inline-block bg-[#5B3A1E] text-white px-4 py-2 rounded-lg font-light hover:bg-[#6B4A2E] transition-colors duration-300 text-sm">
                  Go to Contacts
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3] text-center">
                <h4 className="text-base font-light text-[#5B3A1E] mb-4">Dashboard Overview</h4>
                <button className="inline-block bg-[#5B3A1E] text-white px-4 py-2 rounded-lg font-light hover:bg-[#6B4A2E] transition-colors duration-300 text-sm">
                  Refresh Stats
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

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
    </div>
  );
}