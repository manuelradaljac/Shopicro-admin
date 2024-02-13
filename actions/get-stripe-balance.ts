import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16",
});

export const getStripeBalance = async () => {
  const balance = await stripe.balance.retrieve();

  const availableBalance = balance.available.filter(
    (b) => b.currency === "eur"
  );

  if (availableBalance.length > 0) {
    const amount = availableBalance[0].amount / 100;
    return `${amount.toFixed(2)}€`;
  } else {
    return "No available balance found for EUR"; // stripe dohvacanje balancea dostupnog za isplatu na racun za eur
  }
};
