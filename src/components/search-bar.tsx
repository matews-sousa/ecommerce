"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search");
    router.replace(`/?search=${searchQuery}`);
  };

  return (
    <form className="items-center" onSubmit={handleSubmit}>
      <Input
        id="search"
        name="search"
        type="search"
        autoComplete="off"
        placeholder="Search..."
        className="lg:w-[300px]"
      />
    </form>
  );
}
