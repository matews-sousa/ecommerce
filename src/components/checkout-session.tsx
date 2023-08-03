"use client";

import { CheckCheck, XCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Stripe from "stripe";
import { useCart } from "@/contexts/CartContext";

interface Props {
  checkoutSession: Stripe.Checkout.Session | null;
}

export default function CheckoutSession({ checkoutSession }: Props) {
  const { clearCart } = useCart();
  const customerDetails = checkoutSession?.customer_details;

  useEffect(() => {
    if (customerDetails) {
      clearCart();
    }
  }, [customerDetails, clearCart]);

  if (!customerDetails) {
    return (
      <>
        <XCircle className="mt-24 h-16 w-16 text-red-400" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-red-400">
          No checkout session found
        </h1>
        <Link href="/">
          <Button className="mt-4">Go back Home</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <CheckCheck className="mt-24 h-16 w-16 text-green-500" />
      <h1 className="text-4xl font-bold tracking-tight text-green-500">
        Order Successful!
      </h1>
      <h3 className="my-6 text-2xl">
        Thank you,{" "}
        <span className="font-extrabold">{customerDetails.name}</span>!
      </h3>
      <p>
        Check your purchase email{" "}
        <span className="font-extrabold text-indigo-500">
          {customerDetails.email}
        </span>{" "}
        for your invoice.
      </p>
      <Link href="/">
        <Button className="mt-4">Go back Home</Button>
      </Link>
    </>
  );
}
