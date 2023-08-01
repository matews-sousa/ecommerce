"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import React from "react";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const cart = useCart();

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="cols-span-1">
        <div className="bg-gray-200">
          <Image
            src="/assets/earphones_a_1.webp"
            width={1000}
            height={1000}
            alt="earphone"
          />
        </div>
      </div>
      <div className="col-span-2">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Earphone A1</h1>
        <p className="mb-4 text-3xl font-medium text-gray-900">$140</p>

        <p className="my-4">
          The Zip Tote Basket is the perfect midpoint between shopping tote and
          comfy backpack. With convertible straps, you can hand carry, should
          sling, or backpack this convenient and spacious bag. The zip top and
          durable canvas construction keeps your goods protected for all-day
          use.
        </p>

        <Button
          size="lg"
          onClick={() =>
            cart.addProduct({
              image: "/assets/earphones_a_1.webp",
              name: "Earphone A1",
              price: 140,
              slug: params.slug,
            })
          }
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
