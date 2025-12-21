"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#5B3A1E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#6B4A2E] rounded-full blur-3xl"></div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-28 relative z-10" />

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        
        {/* Hero Section for About */}
        <section className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-[#E5D3B3] mb-16 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-[#5B3A1E] mb-6 tracking-tight">
                About S.M Rice Trading
              </h1>
              <p className="text-[#6B5135] text-sm md:text-base leading-relaxed mb-6">
                S.M Rice Trading is a premier rice supplier dedicated to delivering premium quality Pakistani rice worldwide. With a commitment to purity, excellence, and sustainability, we have become a trusted partner for wholesalers, exporters, and retailers globally.
              </p>
              <p className="text-[#6B5135] text-sm md:text-base leading-relaxed">
                Our journey began in 2019, rooted in the fertile lands of Punjab, Pakistan. Over the years, we've grown from a local trader to an international brand, supplying rice to some of the world's most renowned food companies.
              </p>
            </div>
            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-sm">
              <Image 
                src="/about-hero-rice-field.jpg" 
                alt="Rice Fields in Punjab" 
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-[#E5D3B3] p-8 md:p-10 rounded-lg shadow-sm mb-16 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-light text-[#5B3A1E] mb-6 text-center">
            Our History
          </h2>
          <p className="text-[#6B5135] text-sm md:text-base leading-relaxed max-w-4xl mx-auto text-center">
            Founded in 2019 by Mr. Salman Cheema & Mr. Noman Cheema. S.M Rice Trading started as a small family business in Lahore, Pakistan. What began as a passion for quality rice has evolved into a global enterprise. We specialize in sourcing, processing, and exporting basmati and non-basmati rice, ensuring every grain meets international standards. Our dedication to innovation and customer satisfaction has propelled us to serve markets across Asia, Europe, and the Middle East.
          </p>
        </section>

        {/* Location Section */}
        <section className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-[#E5D3B3] mb-16 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-sm">
              <Image 
                src="/pakistan-map-location.jpg" 
                alt="Location in Pakistan" 
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-[#5B3A1E] mb-6">
                Our Location
              </h2>
              <p className="text-[#6B5135] text-sm md:text-base leading-relaxed mb-4">
                Based in the heart of Punjab, Pakistan, S.M Rice Trading operates from our state-of-the-art facility in Lahore. Punjab's fertile soil and ideal climate make it the perfect region for cultivating the finest rice varieties. Our location allows us to maintain direct oversight of the supply chain, from farm to export.
              </p>
              <p className="text-[#6B5135] text-sm md:text-base leading-relaxed">
                Address: Samnabad main Los nala road Lahore, Pakistan<br />
                Contact: 03394021057 | salmancheema@outlook.com
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-[#F5F0E6] p-8 md:p-10 rounded-lg shadow-sm mb-16 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-light text-[#5B3A1E] mb-6 text-center">
            Meet Our Team
          </h2>
          <p className="text-[#6B5135] text-sm md:text-base leading-relaxed max-w-4xl mx-auto text-center mb-10">
            Our dedicated team of experts drives S.M Rice Trading's success. From seasoned farmers to logistics professionals, each member is committed to upholding our standards of quality and integrity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-[#E5D3B3]">
              <div className="relative h-24 w-24 md:h-32 md:w-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/team-founder.jpg" alt="Mr. Syed Muhammad" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-light text-[#5B3A1E]">Mr. Salman Cheema</h3>
              <p className="text-[#6B5135] text-sm">CEO</p>
              <p className="text-xs text-[#6B5135] mt-2">With over 6 years in the rice industry, Salman Cheema leads our vision for excellence.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-[#E5D3B3]">
              <div className="relative h-24 w-24 md:h-32 md:w-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/team-manager.jpg" alt="Ms. Aisha Khan" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-light text-[#5B3A1E]">Mr. Noman Cheema</h3>
              <p className="text-[#6B5135] text-sm">Founder</p>
              <p className="text-xs text-[#6B5135] mt-2">Ensures seamless supply chain and quality control processes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-[#E5D3B3]">
              <div className="relative h-24 w-24 md:h-32 md:w-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/teamexpert.jpg" alt="Mr. Imran Ali" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-light text-[#5B3A1E]">Mr. Luqman Cheema</h3>
              <p className="text-[#6B5135] text-sm">Director</p>
              <p className="text-xs text-[#6B5135] mt-2">Oversees testing and certification to meet global standards.</p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-[#E5D3B3] mb-16 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-light text-[#5B3A1E] mb-6 text-center">
            Our Products
          </h2>
          <p className="text-[#6B5135] text-sm md:text-base leading-relaxed max-w-4xl mx-auto text-center mb-10">
            We offer a wide range of premium rice varieties, each carefully selected for taste, texture, and nutritional value. Our products cater to diverse culinary needs, from everyday meals to gourmet dishes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F5F0E6] p-6 rounded-lg shadow-sm text-center border border-[#E5D3B3]">
              <h3 className="text-lg font-light text-[#5B3A1E]">Super Basmati Rice</h3>
              <p className="text-[#6B5135] text-sm mt-2">SM Rice Premium is our flagship basmati rice, featuring extra-long, slender grains with an exceptional natural aroma. It delivers superior elongation and fluffy, separate grains after cooking, making it ideal for premium dining and special occasions.

Best For: Biryani, pulao, festive meals, premium households
Key Traits: Extra-long grains, rich aroma, elegant presentation</p>
            </div>
            <div className="bg-[#F5F0E6] p-6 rounded-lg shadow-sm text-center border border-[#E5D3B3]">
              <h3 className="text-lg font-light text-[#5B3A1E]">Kainat White Rice</h3>
              <p className="text-[#6B5135] text-sm mt-2">This premium 1121 steam rice combines extra-long grain length with steam processing for improved strength and consistency. The grains remain firm, non-sticky, and well-separated, even in large-scale cooking.

Best For: Caterers, restaurants, weddings, bulk cooking
Key Traits: Strong grains, high elongation, excellent holding capacity
</p>
            </div>
            <div className="bg-[#F5F0E6] p-6 rounded-lg shadow-sm text-center border border-[#E5D3B3]">
              <h3 className="text-lg font-light text-[#5B3A1E]">SM 1121 Kainat Steam Rice</h3>
              <p className="text-[#6B5135] text-sm mt-2">Designed for daily use, Samaj 1121 Kainat Steam Rice blends affordability with dependable quality. The steam process enhances grain strength while maintaining soft texture and pleasant aroma.

Best For: Daily cooking, home use
Key Traits: Balanced quality, economical, easy to cook</p>
            </div>
            <div className="bg-[#F5F0E6] p-6 rounded-lg shadow-sm text-center border border-[#E5D3B3]">
              <h3 className="text-lg font-light text-[#5B3A1E]">Nayab Rice</h3>
              <p className="text-[#6B5135] text-sm mt-2">This rice combines quality and affordability, offering a strong presence of Kainat sella grains. It delivers reliable texture and aroma, making it suitable for both everyday and occasional use.

Best For: Daily meals, medium-scale cooking
Key Traits: Balanced texture, good aroma, value option</p>
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section className="bg-[#E5D3B3] p-8 md:p-10 rounded-lg shadow-sm mb-16 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-light text-[#5B3A1E] mb-6 text-center">
            Trusted by Leading Brands
          </h2>
          <p className="text-[#6B5135] text-sm md:text-base leading-relaxed max-w-4xl mx-auto text-center mb-10">
            S.M Rice Trading proudly supplies to renowned brands and retailers worldwide. Our rice is featured in products from major food companies, ensuring quality and reliability.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <Image src="/brand-logo-1.png" alt="Brand 1" width={100} height={50} className="mx-auto w-full max-w-[100px] h-auto" />
            </div>
            <div className="text-center">
              <Image src="/brand-logo-2.png" alt="Brand 2" width={100} height={50} className="mx-auto w-full max-w-[100px] h-auto" />
            </div>
            <div className="text-center">
              <Image src="/brand-logo-3.png" alt="Brand 3" width={100} height={50} className="mx-auto w-full max-w-[100px] h-auto" />
            </div>
            <div className="text-center">
              <Image src="/brand-logo-4.png" alt="Brand 4" width={100} height={50} className="mx-auto w-full max-w-[100px] h-auto" />
            </div>
          </div>
          <p className="text-[#6B5135] text-sm md:text-base leading-relaxed max-w-4xl mx-auto text-center mt-10">
            Popular brands like Cothm, Faletti's Hotel, Cafe Zouk and PF Chang rely on our rice for their premium offerings. We also partner with supermarkets and online retailers to make our products accessible globally.
          </p>
        </section>

        {/* Call to Action */}
        <section className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-[#E5D3B3] text-center animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-light text-[#5B3A1E] mb-6">
            Join Our Journey
          </h2>
          <p className="text-[#6B5135] text-sm md:text-base leading-relaxed mb-8">
            Interested in partnering with us or learning more? Reach out today to discover how S.M Rice Trading can elevate your business.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#5B3A1E] text-white px-6 py-3 rounded-lg font-light hover:bg-[#6B4A2E] transition-colors duration-300 shadow-sm text-sm"
          >
            Contact Us
          </Link>
        </section>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}