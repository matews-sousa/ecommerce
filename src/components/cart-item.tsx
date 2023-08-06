import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { IProduct } from "@/types/product";
import { urlForImage } from "../../sanity/lib/image";
import { Input } from "./ui/input";

interface ProductProps {
  product: IProduct & {
    quantity: number;
    size?: string;
  };
}

export default function CartItem({ product }: ProductProps) {
  const { removeProduct, incrementQuantity } = useCart();

  return (
    <div className="grid grid-cols-3 gap-4 pr-4">
      <Image
        src={urlForImage(product.images[0]).url()}
        width={500}
        height={500}
        alt={product.name}
        className="col-span-1 rounded-md border border-gray-200"
      />
      <div className="col-span-2 flex flex-col justify-between text-gray-900">
        <div className="flex justify-between gap-4 text-xs font-medium sm:text-base">
          <div>
            <h3>
              {product.name.length > 12
                ? product.name.slice(0, 12) + "..."
                : product.name}
            </h3>
            {product.size && (
              <p className="text-sm text-gray-700">Size: {product.size}</p>
            )}
          </div>
          <p>${product.price}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-r-none"
              onClick={() => incrementQuantity(product, -1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex w-6 items-center justify-center self-stretch border-b border-t border-gray-200">
              {product.quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none"
              onClick={() => incrementQuantity(product, 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-red-400"
            onClick={() => removeProduct(product)}
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
