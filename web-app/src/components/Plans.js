import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Plans.css'

const Plans = () => {
  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    // Navigate to payment page with the selected plan
    navigate(`/checkout?plan=${plan}`);
  };

  return (
    <div className="pricing-container">
      <h1>Pricing</h1>
      <div className="pricing-plans">
        <div className="plan free-plan">
          <h2>Free Plan</h2>
          <p className="price">$0/month</p>
          <ul>
            <li>60 Minutes / Day</li>
            <li>5 Minutes Video / Day</li>
          </ul>
          <button onClick={() => handleChoosePlan('free')}>Choose Plan</button>
        </div>
        <div className="plan premium-plan">
          <div className="most-popular">Most Popular</div>
          <h2>Premium Plan</h2>
          <p className="price">$6/month</p>
          <ul>
            <li>Unlimited Images</li>
            <li>45 Minutes Video / Day</li>
          </ul>
          <button onClick={() => handleChoosePlan('premium')}>Choose Plan</button>
        </div>
        <div className="plan deluxe-plan">
          <h2>Deluxe Plan</h2>
          <p className="price">$9.9/month</p>
          <ul>
            <li>Unlimited Images</li>
            <li>Unlimited Videos</li>
          </ul>
          <button onClick={() => handleChoosePlan('deluxe')}>Choose Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
