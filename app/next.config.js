/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ✅ This tells Next.js to build a static site
  images: {
    unoptimized: true, // Needed if you use next/image for static export
  },
};

module.exports = nextConfig;
