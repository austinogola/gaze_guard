import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './styles/Checkout.css';

const stripePromise = loadStripe('your-publishable-key-here');

const Checkout = () => {
 
  const stripe = useStripe();
  const elements = useElements();
  const [planDetails, setPlanDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.gg_token) {
      navigate(`/login?bounce=checkout`);
    }
  }, [cookies, navigate]);

  const [searchParams] = useSearchParams();
  const planType = searchParams.get('plan')

  useEffect(() => {
    // Fetch plan details based on planType
    // This is a placeholder. In a real app, you'd fetch this from an API
    const details = {
      free: { name: 'Free Plan', price: 0 },
      premium: { name: 'Premium Plan', price: 6 },
      deluxe: { name: 'Deluxe Plan', price: 9.9 }
    };
    setPlanDetails(details[planType] || {});
  }, [planType]);

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
      return;
    }

    try {
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          formData: {
            name: formData.name,
            email: cookies.email, // Assuming email is stored in cookies
            token: paymentMethod.id,
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Payment successful');
      } else {
        console.error('Payment failed', data.error);
      }
    } catch (error) {
      console.error('Error processing payment', error);

    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <form className="payment-form" onSubmit={handleSubmit}>
            <h2>Credit/Debit Card</h2>
            <div className="form-group">
              <label htmlFor="name">Name On Card</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <CardElement />
            </div>
            <button className="pay-button" type="submit">Pay Now</button>
          </form>
          <div className="plan-details">
            <h2>Plan Details</h2>
            <div className="plan-info">
              <img src="/path-to-plan-icon.png" alt="Plan Icon" className="plan-icon" />
              <div>
                <h3>{planDetails.name || 'Selected Plan'}</h3>
                <p>${planDetails.price}/month</p>
              </div>
            </div>
            <div className="promo-code">
              <input type="text" placeholder="Enter code here" />
              <button>Apply</button>
            </div>
            <div className="total">
              <p>Total</p>
              <p>${planDetails.price}</p>
            </div>
            <p className="terms">
              By checking out you agree with our Terms of Service and confirm that you have read our
              Privacy Policy. You can cancel recurring payments at any time.
            </p>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Checkout
