"use client";

import Navbar from "@/components/navbar";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audiophile",
  description: "A ECommerce for audio related products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className={!pathname.startsWith("/studio") ? "px-12 py-6" : ""}>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
