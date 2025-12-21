"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { products, Product } from "@/data/products";
import CartButton from "./CartButton"; // import cart button

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const lastScrollY = useRef(0);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  /* ================= HIDE NAVBAR ON SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 0);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scrolling down
        setHideNavbar(true);
      } else {
        // scrolling up
        setHideNavbar(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  /* ========================================================= */

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Navigate to product section on click
  const handleSelectProduct = (id: number) => {
    setSearchQuery("");
    router.push(`/products#product-${id}`);
  };

  const bgClass =
    pathname === "/" && !scrolled
      ? "bg-transparent"
      : "bg-gradient-to-r from-[#5B3A1E] via-[#3E2917] to-[#3E2917]";

  const shadowClass =
    pathname === "/" && !scrolled ? "" : "shadow-2xl border-b border-white/10";

  const paddingClass = pathname === "/" && !scrolled ? "py-6" : "py-2";

  const logoDesktopClass =
    pathname === "/" && !scrolled ? "h-20 w-auto" : "h-12 w-auto";

  const logoMobileClass =
    pathname === "/" && !scrolled ? "h-16 w-auto" : "h-8 w-auto";

  const searchDesktopClass =
    pathname === "/" && scrolled
      ? "opacity-0 invisible w-0"
      : "opacity-100 visible max-w-[15rem] w-full";

  return (
    <header
      className={`
        ${bgClass}
        ${shadowClass}
        text-white
        fixed top-0 w-full z-50
        transition-all duration-500
        ${hideNavbar ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div
        className={`max-w-7xl mx-auto px-6 ${paddingClass} transition-all duration-300`}
      >
        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link
              href="/"
              className="hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              <img
                src="/logo.png"
                alt="S.M Rice Logo"
                className={`${logoDesktopClass} transition-all duration-300`}
              />
            </Link>
          </div>

          {/* Links */}
          <div className="flex-1 flex justify-center">
            <nav className="flex space-x-8">
              <Link
                href="/products"
                className="relative hover:text-[#E5D3B3] transition-all duration-300 text-sm font-light group"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E5D3B3] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/about"
                className="relative hover:text-[#E5D3B3] transition-all duration-300 text-sm font-light group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E5D3B3] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/contact"
                className="relative hover:text-[#E5D3B3] transition-all duration-300 text-sm font-light group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E5D3B3] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/blog"
                className="relative hover:text-[#E5D3B3] transition-all duration-300 text-sm font-light group"
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E5D3B3] transition-all duration-300 group-hover:w-full" />
              </Link>
              
            </nav>
          </div>

          {/* Search + Cart */}
          <div
            className={`flex-1 flex justify-end items-center space-x-4 transition-all duration-300 ${searchDesktopClass} relative`}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#E5D3B3] shadow-lg border border-white/20 text-xs"
            />

            <CartButton /> {/* Cart Button */}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            {/* Left placeholder */}
            <div className="w-8" />

            {/* Logo */}
            <Link href="/">
              <img
                src="/logo.png"
                alt="S.M Rice Logo"
                className={`${logoMobileClass} transition-all duration-300`}
              />
            </Link>

            {/* Right: Cart + Mobile menu */}
            <div className="flex items-center space-x-2">
              <CartButton /> {/* Cart button on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile menu links */}
          {isMobileMenuOpen && (
            <div className="mt-2 bg-[#3E2917] text-white rounded-lg p-4 space-y-2">
              <Link href="/products" className="block text-sm font-light">
                Products
              </Link>
              <Link href="/about" className="block text-sm font-light">
                About
              </Link>
              <Link href="/contact" className="block text-sm font-light">
                Contact
              </Link>
              <Link href="/blog" className="block text-sm font-light">
                Blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}