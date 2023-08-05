import Product from "@/components/product";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import { ICategory, IProduct } from "@/types/product";
import Header from "@/components/header";
import Filters from "@/components/filters";
import SearchBar from "@/components/search-bar";

interface Props {
  searchParams: {
    date?: string;
    price?: string;
    category?: string;
    search?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { price, date, category, search } = searchParams;
  const priceOrder = price ? `| order(price ${price})` : "";
  const dateOrder = date ? `| order(_createdAt ${date})` : "";
  const order = `${priceOrder}${dateOrder}`;
  const filter = category ? `&& category->slug.current == "${category}"` : "";
  const searchFilter = search ? `&& name match "${search}*"` : "";

  const products = await client.fetch<
    IProduct[]
  >(groq`*[_type == "product" ${filter}${searchFilter}] ${order} {
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    price,
    images,
    category->{
      _id,
      name,
      "slug": slug.current
    }
  }`);
  const categories = await client.fetch<
    ICategory[]
  >(groq`*[_type == "category"] {
    _id,
    _createdAt,
    name,
    "slug": slug.current
  }`);

  return (
    <>
      <div className="inline-flex w-full justify-center lg:hidden">
        <SearchBar />
      </div>
      <Header productsCount={products.length} />
      <div className="grid grid-cols-1 space-y-4 md:grid-cols-5 md:gap-4">
        <Filters categories={categories} />
        <div className="col-span-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
}
