import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "HEAT | Thermodynamic Monitoring",
  description: "Heat Exchanger System Dashboard and Monitoring Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${oswald.variable} font-sans min-h-screen bg-[#050505] text-[#eaeaea] relative`}
      >
        <div className="fixed inset-0 bg-noise pointer-events-none" />
        <div className="relative w-full h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
