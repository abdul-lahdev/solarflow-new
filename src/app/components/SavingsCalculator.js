"use client";

import { useState } from "react";
import Image from "next/image";

export default function SavingsCalculator() {
  const [bill, setBill] = useState(125);

  // Exact formulas matching the user mockup at $125:
  // Reduced: $112.50 ($125 * 0.90)
  // Monthly: $12.50 ($125 * 0.10)
  // Lifetime: $4500 ($125 * 0.10 * 12 * 30)
  // Clean energy: 951 kWh ($125 * 7.608)
  // Carbon emission: 1483 lbs ($125 * 11.864)
  // Trees: 11 ($125 * 0.088)
  const reducedBill = (bill * 0.9).toFixed(2);
  const monthlySavings = (bill * 0.1).toFixed(2);
  const lifetimeSavings = Math.round(bill * 0.1 * 12 * 30);
  const cleanEnergyKwh = Math.round(bill * 7.608);
  const carbonLbs = Math.round(bill * 11.864);
  const treesPlanted = Math.max(1, Math.round(bill * 0.088));

  // Slider bounds: $20 to $350
  const minBill = 20;
  const maxBill = 350;
  const percentage = ((bill - minBill) / (maxBill - minBill)) * 100;

  return (
    <section
      id="check-availability"
      className="relative w-full py-24 sm:py-32 bg-[#f8fafc] text-slate-900 overflow-hidden"
    >
      {/* Background Solar Roof House (Bottom Left Corner with Golden Sun Flare) */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-[420px] sm:w-[560px] lg:w-[640px] h-[340px] sm:h-[440px] lg:h-[500px] select-none z-0">
        <Image
          src="/images/solar_roof_bg.jpg"
          alt="Solar roof"
          fill
          priority
          className="object-cover object-bottom"
        />
        {/* Soft atmospheric fade into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#f8fafc]/40 to-[#f8fafc]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f8fafc]/40 to-[#f8fafc]" />
      </div>

      {/* Subtle Foreground Leaves Accent (Bottom Right Corner) */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-[220px] sm:w-[300px] h-[200px] sm:h-[280px] select-none z-0 opacity-80">
        <Image
          src="/images/foliage_accent.jpg"
          alt="Leaves accent"
          fill
          className="object-cover object-bottom scale-x-[-1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#f8fafc]/40 to-[#f8fafc]" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#f8fafc]/40 to-[#f8fafc]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section: Header on Left, Current Bill Slider Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 sm:mb-12">
          {/* Left Column: Title, Subtitle, and Guarantee Checkmark */}
          <div className="lg:col-span-7">
            {/* Top Accent Tag: | YOUR SAVINGS */}
            <div className="section-eyebrow mb-3">
              <span className="w-1 h-4 bg-emerald-600 rounded-full inline-block flex-shrink-0" />
              <span className="text-emerald-700">YOUR SAVINGS</span>
            </div>

            {/* Main Title */}
            <h2 className="section-title mb-4">
              How much do you save?
            </h2>

            {/* Description */}
            <p className="section-subtitle mb-6">
              Use the savings calculator to estimate your electricity and impact savings.
            </p>

            {/* Guarantee Checkmark */}
            <div className="flex items-center gap-2.5 text-sm sm:text-base text-slate-900">
              <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-800 text-[15px]">
                We <strong className="font-bold text-slate-950">guarantee savings</strong> on your electricity bill.
              </span>
            </div>
          </div>

          {/* Right Column: Elevated Current Electricity Bill Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-7 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between">
              {/* Header with Lightning Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#e6f7ef] flex items-center justify-center text-emerald-600 shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Current electricity bill.
                </h3>
              </div>

              {/* Centered Dollar Value */}
              <div className="text-center text-3xl sm:text-4xl font-bold text-slate-950 mb-3 tracking-tight">
                ${bill}
              </div>

              {/* Slider Track with Green Progress & Knob */}
              <div className="relative w-full py-2.5 flex items-center">
                {/* Track Background */}
                <div className="w-full h-3 rounded-full bg-slate-200/80 overflow-hidden relative">
                  {/* Filled Green Bar */}
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-75"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Range Input */}
                <input
                  type="range"
                  min={minBill}
                  max={maxBill}
                  step={1}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  aria-label="Current electricity bill"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />

                {/* Thumb Knob */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] border border-slate-200 pointer-events-none transition-transform duration-75"
                  style={{ left: `calc(${percentage}% + ${(0.5 - percentage / 100) * 12}px)` }}
                />
              </div>

              {/* Min & Max Range Labels */}
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mt-1">
                <span>${minBill}/mo</span>
                <span>${maxBill}/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Two Balanced Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 1: Your Energy Savings */}
          <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between">
            <div>
              {/* Header with Wallet/Purse Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#e6f7ef] flex items-center justify-center text-emerald-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <rect x="3" y="6" width="18" height="14" rx="3" />
                    <path d="M16 13a1 1 0 102 0 1 1 0 00-2 0z" />
                    <path d="M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Your energy savings.
                </h3>
              </div>

              {/* Line 1: Reduced monthly electric bill */}
              <div className="flex justify-between items-center py-3 text-sm sm:text-base border-b border-slate-100/70">
                <span className="font-medium text-slate-600">Reduced monthly electric bill</span>
                <span className="font-bold text-slate-950 tabular-nums text-base sm:text-lg">${reducedBill}</span>
              </div>

              {/* Line 2: Monthly Savings */}
              <div className="flex justify-between items-center py-3 text-sm sm:text-base">
                <span className="font-medium text-slate-600">Monthly Savings</span>
                <span className="font-bold text-slate-950 tabular-nums text-base sm:text-lg">${monthlySavings}</span>
              </div>
            </div>

            {/* Line 3: Mint Green Lifetime Banner with Piggy Bank Icon */}
            <div className="mt-6 rounded-2xl bg-[#edf8f1] border border-emerald-100/80 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <ellipse cx="12" cy="13" rx="7" ry="5.5" />
                    <path d="M16 8l1.5-2.5M7 8L5.5 5.5" />
                    <path d="M7 18.5v2M17 18.5v2" />
                    <circle cx="9" cy="12" r="0.8" fill="currentColor" />
                    <path d="M11 9h2" />
                    <ellipse cx="19" cy="13" rx="1.5" ry="2" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-emerald-900 leading-snug">
                  Total savings over lifetime of the solar project
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-600 tracking-tight tabular-nums ml-4">
                ${lifetimeSavings}
              </span>
            </div>
          </div>

          {/* Card 2: Your Environmental Impact Savings */}
          <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between">
            <div>
              {/* Header with Sprout/Plant Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#eaf2ff] flex items-center justify-center text-blue-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11M12 11c0-4 3.5-7 8-7 0 4.5-3 8-8 7zm0 0c0-3.5-2.5-6-6-6 0 4 2.5 6.5 6 6z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Your environmental impact savings.
                </h3>
              </div>

              {/* Line 1: Clean energy enabled */}
              <div className="flex justify-between items-center py-4 text-sm sm:text-base border-b border-slate-100/70">
                <span className="font-medium text-slate-600">Clean energy enabled</span>
                <span className="font-bold text-slate-950 tabular-nums text-base sm:text-lg">{cleanEnergyKwh} kWh</span>
              </div>

              {/* Line 2: Carbon emission reduction */}
              <div className="flex justify-between items-center py-4 text-sm sm:text-base border-b border-slate-100/70">
                <span className="font-medium text-slate-600">Carbon emission reduction</span>
                <span className="font-bold text-slate-950 tabular-nums text-base sm:text-lg">{carbonLbs} lbs</span>
              </div>

              {/* Line 3: Equivalent trees planted */}
              <div className="flex justify-between items-center py-4 text-sm sm:text-base">
                <span className="font-medium text-slate-600">Equivalent trees planted</span>
                <span className="font-bold text-slate-950 tabular-nums text-base sm:text-lg">{treesPlanted}</span>
              </div>
            </div>

            {/* Spacer to align visually with card 1 */}
            <div className="h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
