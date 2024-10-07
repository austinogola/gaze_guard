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

router.post('/create-subscription',async(req,res,next)=>{
    const STRIPE=new Stripe(process.env.stripe_secret_key)
    const subscription = await STRIPE.subscriptions.create({
        
    })
})

module.exports = router;