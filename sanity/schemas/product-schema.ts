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
      title: "Category",
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      title: "Sizes",
      name: "sizes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "size" }],
        },
      ],
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
