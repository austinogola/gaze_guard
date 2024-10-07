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
      id:'prod_QzFeqXA33eYraC'
    },
    Deluxe:{
      name:"Deluxe",
        price:9.9,
      images:'Unlimited Minutes/Day',
      video:"Unlimited Minutes/Day",
      id:'prod_QzFgjWlCES6Z6K'
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

getSubsriptions()

router.get('/get-plans',authenticateJWT,async (req, res, next)=>{
    res.status(200).json({plans:PLANS})
})
router.get('/get-plan/:id',authenticateJWT,async (req, res, next)=>{
    const thePlan=Object.values(PLANS).find(obj => obj.id === req.params.id);
    res.status(200).json({plan:thePlan})
})

router.post('/', async(req, res, next) => {
    const sig=req.headers['stripe-signature']
});

router.post('/create-subscription',authenticateJWT, async (req, res, next) => {
    console.log(req.user)
    try {
        const { planType, formData } = req.body;
        
        const customer = await STRIPE.customers.create({
            name: formData.name,
            email: req.user.email, // Assuming email is part of formData
            // source: formData.token, // Assuming token is generated on the client-side
            payment_method:formData.token,
        });

        console.log(customer)
        const subscription = await STRIPE.subscriptions.create({
            customer: customer.id,
            items: [{ price: 'price_1Q7H9OP0Bii0CHodYPqqqEmd' }],
        });

        res.json({ success: true, subscription });
    } catch (error) {
        console.error('Error creating subscription:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
