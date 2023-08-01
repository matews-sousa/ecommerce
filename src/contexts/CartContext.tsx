"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface Product {
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
  addProduct: (product: Omit<Product, "quantity">) => void;
  removeProduct: (product: Omit<Product, "quantity">) => void;
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
  const totalPrice = cart?.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  const addProduct = (product: Omit<Product, "quantity">) => {
    if (cart.some((p) => p.slug === product.slug)) {
      setCart((prev) => {
        const p = cart.find((p) => p.slug === product.slug);

        return prev.map((pr) => {
          if (pr.slug == p?.slug) {
            return {
              ...pr,
              quantity: p?.quantity + 1,
            };
          }
          return pr;
        });
      });
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (product: Omit<Product, "quantity">) => {
    setCart((prev) => prev.filter((p) => p.slug !== product.slug));
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
