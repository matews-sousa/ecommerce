"use client";
import Link from "next/link";
import Cart from "./cart";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) return null;

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-12 py-4">
      <Link href="/" className="text-3xl font-extrabold">
        audiophile
      </Link>

      <Cart />
    </nav>
  );
}
