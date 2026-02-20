import Stripe from "stripe";

export function getStripeServer() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY mancante. Imposta la variabile in .env.local");
  }
  return new Stripe(key, { apiVersion: "2023-10-16" });
}
