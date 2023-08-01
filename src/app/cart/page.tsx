"use client";

import Product from "@/components/product";
import { useCart } from "@/contexts/CartContext";
import React from "react";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div>
      {cart.map((product) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
}
