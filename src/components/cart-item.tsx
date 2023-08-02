import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductProps {
  p: {
    id: number;
    image: string;
    name: string;
    slug: string;
    price: number;
    quantity: number;
  };
}

export default function CartItem({ p }: ProductProps) {
  const { removeProduct } = useCart();

  return (
    <div className="grid grid-cols-3 gap-4 px-2">
      <Image
        src={p.image}
        width={500}
        height={500}
        alt={p.name}
        className="col-span-1 rounded-md border border-gray-200"
      />
      <div className="col-span-2 flex flex-col justify-between text-gray-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{p.name}</h3>
          <p className="text-lg font-semibold">${p.price}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>Qty: {p.quantity}</p>
          <Button
            variant="link"
            className="text-red-400"
            onClick={() => removeProduct(p.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
