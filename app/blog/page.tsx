"use client";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    title: "How to Cook Perfect Basmati Rice",
    excerpt:
      "Learn the secrets to fluffy, aromatic basmati rice every time using traditional Pakistani cooking techniques trusted for generations.",
    image: "/blogbasmati.jpg",
    date: "March 12, 2025",
    note:
      "Premium aged basmati delivers long grains, rich aroma, and restaurant-quality results when cooked correctly.",
  },
  {
    title: "Health Benefits of Rice in Daily Diet",
    excerpt:
      "Rice is more than comfort food. It provides clean energy, supports digestion, and plays a key role in balanced nutrition.",
    image: "/blog-health.jpg",
    date: "March 05, 2025",
    note:
      "Naturally gluten-free and easy to digest, quality rice is a daily staple for healthy Pakistani families.",
  },
  {
    title: "Choosing the Right Rice for Every Dish",
    excerpt:
      "From Biryani to Pulao and Fried Rice, each dish demands the right grain. Learn how professionals select rice varieties.",
    image: "/blog-choose.jpg",
    date: "February 26, 2025",
    note:
      "Selecting the correct grain length and aging ensures perfect texture, taste, and presentation.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#5B3A1E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#6B4A2E] rounded-full blur-3xl"></div>
      </div>

      {/* Spacer for navbar */}
      <div className="h-24 md:h-28 relative z-10" />

      {/* HEADER */}
      <section className="px-6 mb-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5B3A1E] rounded-full mb-6 shadow-lg">
            <svg
              className="w-8 h-8 text-[#E5D3B3]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-[#5B3A1E] tracking-tight mb-4 animate-fade-in">
            The SM Rice Blog
          </h1>

          <p className="text-sm md:text-base text-[#6B5135] max-w-2xl mx-auto leading-relaxed">
            Cooking wisdom, rice knowledge, health insights, and traditions —
            inspired by generations of Pakistani kitchens.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* IMAGE (UNCHANGED) */}
              <div className="w-full bg-[#F5F0E6] p-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
                <p className="text-xs text-center text-[#6B5135] mt-3 italic">
                  {blog.note}
                </p>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <p className="text-xs text-[#A07F5B] mb-2">
                  {blog.date}
                </p>

                <h3 className="text-lg font-semibold text-[#5B3A1E] mb-3">
                  {blog.title}
                </h3>

                <p className="text-sm text-[#6B5135] leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND MESSAGE */}
      <section className="bg-white py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#5B3A1E] mb-4">
            Excellence in Every Grain
          </h2>
          <p className="text-[#6B5135] text-base leading-relaxed mb-10">
            At SM Rice, quality begins at the source. Our commitment ensures
            that every pack delivers aroma, taste, and consistency trusted
            across Pakistan.
          </p>

          <Link
            href="/products"
            className="inline-block bg-[#5B3A1E] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#6B4A2E] transition-colors shadow-lg"
          >
            Explore SM Rice Products
          </Link>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
