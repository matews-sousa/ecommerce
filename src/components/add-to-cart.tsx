"use client";

import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/types/product";
import { useToast } from "./ui/use-toast";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function AddToCart({ product }: { product: IProduct }) {
  const { addProduct } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>();

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes) {
      toast({
        description: "Select a size to add to cart",
        variant: "destructive",
      });
      return;
    }

    const newProduct = {
      ...product,
      size: selectedSize,
    };

    addProduct(newProduct);
    toast({
      description: "Product added to your cart!",
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex flex-wrap gap-2">
        {product.sizes?.map((size) => (
          <button
            key={size.value}
            className={`rounded-md border border-gray-400 bg-gray-200 px-4 py-2 ${
              selectedSize === size.value ? "bg-gray-900 text-white" : ""
            }`}
            onClick={() => setSelectedSize(size.value)}
          >
            {size.name}
          </button>
        ))}
      </div>

      <Button size="lg" className="self-start" onClick={handleAddToCart}>
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to cart
      </Button>
    </div>
  );
}
