"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    city: "Mankato, MN",
    metric: "4,270,560 kWh",
    metricSub: "of est. annual clean energy generated",
    county: "Blue Earth",
    utility: "North Western Energy",
    position: "top",
  },
  {
    id: 2,
    city: "Minneapolis, MN",
    metric: "1.5 Million lbs",
    metricSub: "of CO₂ prevented annually",
    county: "Hennepin",
    utility: "Minnesota Power",
    position: "bottom",
  },
  {
    id: 3,
    city: "Owatonna, MN",
    metric: "Over $3 Million",
    metricSub: "saved for subscribers annually",
    county: "Steele",
    utility: "Great River Energy",
    position: "top",
  },
  {
    id: 4,
    city: "Des Moines, IA",
    metric: "5.3 Million kWh",
    metricSub: "of clean energy generated per year",
    county: "Des Moines",
    utility: "Alliant Energy",
    position: "bottom",
  },
  {
    id: 5,
    city: "Cedar Rapids, IA",
    metric: "1,345 Households",
    metricSub: "energy costs reduced directly",
    county: "Linn",
    utility: "Black Hills Energy",
    position: "top",
  },
  {
    id: 6,
    city: "Madison, WI",
    metric: "5,140,320 kWh",
    metricSub: "of est. annual clean energy generated",
    county: "Dane",
    utility: "Consolidated Power",
    position: "bottom",
  },
  {
    id: 7,
    city: "Hartford, WI",
    metric: "1.2 Million lbs",
    metricSub: "of CO₂ prevented annually",
    county: "Dodge",
    utility: "Alliance",
    position: "top",
  },
];

export default function ProjectHighlights() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const activeLineRef = useRef(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth lerp loop for buttery horizontal translation & line growth
  useEffect(() => {
    let active = true;
    let rafId = null;

    const renderLoop = () => {
      if (!active) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.12;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      setScrollProgress(p);

      // Translate the horizontal track
      const track = trackRef.current;
      if (track) {
        const totalTrackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxScroll = Math.max(0, totalTrackWidth - viewportWidth + 120);
        track.style.transform = `translate3d(${-p * maxScroll}px, 0, 0)`;
      }

      // Grow the active orange timeline line
      if (activeLineRef.current) {
        activeLineRef.current.style.width = `${Math.min(100, p * 105)}%`;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll listener mapped to section scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalDistance = container.offsetHeight - window.innerHeight;
      if (totalDistance > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalDistance));
        targetProgressRef.current = progress;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full h-[520vh] bg-[#fbfcfd] text-gray-900"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="pointer-events-none absolute -top-40 right-20 w-[550px] h-[550px] bg-orange-200/20 rounded-full blur-[160px]" />
        <div className="pointer-events-none absolute -bottom-40 left-20 w-[550px] h-[550px] bg-amber-100/30 rounded-full blur-[160px]" />

        {/* Global Horizontal Scroll Track */}
        <div
          ref={trackRef}
          className="relative flex items-center h-full px-8 sm:px-16 will-change-transform transform-gpu select-none"
        >
          {/* Left Vertical Image with Rounded Corners (Unobstructed by timeline line) */}
          <div className="relative w-56 sm:w-64 md:w-72 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100 group shrink-0 mr-10 sm:mr-16 z-10">
            <Image
              src="/images/frames/frame_0001.jpg"
              alt="Solarflow Grid Project"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/20 font-semibold">
                U.S. Clean Grid
              </span>
              <p className="text-xs text-gray-200 mt-1.5 font-medium">Regional Community Solar</p>
            </div>
          </div>

          {/* Main Timeline Section (Originates from Dot 1, NEVER touching photo or cutting text) */}
          <div className="relative flex items-center h-full">
            {/* Continuous Central Baseline Timeline Guide (Neutral Gray) */}
            <div className="absolute top-[56%] -translate-y-1/2 left-0 right-0 h-[1.5px] bg-gray-200 pointer-events-none" />

            {/* Continuous Growing Active Orange Line */}
            <div
              ref={activeLineRef}
              className="absolute top-[56%] -translate-y-1/2 left-0 h-[2.5px] bg-[#E8652D] shadow-[0_0_12px_rgba(232,101,45,0.45)] pointer-events-none will-change-[width] origin-left transition-all duration-75"
              style={{ width: "0%" }}
            />

            {/* Starting Milestone (Text safely elevated above baseline with generous breathing room) */}
            <div className="relative shrink-0 w-[380px] sm:w-[460px] md:w-[520px] h-full flex items-center">
              {/* Text positioned safely below navbar and well above baseline */}
              <div className="absolute top-[18%] left-0 right-8 z-20">
                <div className="section-eyebrow mb-3">
                  <span className="section-eyebrow-pipe" />
                  <span>REGIONAL PORTFOLIO</span>
                </div>
                <h2 className="section-title mb-4">
                  Project <br />
                  highlights.
                </h2>
                <p className="section-subtitle mb-0">
                  Solarflow’s projects lower the barrier of entry to allow more solar to contribute to a reliable, resilient, and secure U.S. electric grid.
                </p>
              </div>

              {/* Central Node Dot 1 on Baseline */}
              <div className="absolute top-[56%] -translate-y-1/2 left-0 z-20 w-3.5 h-3.5 rounded-full bg-[#E8652D] border-2 border-white shadow-[0_0_12px_rgba(232,101,45,0.8)]" />

              {/* Sub-label beneath the initial line anchor */}
              <div className="absolute top-[calc(56%+14px)] left-0 text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold whitespace-nowrap z-20">
                FROM SITE TO GRID
              </div>
            </div>
            {projects.map((project, idx) => {
              const stepFraction = (idx + 1) / (projects.length + 1);
              const isPassed = scrollProgress >= stepFraction * 0.88;
              const isTop = project.position === "top";

              return (
                <div
                  key={project.id}
                  className="relative flex items-center justify-start shrink-0 w-[340px] sm:w-[420px] h-full"
                >
                  {/* Central Node Dot on Baseline */}
                  <div
                    className={`absolute top-[56%] -translate-y-1/2 left-0 z-20 w-3 h-3 rounded-full border-2 border-white transition-all duration-500 ${
                      isPassed
                        ? "bg-[#E8652D] shadow-[0_0_12px_rgba(232,101,45,0.8)] scale-125"
                        : "bg-gray-300 scale-90"
                    }`}
                  />

                  {/* Vertical Branch Stem (Up or Down) */}
                  <div
                    className={`absolute left-[5px] w-[1.5px] transition-all duration-700 ${
                      isTop
                        ? "bottom-[calc(44%)] h-24 sm:h-32 origin-bottom"
                        : "top-[56%] h-24 sm:h-32 origin-top"
                    } ${isPassed ? "bg-[#E8652D]" : "bg-gray-200"}`}
                  />

                  {/* Branch Terminal Dot & Connected Text Block */}
                  <div
                    className={`absolute left-[5px] z-20 flex items-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isTop
                        ? "bottom-[calc(44%+96px)] sm:bottom-[calc(44%+128px)]"
                        : "top-[calc(56%+96px)] sm:top-[calc(56%+128px)]"
                    }`}
                    style={{
                      opacity: isPassed ? 1 : 0.2,
                      transform: isPassed
                        ? "translateY(0) scale(1)"
                        : isTop
                        ? "translateY(12px) scale(0.97)"
                        : "translateY(-12px) scale(0.97)",
                      filter: isPassed ? "blur(0px)" : "blur(4px)",
                    }}
                  >
                    {/* The Terminal Node Dot (Aligned with city title) */}
                    <div
                      className={`-translate-x-1/2 mt-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shrink-0 transition-all duration-500 ${
                        isPassed
                          ? "bg-[#E8652D] shadow-[0_0_12px_rgba(232,101,45,0.8)] scale-110"
                          : "bg-gray-300"
                      }`}
                    />

                    {/* Pure Architectural Typography (NO Clunky Box/Cards) */}
                    <div className="pl-4 sm:pl-5 max-w-[280px] sm:max-w-[340px]">
                      {/* City Name */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight leading-tight">
                        {project.city}
                      </h3>

                      {/* Primary Metric Highlight */}
                      <div className="mt-1.5">
                        <span className="text-base sm:text-lg font-bold text-[#E8652D] block leading-snug">
                          {project.metric}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed block">
                          {project.metricSub}
                        </span>
                      </div>

                      {/* Metadata Line (County & Utility) */}
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <span className="text-gray-400">County:</span>
                          <span className="text-gray-900 font-semibold">{project.county}</span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="text-gray-400">Utility:</span>
                          <span className="text-gray-900 font-semibold">{project.utility}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End spacing so final item can be viewed comfortably */}
          <div className="w-48 shrink-0" />
        </div>


      </div>
    </section>
  );
}
