import { Image } from "sanity";

export interface IProduct {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: Image[];
  sku: string;
}
