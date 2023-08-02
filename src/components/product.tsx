import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: {
    id: number;
    image: string;
    name: string;
    slug: string;
    price: number;
  };
}

export default function Product({
  product: { id, image, name, slug, price },
}: ProductProps) {
  return (
    <Link href={`product/${id}`} className="group cursor-pointer">
      <div className="w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={image}
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
