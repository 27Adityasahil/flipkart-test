import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flipkart March Sale",
};

import { CartProvider } from "@/context/CartContext";
import MobileLayout from "@/components/MobileLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200 text-black`}
      >
        <CartProvider>
          <MobileLayout>
            {children}
          </MobileLayout>
        </CartProvider>
      </body>
    </html>
  );
}
