"use client";

import React from "react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";

export default function AddToCartBtn({ _id }: { _id: string }) {
  const { addProduct } = useCart();

  return (
    <Button size="lg" onClick={() => addProduct(_id)}>
      Add to cart
    </Button>
  );
}
