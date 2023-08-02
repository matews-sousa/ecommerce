"use client";

import { Button } from "@/components/ui/button";
import { products } from "@/constants/products";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import React from "react";

export default function ProductPage({ params }: { params: { slug: number } }) {
  const cart = useCart();
  const product = products.find((p) => p.id === Number(params.slug));

  console.log(products, product);

  if (!product) return <h1>Not found</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      <div className="cols-span-1 mb-4">
        <div className="bg-gray-200">
          <Image
            src={product.image}
            width={1000}
            height={1000}
            alt="earphone"
          />
        </div>
      </div>
      <div className="lg:col-span-2">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-4xl">
          {product.name}
        </h1>
        <p className="mb-4 text-xl font-medium text-gray-900 md:text-3xl">
          ${product.price}
        </p>

        <p className="md:text-md my-4 text-sm">
          The Zip Tote Basket is the perfect midpoint between shopping tote and
          comfy backpack. With convertible straps, you can hand carry, should
          sling, or backpack this convenient and spacious bag. The zip top and
          durable canvas construction keeps your goods protected for all-day
          use.
        </p>

        <Button size="lg" onClick={() => cart.addProduct(product.id)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
