import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-12 py-4">
      <Link href="/" className="text-3xl font-extrabold">
        Audiophile
      </Link>
      <Button variant="ghost" size="icon" aria-label="Shopping Cart">
        <ShoppingBag className="h-6 w-6" />
      </Button>
    </nav>
  );
}
