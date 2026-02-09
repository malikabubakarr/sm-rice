// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import WhatsAppButton from "../components/WhatsAppButton";

// ✅ ADD THESE TWO IMPORTS
import Script from "next/script";
import TikTokPageView from "../components/TikTokPageView";

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
        <meta name="theme-color" content="#F5F0E6" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ TikTok Pixel */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;
                var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                ttq.setAndDefer=function(t,e){
                  t[e]=function(){
                    t.push([e].concat(Array.prototype.slice.call(arguments,0)))
                  }
                };
                for(var i=0;i<ttq.methods.length;i++){
                  ttq.setAndDefer(ttq,ttq.methods[i])
                }
                ttq.load('D60CE9JC77U10VTVUPA0');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      </head>

      <body className="bg-[#F5F0E6] text-[#5B3A1E]">
        <CartProvider>
          {/* ✅ Track route changes */}
          <TikTokPageView />

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
