import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./styles/plansBilling.css";

const PlansAndBilling = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["gg_token"]);
  const [accountDetails, setAccountDetails] = useState({});
  const [selectedTab, setSelectedTab] = useState("plan");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/api/user/plans",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.gg_token}`,
            },
          }
        );
        setPlans(response.data.payments);
        setAccountDetails({
          plan: response.data.plan,
          usage: response.data.usage,
        });
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch plans"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [cookies.gg_token]);

  const renderPlanDetails = () => (
    <div className="plan-details">
      <h2>Plan: {accountDetails.plan}</h2>
      <div className="plan-overview">
        {/* Assuming usage data includes subscribers and emails sent */}
        {accountDetails.usage?.map((usageItem, index) => (
          <div key={index}>
            <p>Subscribers used: {usageItem.subscribersUsed}</p>
            <p>Emails sent: {usageItem.emailsSent}</p>
          </div>
        ))}
        {/* Button for upgrading the plan */}
        <button className="btn-upgrade">Upgrade Plan</button>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="payment-methods">
      <h3>Payment Methods</h3>
      {plans.map((payment) => (
        <div className="payment-method" key={payment.subscriptionId}>
          <p>Plan ID: {payment.planId}</p>
          <p>
            Amount: {payment.amount} {payment.currency}
          </p>
          <p>Status: {payment.status}</p>
          <p>Date: {new Date(payment.created).toLocaleString()}</p>
          <p>Payment Confirmed: {payment.payment_confirmed ? "Yes" : "No"}</p>
        </div>
      ))}
      <button className="btn-add-method">+ New Payment Method</button>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="billing-page">
      <div className="side-menu">
        <ul>
          <li
            onClick={() => setSelectedTab("plan")}
            className={selectedTab === "plan" ? "active" : ""}
          >
            Plan & Billing
          </li>
          <li
            onClick={() => setSelectedTab("payments")}
            className={selectedTab === "payments" ? "active" : ""}
          >
            Payment Methods
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedTab === "plan" && renderPlanDetails()}
        {selectedTab === "payments" && renderPaymentMethods()}
      </div>
    </div>
  );
};

export default PlansAndBilling;
