import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
      },
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "categories",
      type: "array",
      of: [{ type: "string" }],
      title: "Categories",
    },
    {
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      title: "Images",
    },
    {
      name: "sku",
      type: "string",
      title: "SKU",
    },
  ],
});