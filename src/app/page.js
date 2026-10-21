"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorksScroll from "./components/HowItWorksScroll";
import SavingsCalculator from "./components/SavingsCalculator";
import ProjectHighlights from "./components/ProjectHighlights";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-[#E8652D] selection:text-white">
      {/* Fixed Header / Navbar */}
      <Navbar />

      {/* Hero Section with 120-Frame Canvas Scroll Animation */}
      <HeroSection />

      {/* Dynamic Pinned Scroll "How It Works" Section */}
      <HowItWorksScroll />

      {/* New Interactive Savings Calculator Section */}
      <SavingsCalculator />

      {/* Dynamic Pinned Horizontal Timeline "Project Highlights" Section */}
      <ProjectHighlights />

      {/* About Solarflow Section */}
      <AboutSection />

      {/* Modern Sleek Dark Footer */}
      <Footer />

      {/* Floating Smooth Scroll-to-Top Arrow */}
      <ScrollToTop />
    </main>
  );
}
