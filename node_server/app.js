const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/stripe');
require('dotenv').config();
const cors=require('cors')
var bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')

const app = express();

// Middleware
app.use((req, res, next) => {
    if (req.originalUrl === '/stripe/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});
const allowedOrigins = [
    'http://localhost:3000',
     "https://app.gazeguard.io",
    "https://www.app.gazeguard.io",
    "https://www.gazeguard.io",
    "https://server.gazeguard.io",
    "https://gazeguard.io",
  ];            
app.use(cors({
    origin:allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')

// Routes
app.use('/auth', authRoutes);
app.use('/stripe', stripeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
