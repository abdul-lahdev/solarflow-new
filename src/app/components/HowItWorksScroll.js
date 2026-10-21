"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: 0,
    line1: "Developers",
    line2: "invest.",
    description:
      "Developers create regional solar farms in strategic locations engineered for maximum sunlight capture and local grid demand.",
    badge: "SOLAR FARM NETWORK",
    iso: "GRID READY",
    stat: "250+ MW",
    statLabel: "CAPACITY INVESTED",
    footnote: "Utility-scale bifacial arrays built to power local neighborhoods.",
  },
  {
    id: 1,
    line1: "You",
    line2: "subscribe.",
    description:
      "You become part of the Solarflow community that reserves clean energy from regional solar farms. It takes less than two minutes, with zero equipment on your roof.",
    badge: "COMMUNITY ACCESS",
    iso: "ZERO ROOF PANELS",
    stat: "$0",
    statLabel: "UPFRONT COST",
    footnote: "No installations, zero home visits, and zero cancellation fees.",
  },
  {
    id: 2,
    line1: "Utilities",
    line2: "credit.",
    description:
      "Your electric utility buys power directly from your community solar allocation and automatically deposits solar discount credits onto your statement.",
    badge: "AUTOMATIC CREDITING",
    iso: "REGIONAL GRID",
    stat: "100%",
    statLabel: "CLEAN GENERATION",
    footnote: "Direct utility bill reduction every single monthly billing cycle.",
  },
  {
    id: 3,
    line1: "We",
    line2: "manage.",
    description:
      "Solarflow manages all operations, compliance, and billing between the farm developer and your utility, guaranteeing you save 5% to 25% hassle-free.",
    badge: "ACTIVE MANAGEMENT",
    iso: "SOLARFLOW ENGINE",
    stat: "5% – 25%",
    statLabel: "LOWER BILLS",
    footnote: "Continuous optimization ensuring maximum solar savings for every member.",
  },
];

export default function HowItWorksScroll() {
  const containerRef = useRef(null);
  const targetVirtualRef = useRef(0);
  const currentVirtualRef = useRef(0);
  const [virtualStep, setVirtualStep] = useState(0);

  // Smooth lerp loop to eliminate all jumpiness and make transitions liquid smooth
  useEffect(() => {
    let active = true;
    let rafId = null;

    const renderLoop = () => {
      if (!active) return;

      const diff = targetVirtualRef.current - currentVirtualRef.current;
      if (Math.abs(diff) > 0.001) {
        currentVirtualRef.current += diff * 0.12; // buttery inertia spring
        setVirtualStep(currentVirtualRef.current);
      } else if (currentVirtualRef.current !== targetVirtualRef.current) {
        currentVirtualRef.current = targetVirtualRef.current;
        setVirtualStep(targetVirtualRef.current);
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Map scroll position directly to continuous virtual step index (0 to 3)
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalDistance = container.offsetHeight - window.innerHeight;
      if (totalDistance > 0) {
        const scrolled = -rect.top;
        const rawProgress = Math.min(1, Math.max(0, scrolled / totalDistance));
        // Target virtual step floats continuously from 0.00 to 3.00
        targetVirtualRef.current = rawProgress * (steps.length - 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (idx) => {
    const container = containerRef.current;
    if (!container) return;
    const totalDistance = container.offsetHeight - window.innerHeight;
    const targetScroll = container.offsetTop + (idx / (steps.length - 1)) * totalDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const currentStepProgress = Math.min(1, Math.max(0, virtualStep / (steps.length - 1)));

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative w-full h-[450vh] bg-[#fbfcfd] text-gray-900"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-16">
        {/* Subtle Ambient Background Gradients */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] bg-orange-200/25 rounded-full blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-amber-100/35 rounded-full blur-[160px]" />

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Continuous Cross-Fading 3D Cards */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[400px] sm:h-[460px]">
              {steps.map((step, idx) => {
                const diff = virtualStep - idx;
                const absDiff = Math.abs(diff);

                // Fluid continuous opacity, transform, and blur
                const cardOpacity = Math.max(0, Math.min(1, 1 - absDiff * 1.5));
                const cardTranslateY = -diff * 38;
                const cardScale = Math.max(0.92, 1 - absDiff * 0.05);
                const cardBlur = Math.min(14, absDiff * 14);

                if (cardOpacity <= 0.005) return null;

                return (
                  <div
                    key={step.id}
                    className="absolute inset-0 rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] will-change-transform will-change-opacity transform-gpu"
                    style={{
                      opacity: cardOpacity,
                      transform: `translate3d(0, ${cardTranslateY}px, 0) scale(${cardScale})`,
                      filter: `blur(${cardBlur}px)`,
                      pointerEvents: cardOpacity > 0.6 ? "auto" : "none",
                      zIndex: Math.round(cardOpacity * 10),
                    }}
                  >
                    {/* Top Row: Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">

                        <span className="text-[11px] font-mono tracking-wider uppercase text-gray-700 font-bold">
                          {step.badge}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 font-semibold px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200">
                        {step.iso}
                      </span>
                    </div>

                    {/* Center: Hero Stat Block */}
                    <div className="my-auto text-center py-6">
                      <div className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-950 mb-3 drop-shadow-xs">
                        {step.stat}
                      </div>
                      <div className="inline-block px-3 py-1 rounded-md bg-gray-100/90 border border-gray-200 text-[11px] font-mono tracking-widest uppercase text-gray-800 font-semibold">
                        {step.statLabel}
                      </div>
                    </div>

                    {/* Bottom: Footnote & Step Counter */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                      <p className="line-clamp-2 pr-3 font-normal leading-relaxed">{step.footnote}</p>
                      <span className="text-[#E8652D] font-mono font-bold whitespace-nowrap text-sm">
                        0{idx + 1}/04
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Middle Column: Continuous Flowing Vertical Dash Indicator */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="flex flex-col gap-3 py-4 items-center">
              {steps.map((step, idx) => {
                const diff = Math.abs(virtualStep - idx);
                // Weight between 0 and 1 representing closeness to this step
                const activeWeight = Math.max(0, 1 - diff * 1.3);
                const dashHeight = 18 + activeWeight * 20; // smoothly morphs between 18px and 38px

                return (
                  <button
                    key={step.id}
                    onClick={() => scrollToStep(idx)}
                    aria-label={`Go to step ${idx + 1}`}
                    className="py-1 cursor-pointer focus:outline-none flex items-center justify-center"
                  >
                    <div
                      className="w-1.5 rounded-full transition-colors duration-150"
                      style={{
                        height: `${dashHeight}px`,
                        backgroundColor: activeWeight > 0.4 ? "#E8652D" : "#D1D5DB",
                        boxShadow:
                          activeWeight > 0.5
                            ? `0 0 14px rgba(232, 101, 45, ${activeWeight * 0.7})`
                            : "none",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Continuous Flowing Outlined Typography */}
          <div className="lg:col-span-6 relative min-h-[320px] flex items-center">
            {steps.map((step, idx) => {
              const diff = virtualStep - idx;
              const absDiff = Math.abs(diff);

              // Fluid text opacity and glide
              const textOpacity = Math.max(0, Math.min(1, 1 - absDiff * 1.8));
              const textTranslateY = -diff * 45;

              if (textOpacity <= 0.005) return null;

              return (
                <div
                  key={step.id}
                  className="absolute inset-0 flex flex-col justify-center will-change-transform will-change-opacity transform-gpu"
                  style={{
                    opacity: textOpacity,
                    transform: `translate3d(0, ${textTranslateY}px, 0)`,
                    pointerEvents: textOpacity > 0.6 ? "auto" : "none",
                  }}
                >
                  {/* Step Category Tag (Unified Eyebrow) */}
                  <div className="section-eyebrow mb-4">
                    <span className="section-eyebrow-pipe" />
                    <span>STEP 0{idx + 1} — HOW IT WORKS</span>
                  </div>

                  {/* Two-Line Title: Solid Dark Line 1 + Outlined Dark Line 2 */}
                  <h3 className="text-5xl sm:text-7xl lg:text-[76px] font-bold tracking-tight leading-[1.04]">
                    <span className="text-slate-950 block">{step.line1}</span>
                    <span className="text-outline-dark block">{step.line2}</span>
                  </h3>

                  {/* Description Paragraph */}
                  <p className="mt-6 section-subtitle mb-0">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
