// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";          // client component
import Footer from "../components/Footer";          // client component
import { CartProvider } from "../context/CartContext"; // client component
import CartSidebar from "../components/CartSidebar";    // client component
import WhatsAppButton from "../components/WhatsAppButton"; // client component

export const metadata = {
  title: "SM Rice",
  description: "Premium quality rice products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/logo.png" color="#5B3A1E" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <CartProvider>
          {/* Navbar (client component) */}
          <Navbar />

          {/* Cart Sidebar (client component) */}
          <CartSidebar />

          {/* Main content */}
          {children}

          {/* Footer */}
          <Footer />

          {/* Floating WhatsApp button */}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
