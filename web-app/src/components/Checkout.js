import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './styles/Checkout.css';

const Checkout = () => {
 
  const [cookies] = useCookies(['gg_token']);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          formData,
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
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="card-icons">
            <span className="card-icon visa">Visa</span>
            <span className="card-icon mastercard">Mastercard</span>
            <span className="card-icon amex">American Express</span>
          </div>
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
          <button className="pay-button" type="submit" form="payment-form">Pay Now</button>
          <p className="terms">
            By checking out you agree with our Terms of Service and confirm that you have read our
            Privacy Policy. You can cancel recurring payments at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
