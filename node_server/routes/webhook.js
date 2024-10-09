const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const router = express.Router();

const STRIPE_WEBHOOK_SECRET = process.env.stripe_webhook_secret;
const STRIPE_SECRET_KEY = process.env.stripe_secret_key;
const STRIPE = new Stripe(STRIPE_SECRET_KEY);

router.post('/', (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log('jjjj', event.type);
    // Handle the event
    switch (event.type) {
        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            console.log(`Payment for invoice ${invoice.id} succeeded.`);
            console.log('Event data:', event.data);
            // Here you can update your database to mark the subscription as active
            break;
        // Add more cases to handle other event types if needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});

module.exports = router;
