import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />          {/* CartButton will be inside Navbar */}
          <CartSidebar />     {/* Sidebar still at root level */}
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
