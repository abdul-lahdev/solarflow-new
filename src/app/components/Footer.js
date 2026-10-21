"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-[#111317] text-white overflow-hidden border-t border-white/10">
      {/* Top Transition Accent Line with Subtle Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8652D]/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-16 bg-[#E8652D]/10 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10 sm:pb-12">
        {/* 4 Navigation Columns matching provided specifications & visual design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14 mb-16">
          {/* Column 1: Company */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold text-white/90">
              COMPANY
            </h3>
            <div className="w-7 h-[2px] bg-white/40 mt-3 mb-6" />
            <ul className="space-y-3.5 text-sm font-medium text-gray-400">
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#check-availability" className="hover:text-white transition-colors duration-200">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold text-white/90">
              SERVICES
            </h3>
            <div className="w-7 h-[2px] bg-white/40 mt-3 mb-6" />
            <ul className="space-y-3.5 text-sm font-medium text-gray-400">
              <li>
                <Link href="#check-availability" className="hover:text-white transition-colors duration-200">
                  Subscribers
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors duration-200">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors duration-200">
                  Utilities
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors duration-200">
                  Landowners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Subscribers */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold text-white/90">
              SUBSCRIBERS
            </h3>
            <div className="w-7 h-[2px] bg-white/40 mt-3 mb-6" />
            <ul className="space-y-3.5 text-sm font-medium text-gray-400">
              <li>
                <Link href="#check-availability" className="hover:text-white transition-colors duration-200">
                  Check Availability
                </Link>
              </li>
              <li>
                <Link href="#login" className="hover:text-white transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold text-white/90">
              CONTACT
            </h3>
            <div className="w-7 h-[2px] bg-white/40 mt-3 mb-6" />
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li>
                <a
                  href="mailto:info@solarflow.io"
                  className="hover:text-white transition-colors duration-200 text-gray-300"
                >
                  info@solarflow.io
                </a>
              </li>
              <li>
                <a
                  href="tel:8774221258"
                  className="hover:text-white transition-colors duration-200 text-gray-300"
                >
                  877-422-1258
                </a>
              </li>
              <li className="pt-1 text-xs text-gray-400 leading-relaxed">
                448 Lime Valley Rd<br />
                Mankato, MN 56001
              </li>
              <li className="pt-2 flex items-center gap-4 text-xs font-medium">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Facebook
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Divider & Centered Logo Layout (Matching Reference Design) */}
        <div className="border-t border-white/10 pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-medium">
          {/* Left: Quick contact endpoints */}
          <div className="flex items-center gap-4">
            <a href="mailto:info@solarflow.io" className="hover:text-white transition-colors duration-200">
              info@solarflow.io
            </a>
            <span className="text-gray-600">•</span>
            <a href="tel:8774221258" className="hover:text-white transition-colors duration-200">
              +1-877-422-1258
            </a>
          </div>

          {/* Center: Solarflow Brand Logo with Orange Emblem & White Text */}
          <div className="relative h-7 w-36 sm:h-8 sm:w-40">
            <Image
              src="/images/solarFlowLogo_white.png"
              alt="Solarflow"
              fill
              className="object-contain"
            />
          </div>

          {/* Right: Copyright line & Scroll-to-top Arrow Button */}
          <div className="flex items-center gap-4 text-center md:text-right text-gray-400">
            <span>© Copyright Solarflow / All Rights Reserved</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="group w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#E8652D] hover:bg-[#E8652D] transition-all duration-200 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
