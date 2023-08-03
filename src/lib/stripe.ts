import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(apiKey!, {
  apiVersion: "2022-11-15",
});

export default stripe;
