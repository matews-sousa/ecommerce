"use client";

import { ICategory } from "@/types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  categories: ICategory[];
}

export default function Filters({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValues = Array.from(searchParams.entries());

  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="Cateogires">
          <AccordionTrigger>
            <span>
              Categories{" "}
              <span className="text-sm uppercase text-gray-700">
                {searchParams.get("category")
                  ? `(${searchParams.get("category")})`
                  : ""}
              </span>
            </span>
          </AccordionTrigger>
          {categories.map((category) => (
            <AccordionContent key={category.name}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.slug}
                  checked={searchValues.some(
                    ([key, value]) => value === category.slug
                  )}
                  onCheckedChange={(checked) => {
                    const params = new URLSearchParams(searchValues);
                    checked
                      ? params.set("category", category.slug)
                      : params.delete("category");
                    router.replace(`/?${params.toString()}`);
                  }}
                />
                <label
                  htmlFor={category.slug}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
