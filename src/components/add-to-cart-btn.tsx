"use client";

import React from "react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/types/product";

export default function AddToCartBtn({ product }: { product: IProduct }) {
  const { addProduct } = useCart();

  return (
    <Button size="lg" onClick={() => addProduct(product)}>
      Add to cart
    </Button>
  );
}
