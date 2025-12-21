import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.facebook.com/share/1EpWQKJqdR/?mibextid=wwXIfr",
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.6c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.3h-1.1c-1.1 0-1.4.7-1.4 1.4V12H16l-.4 3h-2.6v7A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/smricetrade?igsh=MWNlbnVmN21ubjl6NQ==",
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
      </svg>
    ),
  },
  {
    href: "https://wa.me/923394021057",
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 3A13 13 0 003 16c0 2.3.6 4.4 1.7 6.3L3 29l6.9-1.8A13 13 0 1016 3zm6.4 18.4c-.3.9-1.6 1.6-2.2 1.7-.6.1-1.3.2-4.3-1-3.6-1.5-5.9-5.1-6.1-5.4-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-3 .3-.3.7-.4 1-.4h.7c.3 0 .6 0 .9.7.3.7 1.1 2.6 1.2 2.8.1.2.1.5 0 .7-.1.2-.2.5-.4.7-.2.2-.4.4-.6.6-.2.2-.4.4-.2.8.2.4.9 1.4 2 2.3 1.4 1.1 2.6 1.5 3 1.6.4.1.6.1.8-.1.3-.3 1-1.1 1.3-1.5.3-.4.6-.3 1-.2.4.1 2.6 1.2 3 1.4.4.2.7.3.8.5.1.2.1.9-.2 1.8z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@sm.rice.traders?_r=1&_t=ZS-92P1RpBdWwa",
    name: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2h3a5 5 0 003.5 3.5V8a7 7 0 01-3.5-.9V16a5 5 0 11-5-5v2.6a2.4 2.4 0 102.4 2.4V2z" />
      </svg>
    ),
  },
];

const navSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about#story" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/about" },
    ],
  },
  {
    title: "Products & Recipes",
    links: [
      { name: "All Products", href: "/products" },
      { name: "Basmati Range", href: "/products" },
      { name: "Recipes", href: "/blog" },
      { name: "Where To Buy", href: "/products" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3E2917] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-10">
          {/* Logo */}
          <div className="space-y-4">
            <Link href="/">
              <Image src="/logo.png" alt="S.M Rice" width={120} height={70} />
            </Link>
            <p className="text-sm text-white/70">
              Excellence in every grain, tradition in every meal.
            </p>
          </div>

          {/* Navigation */}
          {navSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h5 className="text-lg font-semibold text-[#E5D3B3]">
                {section.title}
              </h5>
              {section.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-white/80 hover:text-[#E5D3B3]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-[#E5D3B3]">
              Contact Information
            </h5>

            <div className="space-y-2 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <Phone size={16} /> 03394021057
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> salmancheema@outlook.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> Samnabad main Los nala road Lahore, Pakistan
              </p>
            </div>

            <div className="flex gap-5 pt-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  className="hover:text-[#E5D3B3] transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-white/60 mt-6">
          © {currentYear} S.M Rice Trading. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
