"use client";
import Link from "next/link";
import Cart from "./cart";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith("/studio")) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search");
    router.replace(`/?search=${searchQuery}`);
  };

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-12 py-4">
      <Link href="/" className="text-3xl font-extrabold">
        audiophile
      </Link>

      <form
        className="hidden items-center lg:inline-flex"
        onSubmit={handleSubmit}
      >
        <Input
          id="search"
          name="search"
          type="search"
          autoComplete="off"
          placeholder="Search..."
          className="lg:w-[300px]"
        />
      </form>

      <Cart />
    </nav>
  );
}
