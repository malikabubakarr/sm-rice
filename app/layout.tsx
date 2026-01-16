// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata = {
  title: "SM Rice | Premium Quality Pakistani Rice",
  description:
    "SM Rice offers premium quality Pakistani rice trusted for purity, export excellence, and superior taste.",
  keywords: [
    "SM Rice",
    "Pakistani Rice",
    "Basmati Rice",
    "Rice Exporter Pakistan",
    "Premium Rice",
    "Buy Rice Online",
    "Rice Supplier",
  ],
  authors: [{ name: "SM Rice" }],
  creator: "SM Rice",
  publisher: "SM Rice",

  colorScheme: "light",

  openGraph: {
    title: "SM Rice | Premium Quality Pakistani Rice",
    description:
      "Premium quality Pakistani rice trusted for purity & export excellence.",
    url: "https://www.smricetraders.com/",
    siteName: "SM Rice",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "SM Rice Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SM Rice | Premium Quality Pakistani Rice",
    description:
      "Premium quality Pakistani rice trusted for purity & export excellence.",
    images: ["/logo.png"],
  },

  // ✅ Correct favicon setup for Google
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Force Light Mode */}
        <meta name="color-scheme" content="light" />

        {/* Mobile Theme Color */}
        <meta name="theme-color" content="#F5F0E6" />

        {/* ✅ Updated Google-Friendly Favicons with New Files */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="bg-[#F5F0E6] text-[#5B3A1E]">
        <CartProvider>
          <Navbar />
          <CartSidebar />
          {children}
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}