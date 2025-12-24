import Image from "next/image";
import Link from "next/link";

/* ✅ FETCH PRODUCTS FROM DB */
async function getProducts() {
  // Use environment variable or fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products?limit=5`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to fetch products:", res.statusText);
    return [];
  }

  const data = await res.json();
  console.log("Fetched products:", data.products[0]);
  return data.products || [];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="bg-[#F5F0E6] min-h-screen">

      {/* Hero Section */}
      <section className="relative text-white py-28 flex items-center justify-center" style={{ minHeight: "600px" }}>
        <div className="absolute inset-0">
          <div className="w-56 h-auto">
            <Image src="/herodekstopbg.jpg" alt="Hero Background Desktop" fill className="hidden md:block object-cover" priority />
            </div>
          <Image src="/herobg-mobile.jpg" alt="Hero Background Mobile" fill className="md:hidden object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Mobile Hero Content */}
<div className="absolute bottom-12 left-0 right-0 z-10 md:hidden">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <div className="md:max-w-xl">

      {/* Animated Brand Heading */}
      <h1 className="text-3xl font-semibold tracking-wide text-[#F8F3E8] drop-shadow-lg
        transition-all duration-500
        hover:tracking-widest hover:scale-105">
        <span className="text-[#E5D3B3] font-extrabold
          inline-block transition-transform duration-500 hover:rotate-2">
          SM
        </span>{" "}
        <span className="inline-block transition-all duration-500 hover:-rotate-1">
          RICE
        </span>
      </h1>

      {/* Animated Tagline */}
      <p className="mt-2 text-sm text-[#F1E7D3] leading-relaxed font-light
        transition-all duration-500
        hover:text-[#E5D3B3] hover:scale-[1.02]">
        Premium Quality Pakistani Rice —{" "}
        <span className="font-medium text-[#E5D3B3]
          inline-block transition-all duration-500
          hover:text-white hover:underline underline-offset-4">
          Trusted for Purity & Export Excellence
        </span>
      </p>

      {/* CTA Buttons (unchanged) */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
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
      </div>

    </div>
  </div>
</div>


        {/* Desktop Hero Content */}
        <div className="hidden md:block absolute left-12 top-1/2 transform -translate-y-1/2 z-10">
          <div className="max-w-md text-left">
            <h1 className="text-4xl font-semibold tracking-wide text-[#F8F3E8] drop-shadow-lg">
              <span className="text-[#E5D3B3] font-extrabold">S.M</span> RICE
            </h1>
            <p className="mt-3 text-lg text-[#F1E7D3] leading-relaxed font-light">
              Premium Quality Pakistani Rice —{" "}
              <span className="font-medium text-[#E5D3B3]">Trusted for Purity & Export Excellence</span>
            </p>
            <div className="mt-8 flex gap-4 justify-start">
              <Link href="/products" className="bg-[#E5D3B3] text-[#5B3A1E] px-8 py-3 rounded-full text-base font-medium hover:bg-[#6B4A2E] hover:text-white transition-all shadow-md hover:shadow-lg">
                Explore Products
              </Link>
              <Link href="/about" className="border border-[#E5D3B3] text-[#E5D3B3] px-8 py-3 rounded-full text-base font-medium hover:bg-[#E5D3B3] hover:text-[#5B3A1E] transition-all shadow-md hover:shadow-lg">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* --- Product Grid Section --- */}
<section className="bg-white py-16 px-6">
  <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

    {/* Featured Image */}
    <div className="relative h-64 w-full max-w-sm mb-12">
      <Image src="/rice-product-feature.png" alt="Featured SM Rice Product" fill className="object-contain" />
    </div>

    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-[#5B3A1E] mb-2">SM Rice Products</h2>
      <h3 className="text-lg font-medium text-[#6B4A2E] mb-8">No Measure, No Mess.</h3>
      <p className="text-[#6B5135] text-base leading-relaxed mb-12 max-w-2xl mx-auto">
        Our quality products are carefully designed with your needs in mind. Whether you enjoy White Rice, Brown Rice, Jasmine Rice, Basmati Rice, Quinoa, or Pearl Couscous—we’ve got the size and flavor that’s convenient for you.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
      {products.slice(0, 6).map((product: any) => (
        <Link key={product._id} href="/products" className="block p-4 rounded-xl transition-shadow duration-300 hover:shadow-2xl bg-[#F5F0E6] group">
          <div className="relative w-full h-0 pb-[75%] mb-3">
            <Image src={product.img || "/rice-product-feature.png"} alt={product.name} fill className="object-contain" />
          </div>
          <h4 className="font-semibold text-base text-[#5B3A1E] group-hover:text-[#6B4A2E] transition-colors">{product.name}</h4>
          {/* Description removed */}
          <p className="mt-2 font-semibold text-sm text-[#6B4A2E]">PKR {product.price?.toLocaleString()}</p>
        </Link>
      ))}
    </div>

    <Link href="/products" className="inline-block mt-12 bg-[#5B3A1E] text-white px-8 py-3 rounded-full font-medium hover:bg-[#6B4A2E] transition-colors duration-300 shadow-xl transform hover:scale-[1.02]">
      See All SM Rice Products
    </Link>
  </div>
</section>

{/* --- END: Product Introduction Section --- */}


      {/* --- Recipe Preview Section (Pakistani Focus) --- */}
<section className="bg-white py-16 px-6">
  <div className="max-w-7xl mx-auto">
    
    {/* Refined Heading and Description for clean, modern look */}
    <h2 className="text-center text-3xl font-bold text-[#5B3A1E] mb-4 tracking-tight">
      A Taste of Pakistan: Rice Recipes
    </h2>
    
    <p className="text-center text-[#6B5135] text-base italic max-w-4xl mx-auto mb-12">
      Explore the rich and aromatic flavors of traditional South Asian cuisine. From savory <strong>Biryani</strong> and <strong>Pulao</strong> to sweet <strong>Zarda</strong>, elevate your next meal with SM Rice.
    </p>

    {/* Recipe Grid - Ensuring full image visibility in uniform containers */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

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
        
        <div
          key={index}
          className="block rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] group"
        >
          {/* 4:3 Aspect Ratio Container */}
          <div className="relative w-full h-0 pb-[75%]">
            <Image
              src={recipe.src}
              alt={recipe.alt}
              fill
              className="object-contain"
            />
          </div>

          <div className="p-4 bg-white text-center">
            <h4 className="font-semibold text-lg text-[#4A4035] group-hover:text-[#5B3A1E] leading-normal">
              {recipe.title}
            </h4>
            <p className="text-xs text-[#A07F5B] mt-1 uppercase tracking-wider">
              {recipe.subtitle}
            </p>
          </div>
        </div>

      ))}

    </div>
  </div>
</section>


      {/* --- Blog/Tips Feature Section --- */}
      <section className="py-16 px-6 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto">
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            
            {/* Image on the left (ObjectFit="cover" is appropriate for feature images) */}
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/pinterest.jpg" 
                alt="Perfectly Cooked Rice" 
                fill
                className="transition-transform duration-500 hover:scale-105 object-cover"
              />
            </div>
            
            {/* Text Card on the right - CLEANER TEXT */}
            <div className="relative p-8 lg:p-12 bg-white rounded-2xl shadow-xl border border-[#F5F0E6] h-full flex flex-col justify-center">
              
              <h2 className="text-3xl font-bold text-[#5B3A1E] mb-4">
                It's Time To Make Rice!
              </h2>
              <p className="text-[#6B5135] text-base leading-relaxed mb-8">
                Turn on the stove and put these tips into practice to elevate your meals any day of the week! Discover food trends, cooking hacks, and even fun facts about your favorite rice and quinoa in our blog, **The Kitchen**.
              </p>
              
              <Link
                href="/blog"
                className="inline-block self-start bg-[#E5D3B3] text-[#5B3A1E] px-8 py-3 rounded-full font-medium hover:bg-[#6B4A2E] hover:text-white transition-colors duration-300 shadow-md"
              >
                View Blog
              </Link>
              
              {/* Optional rice grain graphic effect, mimicking the original design */}
              <div className="absolute top-4 right-4 text-4xl opacity-30 text-[#5B3A1E] hidden sm:block">🍚</div>
              <div className="absolute bottom-4 left-4 text-4xl opacity-30 text-[#5B3A1E] hidden sm:block">🌾</div>

            </div>
          </div>
        </div>
      </section>
      {/* --- END: Blog/Tips Feature Section --- */}

      {/* --- NEW: Where To Buy Section --- */}
<section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            
            {/* Text Content on the left - CLEANER TEXT */}
            <div className="flex flex-col justify-center">
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
            </div>
            
            {/* Product Image on the right (Using objectFit="contain" to show full image) */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-[#F5F0E6]">
  <Image
    src="/buy-product-showcase.jpg"
    alt="SM Rice Product Packaging"
    width={1600}
    height={900}   // use your real image ratio
    className="w-full h-auto object-contain"
    priority
  />
</div>

          </div>
        </div>
      </section>
      {/* --- END: Where To Buy Section --- */}


      {/* About Preview (Final Section) */}
<section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center bg-[#F5F0E6]">
  <div className="order-2 md:order-1">
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
  </div>

  {/* IMAGE – FULL SIZE, NO CROP */}
  <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-[#F5F0E6]">
    <Image
      src="/excelenceee.png"
      alt="Rice Excellence"
      width={600}
      height={450}
      className="w-full max-w-md h-auto object-contain"
      priority
    />
  </div>
</section>

    </main>
  );
}