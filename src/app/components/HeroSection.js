"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const TOTAL_FRAMES = 120;

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  // Refs for zero-rerender DOM animations
  const heroContentRef = useRef(null);
  const ambientGradientRef = useRef(null);
  const midStoryRef = useRef(null);
  const endStoryRef = useRef(null);
  const progressBarRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);
  const rafIdRef = useRef(null);

  // Helper to get frame path
  const getFramePath = (index) => {
    const frameNum = String(index + 1).padStart(4, "0");
    return `/images/frames/frame_${frameNum}.jpg`;
  };

  // Render a specific frame on canvas with 'cover' fit
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvas;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) * 0.5;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) * 0.5;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Smooth animation loop using lerp - ONLY draws when frame index changes
  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.25;
      } else {
        currentFrameRef.current = target;
      }

      const clampedIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      // PERFORMANCE CRUCIAL: Only redraw to canvas if the frame index actually changed!
      if (clampedIndex !== lastDrawnIndexRef.current) {
        drawFrame(clampedIndex);
        lastDrawnIndexRef.current = clampedIndex;
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Handle canvas sizing for high DPI (capped at dpr 1.5 for ultra-high FPS)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
    }

    lastDrawnIndexRef.current = -1; // force redraw on resize
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Preload all 120 frames
  useEffect(() => {
    let loadedCount = 0;
    const images = [];
    imagesRef.current = images;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);

      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(percent);

        if (i === 0) {
          drawFrame(0);
        }

        if (loadedCount >= Math.floor(TOTAL_FRAMES * 0.75)) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= Math.floor(TOTAL_FRAMES * 0.75)) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas, drawFrame]);

  // High performance scroll listener with direct DOM updates (NO React re-renders)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScrollableDistance = container.offsetHeight - window.innerHeight;
            if (totalScrollableDistance > 0) {
              const scrolled = -rect.top;
              const progress = Math.min(1, Math.max(0, scrolled / totalScrollableDistance));

              targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

              // 1. Hero main content opacity & transform
              const heroOpacity = Math.max(0, 1 - progress * 3.6);
              const heroTransformY = progress * -60;
              if (heroContentRef.current) {
                heroContentRef.current.style.opacity = heroOpacity;
                heroContentRef.current.style.transform = `translate3d(0, ${heroTransformY}px, 0)`;
                heroContentRef.current.style.pointerEvents = heroOpacity > 0.05 ? "auto" : "none";
              }

              // 2. Ambient gradient overlay
              if (ambientGradientRef.current) {
                ambientGradientRef.current.style.opacity = heroOpacity;
              }

              // 3. Mid-story milestone
              if (midStoryRef.current) {
                const midOpacity = Math.max(0, 1 - Math.abs(progress - 0.5) * 6);
                midStoryRef.current.style.opacity = midOpacity;
              }

              // 4. End-story milestone
              if (endStoryRef.current) {
                const endOpacity = Math.max(0, 1 - Math.abs(progress - 0.88) * 8);
                endStoryRef.current.style.opacity = endOpacity;
              }

              // 5. Progress bar (hardware accelerated scaleX)
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${progress})`;
              }

              // 6. Scroll indicator auto hide
              if (scrollIndicatorRef.current) {
                scrollIndicatorRef.current.style.opacity = progress > 0.12 ? "0" : "1";
                scrollIndicatorRef.current.style.pointerEvents = progress > 0.12 ? "none" : "auto";
              }
            }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!zipCode) {
      alert("Please enter your ZIP Code to check community solar availability.");
      return;
    }
    const targetSection = document.getElementById("availability-results");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(`Checking solar availability for ZIP: ${zipCode} and Address: ${address || "Local Area"}`);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#0c0d0e]"
      id="hero"
    >
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0f12] text-white transition-opacity duration-700">
          <div className="relative w-48 h-12 mb-6 animate-pulse">
            <Image
              src="/images/solarFlowLogo_white.png"
              alt="Solarflow"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-3 border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-[#E8652D] to-[#ff8c52] transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
            Loading Cinematic Experience {loadProgress}%
          </p>
        </div>
      )}

      {/* Sticky Fullscreen Frame Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        {/* Canvas for High-Performance Frame Playback */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transform-gpu"
          style={{ willChange: "contents" }}
        />

        {/* Ambient Gradient Overlays for Readability */}
        <div
          ref={ambientGradientRef}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent sm:w-[90%] w-full transition-opacity duration-150 will-change-opacity"
        />
        {/* Top subtle vignette for crisp navbar contrast */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        {/* Bottom subtle cinematic shadow */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Hero Interactive Text & Form (Exact Match to Design) */}
        <div
          ref={heroContentRef}
          className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center will-change-transform will-change-opacity transform-gpu"
        >
          <div className="max-w-2xl pt-12 sm:pt-0">
            {/* Unified Eyebrow Badge */}
            <div className="section-eyebrow mb-4">
              <span className="section-eyebrow-pipe" />
              <span>COMMUNITY SOLAR SUBSCRIPTION</span>
            </div>

            {/* Main Heading */}
            <h1 className="section-title !text-white text-4xl sm:text-6xl lg:text-[68px] mb-5 tracking-tight drop-shadow-sm">
              You have <br />
              <span className="text-white">the power.</span>
            </h1>

            {/* Subheading */}
            <p className="section-subtitle !text-slate-200 mb-8 max-w-xl text-base sm:text-lg font-normal leading-relaxed drop-shadow-xs">
              We give you the power to lower your electricity bills and reduce
              emissions with a local solar community subscription.
            </p>

            {/* Search Availability Pill Bar */}
            <form
              onSubmit={handleSubmit}
              className="glass-search-bar inline-flex flex-col sm:flex-row items-stretch sm:items-center p-2 rounded-2xl sm:rounded-full gap-2.5 max-w-xl w-full shadow-2xl transition-transform hover:scale-[1.01]"
            >
              <div className="flex-1 min-w-[120px]">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="23 (ZIP Code)"
                  className="w-full bg-white text-gray-900 placeholder-gray-400 font-medium px-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#E8652D] transition-all shadow-inner"
                />
              </div>

              <div className="flex-[1.4] min-w-[140px]">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Utility or address"
                  className="w-full bg-white text-gray-900 placeholder-gray-400 font-medium px-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#E8652D] transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="bg-[#E8652D] hover:bg-[#d45620] active:scale-95 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-orange-500/25 whitespace-nowrap cursor-pointer"
              >
                CHECK AVAILABILITY
              </button>
            </form>

            {/* Trust Micro-Badges */}
            <div className="flex items-center gap-6 mt-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 drop-shadow-xs">
                <svg className="w-4 h-4 text-[#E8652D]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Zero upfront cost
              </span>
              <span className="flex items-center gap-1.5 drop-shadow-xs">
                <svg className="w-4 h-4 text-[#E8652D]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No rooftop panels required
              </span>
              <span className="hidden sm:flex items-center gap-1.5 drop-shadow-xs">
                <svg className="w-4 h-4 text-[#E8652D]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Save up to 15% guaranteed
              </span>
            </div>
          </div>
        </div>

        {/* Phase 2: Mid-Scroll Storytelling Overlay */}
        <div
          ref={midStoryRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-end max-w-7xl mx-auto px-6 sm:px-12 transition-opacity duration-150 opacity-0 will-change-opacity"
        >
          <div className="bg-black/70 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-2xl max-w-md shadow-2xl text-white">
            <span className="text-[#E8652D] text-xs font-bold uppercase tracking-widest block mb-2">
              Step 01 / Certified Clean Installation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              High-Efficiency Solar Cells
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Every panel is connected to your local clean energy grid, feeding sustainable electricity directly into your neighborhood network.
            </p>
          </div>
        </div>

        {/* Phase 3: Late-Scroll Storytelling Overlay */}
        <div
          ref={endStoryRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-end justify-start max-w-7xl mx-auto px-6 sm:px-12 pb-24 transition-opacity duration-150 opacity-0 will-change-opacity"
        >
          <div className="bg-black/75 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-2xl max-w-lg shadow-2xl text-white">
            <span className="text-[#E8652D] text-xs font-bold uppercase tracking-widest block mb-2">
              Step 02 / Maximum Generation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              Community Scale. Direct Savings.
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              You receive automatic utility bill credits every single month without owning or maintaining any equipment.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-300">
              <div>
                <p className="text-xl font-bold text-[#E8652D]">100%</p>
                <p>Clean Solar</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <p className="text-xl font-bold text-[#E8652D]">$0</p>
                <p>Upfront Cost</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <p className="text-xl font-bold text-[#E8652D]">15%</p>
                <p>Bill Reduction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Scroll Indicator */}
        {/* <div
          ref={scrollIndicatorRef}
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-300 hover:opacity-100 will-change-opacity"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/75 bg-black/40 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 shadow-lg">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5 bg-black/20 backdrop-blur-sm shadow-md">
            <div className="w-1.5 h-2.5 bg-[#E8652D] rounded-full animate-bounce" />
          </div>
        </div> */}

        {/* Scroll Scrub Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#E8652D] to-[#ff9766] origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
