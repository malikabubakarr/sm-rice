"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    ttq?: any;
  }
}

export default function TikTokPageView() {
  const pathname = usePathname();

  useEffect(() => {
    // 🔒 Skip admin panel pages
    if (!pathname || pathname.startsWith("/admin")) return;

    if (window.ttq) {
      window.ttq.page();
    }
  }, [pathname]);

  return null;
}
