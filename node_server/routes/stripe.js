const Stripe=require('stripe')
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Account = require('../models/Account');
const router = express.Router();

const STRIPE_WEBHOOK_SECRET=process.env.stripe_webhook_secret

const STRIPE=new Stripe(process.env.stripe_secret_key)

router.post('/', async(req, res, next) => {
    const sig=req.headers['stripe-signature']
});

router.post('/create-subscription', async (req, res, next) => {
    try {
        const { planType, formData } = req.body;
        const customer = await STRIPE.customers.create({
            name: formData.name,
            email: formData.email, // Assuming email is part of formData
            source: formData.token, // Assuming token is generated on the client-side
        });

        const subscription = await STRIPE.subscriptions.create({
            customer: customer.id,
            items: [{ plan: planType }],
        });

        res.json({ success: true, subscription });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
