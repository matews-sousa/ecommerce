import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { validateShoppingCart } from "@/lib/utils";
import { CartProduct } from "@/contexts/CartContext";

export async function POST(request: Request) {
  const cartDetails = (await request.json()) as CartProduct[];
  const line_items = await validateShoppingCart(cartDetails);
  const origin = request.headers.get("origin");

  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    shipping_address_collection: {
      allowed_countries: ["BR", "US"],
    },
    billing_address_collection: "auto",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  return NextResponse.json(session);
}
