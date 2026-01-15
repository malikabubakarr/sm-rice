"use client";

import { useState } from "react";
import Head from "next/head";

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
    <>
      {/* SEO */}
      <Head>
        <title>Contact SM Rice Pakistan | Rice Suppliers & Exporters</title>
        <meta
          name="description"
          content="Contact SM Rice Pakistan for bulk rice orders, dealership, and export inquiries. Premium basmati and non-basmati rice suppliers in Lahore."
        />
        <meta
          name="keywords"
          content="SM Rice contact, rice suppliers Pakistan, basmati rice exporters, rice dealers Lahore"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for WhatsApp & Facebook */}
        <meta property="og:title" content="Contact SM Rice Pakistan" />
        <meta
          property="og:description"
          content="Get in touch with SM Rice for premium rice orders and export inquiries."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] relative overflow-hidden text-[#5B3A1E] [color-scheme:light]">
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
            <h1 className="text-4xl md:text-5xl font-light text-[#5B3A1E] tracking-tight mb-4">
              Contact Us
            </h1>
            <p className="text-sm md:text-base text-[#6B5135] max-w-2xl mx-auto leading-relaxed">
              Get in touch with S.M Rice for bulk orders, dealership inquiries, or any questions regarding our products. We're here to assist you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 pb-20 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3]">
                <h2 className="text-lg text-[#5B3A1E] font-light mb-2">Address</h2>
                <p className="text-[#6B5135] text-sm">Samnabad main Los nala road Lahore, Pakistan</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3]">
                <h2 className="text-lg text-[#5B3A1E] font-light mb-2">Phone</h2>
                <p className="text-[#6B5135] text-sm">03394021057</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5D3B3]">
                <h2 className="text-lg text-[#5B3A1E] font-light mb-2">Email</h2>
                <p className="text-[#6B5135] text-sm">smricetraders0@gmail.com</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5D3B3]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg bg-white text-[#5B3A1E] placeholder-[#6B5135]"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg bg-white text-[#5B3A1E] placeholder-[#6B5135]"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border rounded-lg bg-white text-[#5B3A1E] placeholder-[#6B5135]"
                  required
                />

                <button className="w-full bg-[#5B3A1E] text-white py-3 rounded-lg hover:bg-[#6B4A2E] transition-all duration-300">
                  Send Message
                </button>

                {status && <p className="text-center text-sm mt-2">{status}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}