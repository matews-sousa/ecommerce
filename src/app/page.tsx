import Product from "@/components/product";
import { products } from "@/constants/products";

export default function Home() {
  return (
    <>
      <h3 className="mb-4 text-center text-2xl font-extrabold sm:text-3xl md:text-4xl">
        Trending products
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Product product={product} key={product.image} />
        ))}
      </div>
    </>
  );
}
