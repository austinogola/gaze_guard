const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Account = require('../models/Account');
const router = express.Router();

// process.env.jwtSecret
const generateToken = async(member) => {
    // console.log(process.env.jwtSecret)
    return new Promise(async(resolve,reject)=>{
        const maxAge = 24 *15 * 60 * 60;
    const token=await jwt.sign(
            { id: member._id, email: member.email },
            'qwertyuiopasdfghjklzxcvbnm',
            {
                expiresIn:maxAge
            }
        )
     resolve(token)
    })
    
};

// Middleware to authenticate using the JWT token from cookies
const authenticateJWT = (req, res, next) => {
    // const token = req.cookies.gg_token;
    const token=req.headers.authorization
    if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });


// console.log(process.env.jwtSecret)
// console.log(token)
    jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm', (err, user) => {
        console.log(user)
        // console.log(err)
        // console.log(user)
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Add the decoded user info to the request object
        next();
    });
};

// Sign Up and Automatically Log In
router.post('/signup', async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        // console.log(email, username, password)

        // Create a new member
        const newMember = new Member({ email, username, password });
        await newMember.save();
        console.log(newMember)

        const newAccount = new Account({ memberId:newMember._id, username, password,plan:'free',usage:[] });
        await newAccount.save();

        // Automatically log in the user
        req.login(newMember, async err => {
            if (err) {
                return next(err);
            }
            

            // Generate JWT
            const token = await generateToken(newMember);
            console.log('the token',token)

            // Set token in cookies
            // res.cookie('gg_token', token, { httpOnly: true });

            // Send response
            res.status(200).json({ message: 'User created and logged in', gg_token:token,status:"success" });
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
});

// Log In and Send Token
router.post('/login', async(req, res, next) => {
    passport.authenticate('local', async(err, member, info) => {
        if (err) return next(err);
        if (!member) return res.status(401).json({ message: info.message });

        req.login(member, async(err) => {
            if (err) return next(err);

            console.log(member)
            // Generate JWT
            const token = await generateToken(member);
            console.log('the tokennn',token)

            // Set token in cookies
            // res.cookie('auth_token', token, { httpOnly: true });

            // Send response
            res.status(200).json({ message: 'Logged in successfully', gg_token:token,status:"success" });
        });
    })(req, res, next);
});

// Log Out
router.post('/logout', (req, res) => {
    res.clearCookie('auth_token');  // Clear the auth cookie
    req.logout();
    res.json({ message: 'Logged out successfully' });
});

const plans_objects={
    "free":{"images":100,"video":100},
    "basic":{"images":"unlimited","video":200},
    "pro":{"images":'unlimited',"video":'unlimited'}
    }

function getMemberUsageRemnants(the_account) {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();

    // const accountData = the_account.toObject();  // Assuming we're working with Mongoose, convert document to JS object
    const plan = the_account.plan;
    const usage = the_account.usage;

    const maxImages = plans_objects[plan]["images"];
    const maxMinutes = plans_objects[plan]["video"];

    let remainingImages = 'unlimited';
    let remainingMinutes = 'unlimited';

    if (typeof maxImages === 'number') {
        // Filter for today's images
        console.log('allimages',usage)
        const imagesToday = usage.filter(obj => {
            return obj.time_added >= startOfToday && obj.time_added < startOfTomorrow && obj.type === 'image';
        });
        console.log('imagesToday',imagesToday)
        console.log('startOfToday',startOfToday,'startOfTomorrow',startOfTomorrow)
        remainingImages = maxImages - imagesToday.length;
    }

    if (typeof maxMinutes === 'number') {
        // Filter for today's videos
        const videosToday = usage.filter(obj => {
            return obj.time_added >= startOfToday && obj.time_added < startOfTomorrow && obj.type === 'video';
        });

        const minutesToday = videosToday.reduce((sum, obj) => sum + obj.minutes, 0);
        remainingMinutes = maxMinutes - minutesToday;
    }

    return {
        max_minutes: maxMinutes,
        remaining_minutes: remainingMinutes,
        max_images: maxImages,
        remaining_images: remainingImages
    };
}

router.get('/api/config', authenticateJWT, async (req, res) => {
    console.log('checking config')
    const account = await Account.findOne({ memberId: req.user.id });
    console.log(account)
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

    let config_data=getMemberUsageRemnants(account)
    return res.status(200).json({'status': 'success', 'data':config_data})
})

router.post('/api/usage', authenticateJWT, async (req, res) => {
    try {
        const { type,gg_src,time } = req.body; // The new usage data sent in the request

        // Find the account based on the logged-in member's ID
        const account = await Account.findOne({ memberId: req.user.id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if(!type){
            return res.status(400).json({ message: 'Type missing'});
        }

        console.log(type)
        const time_added=new Date().getTime()

        if(type=='image'){
           account.usage.push({type,time_added}); 
           await account.save();
        }else{
            const prev_obj = account.usage.find(obj => obj.type === 'video' && obj.gg_src === gg_src);
            console.log(prev_obj)
            if (!prev_obj) {
                account.usage.push({
                    time_added: time_added,  // You can replace this with the appropriate time value
                    type,gg_src,
                    minutes: time
                });
                await account.save();
            } else {
                prev_obj.minutes += time;
                await account.save();
            }
        }
        let config_data=getMemberUsageRemnants(account)

        // Add the new usage data to the account's usage array
        // 
        // 

        res.status(200).json({'status': 'success', 'message': 'Updated',"new_state":config_data});
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating usage', details: err.message });
    }
});

module.exports = router;
