import CheckoutSession from "@/components/checkout-session";
import stripe from "@/lib/stripe";

interface Props {
  searchParams?: {
    session_id?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const sessionId = searchParams?.session_id ?? "";

  const fetchCheckoutSession = async () => {
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        sessionId
      );
      return checkoutSession;
    } catch (error) {
      return null;
    }
  };

  const checkoutSession = await fetchCheckoutSession();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <CheckoutSession checkoutSession={checkoutSession} />
    </div>
  );
}
