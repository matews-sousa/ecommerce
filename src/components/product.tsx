import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";

interface ProductProps {
  product: IProduct;
}

export default function Product({
  product: { _id, images, name, slug, price },
}: ProductProps) {
  return (
    <Link href={`product/${slug}`} className="group cursor-pointer">
      <div className="w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={urlForImage(images[0]).url()}
          width={500}
          height={500}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
    </Link>
  );
}
