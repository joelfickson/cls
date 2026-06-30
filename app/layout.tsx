import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteNav } from "./components/site-nav";
import { ClsMeter } from "./components/cls-meter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLS demo",
  description: "Demonstrating Cumulative Layout Shift on Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
        <SiteNav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
          {children}
        </main>
        <ClsMeter />
        <SpeedInsights />
      </body>
    </html>
  );
}
