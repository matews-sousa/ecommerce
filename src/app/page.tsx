import Product from "@/components/product";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import { IProduct } from "@/types/product";
import Header from "@/components/header";

interface Props {
  searchParams: {
    date?: string;
    price?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { price, date } = searchParams;
  const priceOrder = price ? `| order(price ${price})` : "";
  const dateOrder = date ? `| order(_createdAt ${date})` : "";
  const order = `${priceOrder}${dateOrder}`;
  const products = await client.fetch<
    IProduct[]
  >(groq`*[_type == "product"] ${order} {
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    price,
    images
  }`);

  return (
    <>
      <Header productsCount={products.length} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
