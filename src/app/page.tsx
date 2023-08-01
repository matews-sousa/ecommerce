import Product from "@/components/product";

const products = [
  {
    image: "/assets/speaker1.webp",
    name: "Speaker 1",
    slug: "speaker1",
    price: 120,
  },
  {
    image: "/assets/speaker2.webp",
    name: "Speaker 2",
    slug: "speaker2",
    price: 120,
  },
  {
    image: "/assets/earphones_a_1.webp",
    name: "Eearphone A1",
    slug: "earphone-a1",
    price: 120,
  },
  {
    image: "/assets/speaker4.webp",
    name: "Speaker 4",
    slug: "speaker4",
    price: 120,
  },
  {
    image: "/assets/headphones_a_1.webp",
    name: "Headphone A1",
    slug: "headphone-a1",
    price: 120,
  },
  {
    image: "/assets/headphones_b_1.webp",
    name: "Headphone B1",
    slug: "headphone-b1",
    price: 120,
  },
];

export default function Home() {
  return (
    <>
      <h3 className="mb-4 text-center text-4xl font-extrabold">
        Trending products
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <Product product={product} key={product.image} />
        ))}
      </div>
    </>
  );
}
