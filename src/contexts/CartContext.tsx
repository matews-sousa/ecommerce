"use client";

import { IProduct } from "@/types/product";
import { createContext, useContext, useState, useEffect } from "react";

export type CartProduct = IProduct & {
  quantity: number;
};

interface CartContextProps {
  cart: CartProduct[];
  cartSize: number;
  totalPrice: number;
  addProduct: (id: Omit<CartProduct, "quantity">) => void;
  removeProduct: (id: string) => void;
  incrementQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const cartDataFromLocalStorage = localStorage.getItem("cart");
    return cartDataFromLocalStorage !== null
      ? JSON.parse(cartDataFromLocalStorage)
      : [];
  });
  const cartSize = cart
    ? cart?.reduce((previous, current) => {
        return previous + current.quantity;
      }, 0)
    : 0;
  const totalPrice = cart
    ? parseFloat(
        cart
          ?.reduce((prev, curr) => {
            return prev + curr.price * curr.quantity;
          }, 0)
          .toFixed(2)
      )
    : 0;

  const addProduct = (product: Omit<CartProduct, "quantity">) => {
    const existingProduct = cart?.find((item) => item._id === product._id);

    if (existingProduct) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (id: string) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  };

  const incrementQuantity = (id: string, quantity: number) => {
    const product = cart.find((p) => p._id === id);

    if (!product) return;

    if (product?.quantity + quantity <= 0) {
      removeProduct(id);
      return;
    }

    setCart((prev) => {
      return prev.map((p) => {
        if (p._id === id) {
          return {
            ...p,
            quantity: p.quantity + quantity,
          };
        }
        return p;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
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
        incrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
