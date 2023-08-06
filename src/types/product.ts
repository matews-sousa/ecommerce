import { Image } from "sanity";

export interface ISize {
  _id: string;
  _createdAt: Date;
  name: string;
  value: string;
}

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
  sizes?: ISize[];
  category: ICategory;
  price: number;
  images: Image[];
  sku: string;
}
