const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();
const Account = require("../models/Account");

const router = express.Router();

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE = new Stripe(STRIPE_SECRET_KEY);

const PLANS = {
  Free: {
    name: "Free",
    price: 0,
    images: "60 Minutes/Day",
    video: "5 Minutes/Day",
    id: "free",
  },
  Premium: {
    name: "Premium",
    price: 6.0,
    images: "Unlimited Minutes/Day",
    video: "45 Minutes/Day",
    id: "price_1Q7H9OP0Bii0CHodYPqqqEmd",
  },
  Deluxe: {
    name: "Deluxe",
    price: 9.9,
    images: "Unlimited Minutes/Day",
    video: "Unlimited Minutes/Day",
    id: "price_1Q7HBFP0Bii0CHodsHrXHIEt",
  },
};

async function handleInvoicePaymentSucceeded(invoice) {
  console.log("Invoice payment succeeded:", invoice);

  try {
    const subscriptionId = invoice.subscription;

    const account = await Account.findOne({
      "payments.subscriptionId": subscriptionId,
    });

    if (account) {
      console.log("Subscription exists in the database:", account);

      const existingPayment = account.payments.find(
        (payment) => payment.subscriptionId === subscriptionId
      );

      if (!existingPayment) {
        const paymentDetails = {
          subscriptionId,
          customerId: invoice.customer,
          status: invoice.status,
          planId: invoice.lines.data[0].price.id,
          amount: invoice.amount_paid / 100,
          currency: invoice.currency,
          created: new Date(invoice.created * 1000),
          interval: invoice.billing_reason,
          invoice_id: invoice.id,
          payment_confirmed: true,
        };

        account.payments.push(paymentDetails);
        console.log(
          `Payment for invoice ${invoice.id} recorded in the database.`
        );
      } else {
        if (!existingPayment.payment_confirmed) {
          existingPayment.payment_confirmed = true;
          await account.save();
          console.log(`Payment confirmed for invoice ${invoice.id}.`);
        } else {
          console.log(`Payment for invoice ${invoice.id} already recorded.`);
        }
      }

      const planType = invoice.lines.data[0].price.id;
      account.plan =
        PLANS[
          Object.keys(PLANS).find((key) => PLANS[key].id === planType)
        ].name;
      await account.save();

      console.log(`Account plan updated to ${account.plan}`);
    } else {
      console.log("No account found for subscription ID:", subscriptionId);
    }
  } catch (error) {
    console.error(`Error processing invoice ${invoice.id}:`, error.message);
  }
}

// Middleware to parse the raw body for the webhook
router.post("/", async (req, res) => {
  console.log("Webhook route set up successfully.");
  console.log("Received webhook:", req.body);
  console.log("Headers:", req.headers);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Event type:", event.type);

  switch (event.type) {
    case "invoice.payment_succeeded":
      await handleInvoicePaymentSucceeded(event.data.object);
      break;

    // Add more cases to handle other event types if needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

module.exports = router;
