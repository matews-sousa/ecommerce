import Product from "@/components/product";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import { IProduct } from "@/types/product";

export default async function Home() {
  const products = await client.fetch<IProduct[]>(groq`*[_type == "product"] {
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    price,
    images
  }`);

  return (
    <>
      <h3 className="mb-4 text-center text-2xl font-extrabold sm:text-3xl md:text-4xl">
        Trending products
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
