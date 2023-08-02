import { IProduct } from "@/types/product";
import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import AddToCartBtn from "@/components/add-to-cart-btn";

export default async function ProductPage({
  params,
}: {
  params: { slug: number };
}) {
  const product = await client.fetch<IProduct>(
    groq`*[slug.current == "${params.slug}"][0]`
  );

  if (!product) return <h1>Not found</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      <div className="cols-span-1 mb-4">
        <div className="bg-gray-200">
          <Image
            src={urlForImage(product.images[0]).url()}
            width={1000}
            height={1000}
            alt="earphone"
          />
        </div>
      </div>
      <div className="lg:col-span-2">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-4xl">
          {product.name}
        </h1>
        <p className="mb-4 text-xl font-medium text-gray-900 md:text-3xl">
          ${product.price}
        </p>

        <p className="md:text-md my-4 text-sm">{product.description}</p>

        <AddToCartBtn product={product} />
      </div>
    </div>
  );
}
