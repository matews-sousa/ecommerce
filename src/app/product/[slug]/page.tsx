import { IProduct } from "@/types/product";
import { client } from "../../../../sanity/lib/client";
import { groq } from "next-sanity";
import AddToCart from "@/components/add-to-cart";
import ProductImages from "@/components/product-images";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await client.fetch<IProduct>(
    groq`*[slug.current == "${params.slug}"][0] {
      _id,
      name,
      description,
      price,
      images,
      "slug": slug.current,
      "sizes": sizes[]->{
        _id,
        name,
        value
      },
      category->{
        _id,
        name,
        "slug": slug.current
      }
    }`
  );

  if (!product) return <h1>Not found</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      <div className="cols-span-1 mb-4">
        <ProductImages images={product.images} name={product.name} />
      </div>
      <div className="lg:col-span-2">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-4xl">
          {product.name}
        </h1>
        <p className="mb-4 text-xl font-medium text-gray-900 md:text-3xl">
          ${product.price}
        </p>

        <p className="md:text-md my-4 text-sm">{product.description}</p>

        <AddToCart product={product} />
      </div>
    </div>
  );
}
