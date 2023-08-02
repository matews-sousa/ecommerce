"use client";

import { products } from "@/constants/products";
import { createContext, useContext, useState, useEffect } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cart: Product[];
  cartSize: number;
  totalPrice: number;
  addProduct: (id: number) => void;
  removeProduct: (id: number) => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const storageCart = localStorage.getItem("cart");
  const [cart, setCart] = useState<Product[]>(
    storageCart === null ? null : JSON.parse(storageCart)
  );
  const cartSize = cart?.reduce((previous, current) => {
    return previous + current.quantity;
  }, 0);
  const totalPrice = parseFloat(
    cart
      ?.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0)
      .toFixed(2)
  );

  const addProduct = (id: number) => {
    const product = products.find((p) => p.id === id);

    if (!product) return;

    if (cart.some((p) => p.id === id)) {
      setCart((prev) => {
        return prev.map((pr) => {
          if (pr.id == product?.id) {
            return {
              ...pr,
              quantity: pr?.quantity + 1,
            };
          }
          return pr;
        });
      });
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartSize,
        totalPrice,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
