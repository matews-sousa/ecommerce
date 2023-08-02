import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus } from "lucide-react";

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
  const { removeProduct, incrementQuantity } = useCart();

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
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-r-none"
              onClick={() => incrementQuantity(p.id, -1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex w-6 items-center justify-center self-stretch border-b border-t border-gray-200">
              {p.quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none"
              onClick={() => incrementQuantity(p.id, 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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
