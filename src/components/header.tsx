"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

interface Props {
  productsCount: number;
}

const sortOptions = [
  { name: "Newest", value: "/?date=desc" },
  { name: "Low to high", value: "/?price=asc" },
  { name: "High to low", value: "/?price=desc" },
];

export default function Header({ productsCount }: Props) {
  const router = useRouter();

  return (
    <div className="mb-4 flex items-center justify-between border-b border-gray-200 py-4">
      <h3 className="text-lg font-semibold">
        {productsCount} result{productsCount === 1 ? "" : "s"}
      </h3>
      <Select
        onValueChange={(value) => {
          router.replace(value);
        }}
      >
        <SelectTrigger className="max-w-[150px] md:max-w-[250px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.name} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
