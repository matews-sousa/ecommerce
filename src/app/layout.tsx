import Navbar from "@/components/navbar";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import LayoutProvider from "./providers/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "audiophile",
  description: "A ECommerce for audio related products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <LayoutProvider>{children}</LayoutProvider>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
