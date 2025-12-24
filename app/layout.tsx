"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>SM Rice</title>

        {/* Favicon for browsers */}
        <link rel="icon" href="/logo.png" type="image/png" />

        {/* Optional: Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />

        {/* Optional: Safari Pinned Tab */}
        <link rel="mask-icon" href="/logo.png" color="#5B3A1E" />

        {/* Optional: Manifest for PWA */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <CartProvider>
          <Navbar />          {/* CartButton inside Navbar */}
          <CartSidebar />     {/* Sidebar at root level */}
          
          {children}
          
          <Footer />
          <WhatsAppButton />  {/* Floating WhatsApp button */}
        </CartProvider>
      </body>
    </html>
  );
}
