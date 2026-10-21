import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Solarflow — Clean, Affordable Community Solar Energy",
  description: "We give you the power to lower your electricity bills and reduce emissions with a local solar community subscription.",
  keywords: "solar energy, community solar, clean power, renewable energy, electricity bill savings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${plusJakartaSans.className} h-full antialiased scroll-smooth`}>
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col bg-white text-slate-900 selection:bg-[#E8652D] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

