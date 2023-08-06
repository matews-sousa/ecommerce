"use client";

import { ICategory, ISize } from "@/types/product";
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
  sizes: ISize[];
}

export default function Filters({ categories, sizes }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValues = Array.from(searchParams.entries());

  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="Categories">
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
      <Accordion type="single" collapsible>
        <AccordionItem value="Sizes">
          <AccordionTrigger>
            <span>
              Sizes{" "}
              <span className="text-sm uppercase text-gray-700">
                {searchParams.get("size")
                  ? `(${searchParams.get("size")})`
                  : ""}
              </span>
            </span>
          </AccordionTrigger>
          {sizes.map((size) => (
            <AccordionContent key={size.name}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={size.value}
                  checked={searchValues.some(
                    ([key, value]) => value === size.value
                  )}
                  onCheckedChange={(checked) => {
                    const params = new URLSearchParams(searchValues);
                    checked
                      ? params.set("size", size.value)
                      : params.delete("size");
                    router.replace(`/?${params.toString()}`);
                  }}
                />
                <label
                  htmlFor={size.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {size.name}
                </label>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
