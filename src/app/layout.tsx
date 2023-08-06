import Navbar from "@/components/navbar";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import LayoutProvider from "./providers/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elysia",
  description:
    "Welcome to [Your E-commerce Name] – Discover a World of Exciting Products! Explore a diverse selection of premium audio equipment, trendy fashion, stylish footwear, and more. Shop with confidence and indulge in a seamless shopping experience. Find your perfect match and elevate your lifestyle today!",
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
