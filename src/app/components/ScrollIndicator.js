"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator({ hidden }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hidden || !visible) return null;

  return (
    <div
      onClick={() => {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
      }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-500 hover:opacity-100"
    >
      <span className="text-[11px] font-semibold tracking-widest uppercase text-white/75 bg-black/40 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 shadow-lg">
        Scroll to explore
      </span>
      <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5 bg-black/20 backdrop-blur-sm shadow-md">
        <div className="w-1.5 h-2.5 bg-[#E8652D] rounded-full animate-bounce" />
      </div>
    </div>
  );
}
