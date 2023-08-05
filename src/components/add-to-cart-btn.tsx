"use client";

import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/types/product";
import { useToast } from "./ui/use-toast";
import { ShoppingBag } from "lucide-react";

export default function AddToCartBtn({ product }: { product: IProduct }) {
  const { addProduct } = useCart();
  const { toast } = useToast();

  return (
    <Button
      size="lg"
      onClick={() => {
        addProduct(product);
        toast({
          description: "Product added to your shopping cart!",
        });
      }}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      Add to cart
    </Button>
  );
}
