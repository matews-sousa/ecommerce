import { Image } from "sanity";

export interface ICategory {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  image?: Image;
}

export interface IProduct {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  description: string;
  category: ICategory;
  price: number;
  images: Image[];
  sku: string;
}
