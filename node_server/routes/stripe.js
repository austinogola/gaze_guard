const Stripe=require('stripe')
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Account = require('../models/Account');
const { authenticateJWT } = require('../middleware/token');
const router = express.Router();
require('dotenv').config();

router.use(authenticateJWT);

const PLANS={
    Free:{
        name:"Free",
        price:0,
      images:'60 Minutes/Day',
      video:"5 Minutes/Day",
      id:'free'
    },
    Premium:
    {
        name:"Premium",
         price:6.0,
      images:'Unlimited Minutes/Day',
      video:"45 Minutes/Day",
      id:'price_1Q7H9OP0Bii0CHodYPqqqEmd'
    },
    Deluxe:{
      name:"Deluxe",
        price:9.9,
      images:'Unlimited Minutes/Day',
      video:"Unlimited Minutes/Day",
      id:'price_1Q7HBFP0Bii0CHodsHrXHIEt'
    }
  }

const STRIPE_WEBHOOK_SECRET=process.env.stripe_webhook_secret
const STRIPE_SECRET_KEY=process.env.stripe_secret_key
console.log(STRIPE_SECRET_KEY)
const STRIPE=new Stripe(STRIPE_SECRET_KEY)

const getSubsriptions=async()=>{
    const subscriptions = await STRIPE.subscriptions.search({
        query: 'status:\'active\'',
      });

    //   console.log(typeof subscriptions)
    //   const result = Object.values(subscriptions).map(ii => ({
    //     id: ii.id,
    //     items: ii.items,
    //     plan: ii.plan
    //   }));
    let tt=subscriptions.data.map(ii=>({id:ii.id,items:ii.items,plan:ii.plan}))
    console.log(tt)

      console.log(Object.keys(subscriptions))
    //   console.log(subscriptions.data)
    // console.log(subscriptions.search_result)
    // Object.values(subscriptions).forEach(tt=>{
    //     
    // })
}

// getSubsriptions()

router.get('/get-plans',authenticateJWT,async (req, res, next)=>{
    res.status(200).json({plans:PLANS})
})
router.get('/get-plan/:id',authenticateJWT,async (req, res, next)=>{
    const thePlan=Object.values(PLANS).find(obj => obj.id === req.params.id);
    res.status(200).json({plan:thePlan})
})

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log(event)
    // Handle the event
    switch (event.type) {
        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            console.log(`Payment for invoice ${invoice.id} succeeded.`);
            // Here you can update your database to mark the subscription as active
            break;
        // Add more cases to handle other event types if needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});

router.post('/create-subscription',authenticateJWT, async (req, res, next) => {
    // console.log(req.user)
    try {
        const { planType, formData } = req.body;
        
        const customer = await STRIPE.customers.create({
            name: formData.name,
            email: req.user.email, // Assuming email is part of formData
            // source: formData.token, // Assuming token is generated on the client-side
            payment_method:formData.token,
            invoice_settings: {
                default_payment_method: formData.token,
            },
        });
        console.log('customer created')

        // Attach the payment method to the customer
        await STRIPE.paymentMethods.attach(formData.token, {
            customer: customer.id,
        });
        console.log('customer payment')

        // Set the payment method as the default payment method
        await STRIPE.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: formData.token,
            },
        });

        console.log('customer updated')

        // console.log(customer)
        const subscription = await STRIPE.subscriptions.create({
            customer: customer.id,
            items: [{ price: 'price_1Q7H9OP0Bii0CHodYPqqqEmd' }],
        });

        console.log('subs created')
        console.log(subscription)

        res.json({ success: true, subscription });
    } catch (error) {
        console.error('Error creating subscription:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
