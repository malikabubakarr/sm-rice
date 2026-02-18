// utils/tiktokPixel.tsx
declare global {
  interface Window {
    ttq?: any;
  }
}

export function trackAddToCart(
  productId: string,
  price: number,
  currency: string = 'USD',
  quantity: number = 1
): void {
  // Skip if on admin pages or if the TikTok pixel isn't loaded
  const pathname = window.location.pathname;
  if (pathname.startsWith("/admin") || !window.ttq) return;

  try {
    window.ttq.track('AddToCart', {
      content_id: productId,        // e.g., '12345' (your product's unique ID)
      content_type: 'product',      // This is standard for products
      value: price,                 // e.g., 29.99 (the product's price as a number)
      currency: currency,           // e.g., 'USD' (change if needed)
      quantity: quantity,           // e.g., 1 (how many items added)
      // You can add more details here if you have them, like product name
    });
  } catch (error) {
    console.error('TikTok Pixel AddToCart tracking error:', error);
  }
}

export function trackViewContent(
  productId: string,
  price: number,
  currency: string = 'PKR'
): void {
  // Skip if on admin pages or if the TikTok pixel isn't loaded
  const pathname = window.location.pathname;
  if (pathname.startsWith("/admin") || !window.ttq) return;

  try {
    window.ttq.track('ViewContent', {
      content_id: productId,
      content_type: 'product',
      value: price,
      currency: currency,
    });
  } catch (error) {
    console.error('TikTok Pixel ViewContent tracking error:', error);
  }
}