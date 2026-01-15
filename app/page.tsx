"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";


interface Product {
  _id: string;
  name: string;
  img?: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`/api/products?limit=5`, { cache: "no-store" });
      if (!res.ok) {
        console.error("Failed to fetch products:", res.statusText);
        return;
      }
      const data = await res.json();
      console.log("Fetched products:", data.products[0]);
      setProducts(data.products || []);
    };
    getProducts();
  }, []);

  // Scroll-based parallax for hero background (desktop only)
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <>
  <Head>
    <title>SM Rice Pakistan | Premium Quality Rice for Home & Export</title>

    <meta
      name="description"
      content="SM Rice Pakistan offers premium quality basmati and non-basmati rice for home cooking and export. Trusted for purity, taste, and excellence."
    />

    <meta
      name="keywords"
      content="SM Rice, basmati rice Pakistan, premium rice, rice exporter Pakistan, buy rice online, Pakistani rice"
    />

    <meta name="author" content="SM Rice Pakistan" />
    <meta name="robots" content="index, follow" />

    {/* Open Graph / Facebook / WhatsApp */}
    <meta property="og:title" content="SM Rice Pakistan | Premium Quality Rice" />
    <meta
      property="og:description"
      content="Premium quality Pakistani rice for home and export. Trusted for purity and excellence."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/logo.png" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="SM Rice Pakistan | Premium Quality Rice" />
    <meta
      name="twitter:description"
      content="Premium quality Pakistani rice for home and export. Trusted for purity and excellence."
    />
    <meta name="twitter:image" content="/logo.png" />
  </Head>

    <main className="bg-[#F5F0E6] min-h-screen">

      {/* Hero Section */}
      <section className="relative text-white py-28 flex items-center justify-center" style={{ minHeight: "600px" }}>
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="w-full h-full">
            <Image src="/herodekstopbg.jpg" alt="Hero Background Desktop" fill className="hidden md:block object-cover" priority />
          </div>
        </motion.div>
        <div className="absolute inset-0 md:hidden">
          <Image src="/herobg-mobile.jpg" alt="Hero Background Mobile" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Mobile Hero Content */}
<div className="absolute bottom-12 left-0 right-0 z-10 md:hidden">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <div className="md:max-w-xl">

      {/* Animated Brand Heading */}
      <motion.h1 
        className="text-3xl font-semibold tracking-wide text-[#F8F3E8] drop-shadow-lg
        transition-all duration-500
        hover:tracking-widest hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span 
          className="text-[#E5D3B3] font-extrabold
          inline-block transition-transform duration-500 hover:rotate-2"
          whileHover={{ rotate: 5 }}
        >
          SM
        </motion.span>{" "}
        <motion.span 
          className="inline-block transition-all duration-500 hover:-rotate-1"
          whileHover={{ rotate: -3 }}
        >
          RICE
        </motion.span>
      </motion.h1>

      {/* Animated Tagline */}
      <motion.p 
        className="mt-2 text-sm text-[#F1E7D3] leading-relaxed font-light
        transition-all duration-500
        hover:text-[#E5D3B3] hover:scale-[1.02]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Premium Quality Pakistani Rice —{" "}
        <motion.span 
          className="font-medium text-[#E5D3B3]
          inline-block transition-all duration-500
          hover:text-white hover:underline underline-offset-4"
          whileHover={{ scale: 1.05 }}
        >
          Trusted for Purity & Export Excellence
        </motion.span>
      </motion.p>

      {/* CTA Buttons (unchanged) */}
      <motion.div 
        className="mt-6 flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link
          href="/products"
          className="bg-[#E5D3B3] text-[#5B3A1E] px-6 py-2 rounded-full text-sm font-medium
          hover:bg-[#6B4A2E] hover:text-white transition-all shadow-md hover:shadow-lg"
        >
          Explore Products
        </Link>
        <Link
          href="/about"
          className="border border-[#E5D3B3] text-[#E5D3B3] px-6 py-2 rounded-full text-sm font-medium
          hover:bg-[#E5D3B3] hover:text-[#5B3A1E] transition-all shadow-md hover:shadow-lg"
        >
          About Us
        </Link>
      </motion.div>

    </div>
  </div>
</div>


        {/* Desktop Hero Content */}
        <motion.div 
          className="hidden md:block absolute left-12 top-1/2 transform -translate-y-1/2 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-md text-left">
            <motion.h1 
              className="text-4xl font-semibold tracking-wide text-[#F8F3E8] drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-[#E5D3B3] font-extrabold">S.M</span> RICE
            </motion.h1>
            <motion.p 
              className="mt-3 text-lg text-[#F1E7D3] leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Premium Quality Pakistani Rice —{" "}
              <span className="font-medium text-[#E5D3B3]">Trusted for Purity & Export Excellence</span>
            </motion.p>
            <motion.div 
              className="mt-8 flex gap-4 justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/products" className="bg-[#E5D3B3] text-[#5B3A1E] px-8 py-3 rounded-full text-base font-medium hover:bg-[#6B4A2E] hover:text-white transition-all shadow-md hover:shadow-lg">
                Explore Products
              </Link>
              <Link href="/about" className="border border-[#E5D3B3] text-[#E5D3B3] px-8 py-3 rounded-full text-base font-medium hover:bg-[#E5D3B3] hover:text-[#5B3A1E] transition-all shadow-md hover:shadow-lg">
                About Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

{/* --- Product Grid Section --- */}
<motion.section 
  className="bg-white py-16 px-6"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

    {/* Featured Image */}
    <motion.div 
      className="relative h-64 w-full max-w-sm mb-12"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <Image src="/rice-product-feature.png" alt="Featured SM Rice Product" fill className="object-contain" />
    </motion.div>

    <div className="max-w-4xl">
      <motion.h2 
        className="text-3xl font-bold text-[#5B3A1E] mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        SM Rice Products
      </motion.h2>
      <motion.h3 
        className="text-lg font-medium text-[#6B4A2E] mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        No Measure, No Mess.
      </motion.h3>
      <motion.p 
        className="text-[#6B5135] text-base leading-relaxed mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Our quality products are carefully designed with your needs in mind. Whether you enjoy White Rice, Brown Rice, Jasmine Rice, Basmati Rice, Quinoa, or Pearl Couscous—we’ve got the size and flavor that’s convenient for you.
      </motion.p>
    </div>

    <motion.div 
      className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
      viewport={{ once: true }}
    >
      {products.slice(0, 6).map((product: any, index: number) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          <Link key={product._id} href="/products" className="block p-4 rounded-xl transition-shadow duration-300 hover:shadow-2xl bg-[#F5F0E6] group">
            <motion.div 
              className="relative w-full h-0 pb-[75%] mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={product.img || "/rice-product-feature.png"} alt={product.name} fill className="object-contain" />
            </motion.div>
            <h4 className="font-semibold text-base text-[#5B3A1E] group-hover:text-[#6B4A2E] transition-colors">{product.name}</h4>
            {/* Description removed */}
            <p className="mt-2 font-semibold text-sm text-[#6B4A2E]">PKR {product.price?.toLocaleString()}</p>
          </Link>
        </motion.div>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      viewport={{ once: true }}
    >
      <Link href="/products" className="inline-block mt-12 bg-[#5B3A1E] text-white px-8 py-3 rounded-full font-medium hover:bg-[#6B4A2E] transition-colors duration-300 shadow-xl transform hover:scale-[1.02]">
        See All SM Rice Products
      </Link>
    </motion.div>
  </div>
</motion.section>

{/* --- END: Product Introduction Section --- */}


      {/* --- Recipe Preview Section (Pakistani Focus) --- */}
<motion.section 
  className="bg-white py-16 px-6"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto">
    
    {/* Refined Heading and Description for clean, modern look */}
    <motion.h2 
      className="text-center text-3xl font-bold text-[#5B3A1E] mb-4 tracking-tight"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      A Taste of Pakistan: Rice Recipes
    </motion.h2>
    
    <motion.p 
      className="text-center text-[#6B5135] text-base italic max-w-4xl mx-auto mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Explore the rich and aromatic flavors of traditional South Asian cuisine. From savory <strong>Biryani</strong> and <strong>Pulao</strong> to sweet <strong>Zarda</strong>, elevate your next meal with SM Rice.
    </motion.p>

    {/* Recipe Grid - Ensuring full image visibility in uniform containers */}
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
      viewport={{ once: true }}
    >

      {/* Recipe Cards (Links Removed) */}
      {[{
        src: "/recipe-biryani.jpg",
        alt: "Authentic Chicken Biryani",
        title: "Authentic Chicken Biryani",
        subtitle: "Aromatic Layers of Flavor"
      }, {
        src: "/recipepulao.jpg",
        alt: "Mutton Pulao",
        title: "Mutton Pulao (Kabli Pulao)",
        subtitle: "Lightly Spiced Rice Dish"
      }, {
        src: "/recipe-fried-rice.jpg",
        alt: "Chinese Fried Rice",
        title: "Quick Chinese Fried Rice",
        subtitle: "Weeknight Meal Essential"
      }, {
        src: "/recipe-zarda.jpg",
        alt: "Traditional Zarda (Sweet Rice)",
        title: "Traditional Zarda (Sweet Rice)",
        subtitle: "Celebratory Sweet Treat"
      }].map((recipe, index) => (
        
        <motion.div
          key={index}
          className="block rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ rotateY: 5, scale: 1.05 }}
        >
          {/* 4:3 Aspect Ratio Container */}
          <div className="relative w-full h-0 pb-[75%]">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={recipe.src}
                alt={recipe.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          <div className="p-4 bg-white text-center">
            <h4 className="font-semibold text-lg text-[#4A4035] group-hover:text-[#5B3A1E] leading-normal">
              {recipe.title}
            </h4>
            <p className="text-xs text-[#A07F5B] mt-1 uppercase tracking-wider">
              {recipe.subtitle}
            </p>
          </div>
        </motion.div>

      ))}

    </motion.div>
  </div>
</motion.section>


      {/* --- Blog/Tips Feature Section --- */}
<motion.section 
  className="py-16 px-6 bg-[#F5F0E6]"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto">
    <div className="relative grid md:grid-cols-2 gap-10 items-center">
      
      {/* Image on the left */}
      <motion.div 
        className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
      >
        <Image 
          src="/pinterest.jpg" 
          alt="Perfectly Cooked Rice" 
          fill
          className="transition-transform duration-500 hover:scale-105 object-cover"
        />
      </motion.div>
      
      {/* Text Card on the right */}
      <motion.div 
        className="relative p-8 lg:p-12 bg-white rounded-2xl shadow-xl border border-[#F5F0E6] h-full flex flex-col justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl font-bold text-[#5B3A1E] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How to Cook Perfect Kainat Rice
        </motion.h2>
        
        <motion.p 
          className="text-[#6B5135] text-base leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <strong>Step 1: Rice Soaking</strong><br />
          Soak Kainat Double Steam Rice in lukewarm water for <strong>40 minutes</strong>. This softens the grains and ensures they expand properly during cooking.
          <br /><br />
          <strong>Step 2: Water Ratio</strong><br />
          The amount of water depends on the rice crop:<br />
          • <strong>New Crop Rice:</strong> Use an equal amount of water to rice (1:1 ratio).<br />
          • <strong>Old Crop Rice:</strong> Use 1 to 1.5 times more water than rice (1:1.5 ratio) to make it soft and evenly cooked.
          <br /><br />
          <strong>Step 3: Cooking Method</strong><br />
          • Add rice and water to a pot and cook on medium flame.<br />
          • Once the water is absorbed and the rice is soft, turn off the heat.<br />
          • Let it rest for <strong>10 minutes</strong> with a lid on to allow the grains to fully set.
          <br /><br />
          <strong>Tips for Other Varieties:</strong><br />
          • <strong>Kainat White Rice (Kachi Kainat):</strong> Follow the same soaking and cooking instructions.<br />
          • <strong>Kainat Sella Rice:</strong> Soak for <strong>2 hours</strong> and use <strong>double the water</strong> for best results.
        </motion.p>
        
        <Link
          href="/blog"
          className="inline-block self-start bg-[#E5D3B3] text-[#5B3A1E] px-8 py-3 rounded-full font-medium hover:bg-[#6B4A2E] hover:text-white transition-colors duration-300 shadow-md"
        >
          View Blog
        </Link>

              {/* Optional rice grain graphics */}
              <div className="absolute top-4 right-4 text-4xl opacity-30 text-[#5B3A1E] hidden sm:block">🍚</div>
              <div className="absolute bottom-4 left-4 text-4xl opacity-30 text-[#5B3A1E] hidden sm:block">🌾</div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* --- END: Blog/Tips Feature Section --- */}

      {/* --- Where To Buy Section --- */}
      <motion.section 
        className="py-20 px-6 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Text Content */}
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-[#5B3A1E] mb-6">
                Where To Buy?
              </h2>
              <p className="text-[#6B5135] text-lg leading-relaxed mb-10">
                Find our SM Rice products, including our premium Basmati, White Rice, Quinoa, and Pearl Couscous, online or look on the shelf at a nearby grocery store, for endless meal possibilities.
              </p>
              <Link
                href="/contact"
                className="inline-block self-start bg-[#5B3A1E] text-white px-8 py-3 rounded-full font-medium text-base hover:bg-[#6B4A2E] transition-colors duration-300 shadow-xl transform hover:scale-[1.02]"
              >
                Find Us Near You
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div 
              className="w-full rounded-2xl overflow-hidden shadow-2xl bg-[#F5F0E6]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src="/buy-product-showcase.jpg"
                alt="SM Rice Product Packaging"
                width={1600}
                height={900}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* --- END: Where To Buy Section --- */}

      {/* --- About Preview Section --- */}
      <motion.section 
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center bg-[#F5F0E6]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#5B3A1E] mb-4">
            Excellence in Every Grain
          </h2>
          <p className="text-[#6B5135] text-base">
            We provide premium export-quality basmati and non-basmati rice.
            Trusted by wholesalers and exporters nationwide.
          </p>
          <Link
            href="/about"
            className="inline-block mt-6 text-[#5B3A1E] font-medium hover:text-[#E5D3B3] transition-colors duration-300 text-base"
          >
            Learn Our Story &rarr;
          </Link>
        </motion.div>

        <motion.div 
          className="w-full rounded-2xl overflow-hidden shadow-2xl bg-[#F5F0E6]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/excelenceee.png"
            alt="Rice Excellence"
            width={600}
            height={450}
            className="w-full max-w-md h-auto object-contain"
            priority
          />
        </motion.div>
      </motion.section>
      {/* --- END: About Preview Section --- */}

    </main>
  </>
);
}