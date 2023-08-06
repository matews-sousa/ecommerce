"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "./ui/separator";
import CartItem from "./cart-item";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, cartSize, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [cSize, setCSize] = useState(0);
  const router = useRouter();

  const checkout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(cart),
      });
      const data = await response.json();

      setIsLoading(false);
      router.push(data.url);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setCSize(cartSize);
  }, [cartSize]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ShoppingBag className="h-6 w-6" />
          <span className="ml-2 text-sm font-bold">{cSize}</span>
          <span className="sr-only">Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="mt-4 flex h-[62vh] flex-col gap-4">
          {cartSize === 0 ? (
            <h3 className="mt-24 text-center font-medium">
              You do not have any items. Keep shopping and add some products to
              your Cart.
            </h3>
          ) : (
            <>
              {cart?.map((p, i) => (
                <div key={p.name}>
                  {i !== 0 && <Separator className="my-4" />}
                  <CartItem product={p} />
                </div>
              ))}
              <Button
                variant="destructive"
                className="mt-4 w-full"
                onClick={clearCart}
              >
                Clear cart
              </Button>
            </>
          )}
        </ScrollArea>
        <Separator className="my-4" />
        <SheetFooter>
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <p className="my-2 text-center text-xs text-red-400">
              The payment will not be real, use 4242 4242 4242 4242 as the
              credit card fields.
            </p>
            <Button
              className="w-full"
              disabled={cartSize === 0 || isLoading}
              onClick={checkout}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center">
              or
              <SheetClose asChild>
                <Button variant="link" className="text-blue-500">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SheetClose>
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
