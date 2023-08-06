import { defineType } from "sanity";

export const size = defineType({
  name: "size",
  title: "Sizes",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "value",
      title: "Value",
      type: "string",
    },
  ],
});
