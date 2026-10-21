"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          // Hysteresis buffer to completely prevent boundary flickering
          if (!scrolledRef.current && y > 80) {
            scrolledRef.current = true;
            setScrolled(true);
          } else if (scrolledRef.current && y < 30) {
            scrolledRef.current = false;
            setScrolled(false);
            setMenuOpen(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "HOW IT WORKS", href: "#how-it-works" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
        scrolled ? "pt-3.5 px-4" : "pt-2 px-0"
      }`}
    >
      <header
        className={`pointer-events-auto relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
          scrolled
            ? "w-[92%] sm:w-full max-w-2xl sm:max-w-3xl rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.1)] px-4 sm:px-6 py-2.5"
            : "w-full max-w-7xl bg-transparent border-transparent shadow-none px-4 sm:px-6 lg:px-8 py-4"
        }`}
      >
        <div className="relative flex items-center justify-between w-full h-10">
          {/* Left section: MENU button (in scrolled state) OR Logo (in top state) */}
          <div className="flex items-center">
            {scrolled ? (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                <span className="flex flex-col gap-1 w-4">
                  <span
                    className={`h-0.5 bg-[#1e2329] rounded-full transition-all duration-300 ${menuOpen ? "w-4 rotate-45 translate-y-1.5" : "w-4"
                      }`}
                  />
                  <span
                    className={`h-0.5 bg-[#1e2329] rounded-full transition-all duration-300 ${menuOpen ? "w-4 -rotate-45 -translate-y-0" : "w-2.5"
                      }`}
                  />
                </span>
                <span className="text-[12px] font-semibold tracking-wider text-[#1e2329] group-hover:text-[#E8652D] transition-colors">
                  {menuOpen ? "CLOSE" : "MENU"}
                </span>
              </button>
            ) : (
              <Link href="/" className="flex items-center group">
                <div className="relative h-9 w-40 sm:h-10 sm:w-44 transition-transform duration-200 group-hover:scale-[1.02]">
                  <Image
                    src="/images/solarFlowLogo_white.png"
                    alt="Solarflow Logo"
                    fill
                    sizes="(max-width: 640px) 160px, 176px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            )}
          </div>

          {/* Center section: Logo (in scrolled state) OR Navigation Links (in top state) */}
          {scrolled ? (
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center group transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="relative h-7 w-32 sm:h-8 sm:w-36">
                <Image
                  src="/images/solarFlowLogo.png"
                  alt="Solarflow Logo"
                  fill
                  sizes="(max-width: 640px) 128px, 144px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          ) : (
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-semibold tracking-wider text-white/90 hover:text-[#E8652D] transition-colors duration-150 drop-shadow-xs"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right section: Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!scrolled && (
              <Link
                href="#login"
                className="hidden lg:inline-block text-[13px] font-semibold tracking-wider text-white/90 hover:text-[#E8652D] transition-colors mr-2 drop-shadow-xs"
              >
                LOGIN
              </Link>
            )}

            <Link
              href="#check-availability"
              className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-white bg-[#E8652D] hover:bg-[#d45620] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">CHECK AVAILABILITY</span>
              <span className="sm:hidden">INQUIRE</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            {/* Mobile Hamburger toggle (only when at top on mobile) */}
            {!scrolled && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
                className="lg:hidden p-1.5 rounded-lg text-white hover:text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Floating Menu Dropdown */}
        {menuOpen && (
          <div
            className={`absolute top-full mt-3 bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-300 animate-fadeIn ${scrolled
              ? "left-0 right-0 sm:left-auto sm:right-auto sm:w-96 sm:left-1/2 sm:-translate-x-1/2"
              : "left-4 right-4 sm:left-auto sm:right-6 sm:w-80"
              }`}
          >
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-gray-100">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
                Navigation
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-xs font-bold text-gray-400 hover:text-black transition-colors cursor-pointer p-1"
              >
                ✕ ESC
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-3 rounded-xl text-sm font-bold tracking-wider text-gray-800 hover:text-[#E8652D] hover:bg-orange-50/60 transition-all group"
                >
                  <span>{link.label}</span>
                  <span className="text-gray-400 group-hover:text-[#E8652D] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              ))}

              <div className="pt-3.5 mt-2 border-t border-gray-100 flex items-center justify-between gap-3">
                <Link
                  href="#login"
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-bold tracking-wider text-gray-700 hover:text-[#E8652D] px-3 py-2"
                >
                  LOGIN
                </Link>
                <Link
                  href="#check-availability"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-full text-xs font-bold tracking-wider text-white bg-[#E8652D] hover:bg-[#d45620] shadow-sm transition-all"
                >
                  CHECK AVAILABILITY
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
