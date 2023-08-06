import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import { IProduct } from "@/types/product";
import { urlForImage } from "../../sanity/lib/image";
import { CartProduct } from "@/contexts/CartContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function validateShoppingCart(productsJSON: CartProduct[]) {
  const inventory = await client.fetch<IProduct[]>(groq`*[_type == "product"] {
    _id
  }`);

  const isValid = (): boolean => {
    productsJSON.forEach((p) => {
      return inventory.some((inventoryItem) => inventoryItem._id === p._id);
    });
    return true;
  };

  if (!isValid()) {
    throw "Shopping cart is invalid.";
  }

  const lineItems = productsJSON.map((p) => {
    return {
      quantity: p.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(p.price * 100), // convert float number to int (money to centavos)
        product_data: {
          name: `${p.name} ${p.size ? `(${p.size})` : ""}`,
          description: p.description,
          images: [urlForImage(p.images[0]).url()],
        },
      },
    };
  });

  return lineItems;
}
