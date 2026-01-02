"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { products, Product } from "@/data/products";
import CartButton from "./CartButton";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const lastScrollY = useRef(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);
      setHideNavbar(currentScrollY > lastScrollY.current && currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products
  useEffect(() => {
    if (!searchQuery) return setSearchResults([]);
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
      className={`${
        bgClass
      } ${shadowClass} text-white fixed top-0 w-full z-50 transition-all duration-500 ${
        hideNavbar ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 ${paddingClass} transition-all duration-300`}
      >
        {/* Desktop */}
        <div className="hidden md:flex items-center">
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

          <div className="flex-1 flex justify-center">
            <nav className="flex space-x-8">
              {["products","about","contact","blog"].map((link) => (
                <Link
                  key={link}
                  href={`/${link}`}
                  className="relative hover:text-[#E5D3B3] transition-all duration-300 text-sm font-light group"
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E5D3B3] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

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
            <CartButton />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col">
          <div className="flex items-center justify-between relative">
            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition absolute left-0"
            >
              ☰
            </button>

            {/* Logo */}
            <Link href="/" className="mx-auto">
              <img
                src="/logo.png"
                alt="S.M Rice Logo"
                className={`${logoMobileClass} transition-all duration-300`}
              />
            </Link>

            {/* Cart */}
            <div className="absolute right-0">
              <CartButton />
            </div>
          </div>

          {/* Mobile menu + search bar */}
          {isMobileMenuOpen && (
            <div className="mt-2 bg-[#3E2917] text-white rounded-lg p-4 space-y-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#E5D3B3] shadow-md border border-white/20 text-sm"
              />
              {["products","about","contact","blog"].map((link) => (
                <Link
                  key={link}
                  href={`/${link}`}
                  className="block text-sm font-light"
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
