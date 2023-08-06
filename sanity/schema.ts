import { type SchemaTypeDefinition } from "sanity";
import { product } from "./schemas/product-schema";
import { category } from "./schemas/category-schema";
import { size } from "./schemas/size-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, size],
};
