import React from "react";
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
import { ShoppingBag, MoveRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import CartItem from "./cart-item";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  const { cart, cartSize, totalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Shopping Cart"
          className="relative"
        >
          <ShoppingBag className="h-6 w-6" />
          <Badge variant="destructive" className="absolute -right-2 top-0">
            {cartSize}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="mt-4 flex h-[65vh] flex-col gap-4">
          {cart.map((p, i) => (
            <div key={p.name}>
              {i !== 0 && <Separator className="my-4" />}
              <CartItem p={p} />
            </div>
          ))}
        </ScrollArea>
        <Separator className="my-4" />
        <SheetFooter>
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <Button className="mt-4 w-full">Checkout</Button>
            <p className="text-center">
              or
              <SheetClose asChild>
                <Button variant="link" className="text-blue-500">
                  Continue Shopping
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </SheetClose>
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
