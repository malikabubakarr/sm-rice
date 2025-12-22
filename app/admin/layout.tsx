"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) router.push("/admin/login");
  }, [router]);

  // ✅ Auto close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // ✅ Prevent background scroll on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/product" },
    { name: "Order", href: "/admin/order" },
    { name: "Contacts", href: "/admin/contact" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3]">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 md:w-56
          bg-gradient-to-b from-[#5B3A1E] to-[#F5F0E6]
          text-white p-6 flex flex-col
          transform transition-transform duration-300
          md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-[#E5D3B3]
        `}
      >
        <h2 className="text-lg font-light mb-8 border-b border-[#D2B48C] pb-2 text-[#E5D3B3]">
          Admin Panel
        </h2>

        <nav className="flex-1 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`block p-3 rounded-lg transition-colors text-sm font-light
                ${
                  pathname === link.href
                    ? "bg-[#E5D3B3] text-[#5B3A1E]"
                    : "hover:bg-[#E5D3B3] hover:text-[#5B3A1E]"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto text-xs border-t border-[#D2B48C] pt-2 text-white/80">
          Version 1.0
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-56 min-h-screen bg-white">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 md:h-20 bg-[#F5F0E6] shadow-sm px-4 md:px-6 sticky top-0 z-10 border-b border-[#E5D3B3]">
          <button
            className="md:hidden text-[#5B3A1E]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <h1 className="text-base font-light text-[#5B3A1E]">
            Admin Panel
          </h1>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}