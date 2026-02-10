"use client";

import Image from "next/image";

const WhatsAppButton = () => {
  const handleClick = () => {
    // ✅ Track TikTok Contact event with error handling
    try {
      if (window.ttq) {
        window.ttq.track("Contact");
      }
    } catch (error) {
      console.error('TikTok Pixel tracking error:', error);
    }
  };

  return (
    <a
      href="https://wa.me/923394021057"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="
        fixed bottom-5 right-5 z-[999]
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#25D366] hover:bg-[#1EBE5D]
        shadow-lg hover:shadow-xl
        transition-all duration-300
        animate-bounce
      "
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/whatsapp.svg"
        alt="WhatsApp"
        width={28}
        height={28}
      />
    </a>
  );
};

export default WhatsAppButton;