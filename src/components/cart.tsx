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
import { ShoppingBag, MoveRight, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import CartItem from "./cart-item";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, cartSize, totalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
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
          {cartSize > 0 && (
            <Badge variant="destructive" className="absolute -right-2 top-0">
              {cartSize}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="mt-4 flex h-[65vh] flex-col gap-4">
          {cartSize === 0 ? (
            <h3 className="mt-24 text-center font-medium">
              You do not have any items. Keep shopping and add some products to
              your Cart.
            </h3>
          ) : (
            cart?.map((p, i) => (
              <div key={p.name}>
                {i !== 0 && <Separator className="my-4" />}
                <CartItem product={p} />
              </div>
            ))
          )}
        </ScrollArea>
        <Separator className="my-4" />
        <SheetFooter>
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <Button
              className="mt-4 w-full"
              disabled={cartSize === 0 || isLoading}
              onClick={checkout}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Checkout
            </Button>
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
