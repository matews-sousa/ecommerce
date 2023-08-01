"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Cart from "./cart";

export default function Navbar() {
  const cart = useCart();

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-12 py-4">
      <Link href="/" className="text-3xl font-extrabold">
        Audiophile
      </Link>

      <Cart />
    </nav>
  );
}
