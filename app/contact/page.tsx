"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("Error sending message");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#5B3A1E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#6B4A2E] rounded-full blur-3xl"></div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-28 relative z-10" />

      {/* Header Section */}
      <section className="px-6 mb-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5B3A1E] rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#5B3A1E] tracking-tight mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-sm md:text-base text-[#6B5135] max-w-2xl mx-auto leading-relaxed">
            Get in touch with S.M Rice for bulk orders, dealership inquiries, or any questions regarding our products. We're here to assist you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 animate-slide-up">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3]">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#5B3A1E] rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-lg text-[#5B3A1E] font-light">Address</h2>
              </div>
              <p className="text-[#6B5135] text-sm ml-14">Samnabad main Los nala road Lahore, Pakistan </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3]">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#5B3A1E] rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h2 className="text-lg text-[#5B3A1E] font-light">Phone</h2>
              </div>
              <p className="text-[#6B5135] text-sm ml-14">03394021057</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3]">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#5B3A1E] rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#E5D3B3]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h2 className="text-lg text-[#5B3A1E] font-light">Email</h2>
              </div>
              <p className="text-[#6B5135] text-sm ml-14">smricetraders0@gmail.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5D3B3]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#5B3A1E] text-sm font-light mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E5D3B3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3A1E] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-[#5B3A1E] text-sm font-light mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E5D3B3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3A1E] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-[#5B3A1E] text-sm font-light mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-[#E5D3B3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3A1E] text-sm resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#5B3A1E] text-white py-3 rounded-lg hover:bg-[#6B4A2E] transition-all duration-300 text-sm font-light"
              >
                Send Message
              </button>
              {status && <p className="mt-4 text-center text-[#6B5135] text-sm">{status}</p>}
            </form>
          </div>
        </div>
      </section>

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