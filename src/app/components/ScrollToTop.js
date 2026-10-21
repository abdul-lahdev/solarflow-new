"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show arrow after scrolling past the hero section
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // Robust smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 group flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-slate-200/80 backdrop-blur-md transition-all duration-300 hover:bg-[#E8652D] hover:text-white hover:border-[#E8652D] hover:shadow-[0_8px_30px_rgba(232,101,45,0.35)] hover:scale-110 active:scale-95 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Upward Arrow Icon (Only that arrow) */}
      <svg
        className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
