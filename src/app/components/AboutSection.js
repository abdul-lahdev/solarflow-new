"use client";

import { useEffect, useState, useRef } from "react";

export default function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const chips = [
    { label: "VISION", href: "#how-it-works" },
    { label: "TEAMS", href: "#projects" },
    { label: "CARRERS", href: "#check-availability" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 sm:py-32 bg-[#ffffff] text-slate-900 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Unified Eyebrow */}
          <div
            className={`section-eyebrow mb-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="section-eyebrow-pipe" />
            <span>ABOUT US</span>
          </div>

          {/* Main Heading with Staggered Entrance Animation */}
          <h2
            className={`section-title mb-6 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-[4px]"
            }`}
          >
            About Solarflow.
          </h2>

          {/* Description Paragraph with Staggered Fade Up */}
          <p
            className={`section-subtitle mb-8 sm:mb-10 max-w-3xl transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-[4px]"
            }`}
          >
            With over 850 Megawatts of community solar subscribers acquired to date, SolarFlow is the nation’s largest community solar subscriber acquisition team. Our turnkey technology simplifies solar power for everyone, from developers and utilities to the end consumer.
          </p>

          {/* Orange Chips with Staggered Entrance and Micro-interaction Animations */}
          <div
            className={`flex flex-wrap items-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {chips.map((chip, index) => (
              <a
                key={chip.label}
                href={chip.href}
                style={{ transitionDelay: `${index * 80}ms` }}
                className="inline-flex items-center justify-center px-8 sm:px-9 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#E8652D] shadow-[0_4px_14px_rgba(232,101,45,0.3)] hover:bg-[#d65722] hover:shadow-[0_8px_24px_rgba(232,101,45,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer select-none"
              >
                {chip.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
