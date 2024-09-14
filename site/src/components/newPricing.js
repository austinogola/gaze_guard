import React from "react";
import "./styles/newPricing.css";
import plansImage from "./Images/icons8-image-50-black.png";
import plansVideo from "./Images/icons8-video-50-black.png";
import plansImageWhite from "./Images/icons8-image-50-white.png";
import plansVideoWhite from "./Images/icons8-video-50-white.png";

function Pricing() {
  return (
    <div className="PricingParentContainer">
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle">
          <h2>Tutorial</h2>
        </div>
        <div>
          <h2>
            Our Expert Tells Via <br />
            <span className="extensionSpan">Tutorial</span>{" "}
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            porta ante non ante dignissim aliquam. Pellentesque nunc leo,
            pretium a lorem vel, ornare mollis leo.
          </p>
        </div>
      </div>
      <div className="plansParentDiv">
        <div className="pricingPlans freePlan">
          <div className="recommendedDiv">
            <p>RECOMMENDED</p>
          </div>
          <div className="h1TextDiv">
            <h1>Free Plan</h1>
          </div>
          <div className="imageDivsParent">
            <div className="plansImagesDiv">
              <div>
                <img src={plansImage} alt="plansImage" />
              </div>

              <p>
                <span className="bolderText">60</span> Minutes / Day
              </p>
            </div>
            <div className="plansImagesDiv">
              <div>
                <img src={plansVideo} alt="plansImage" />
              </div>

              <p>
                <span className="bolderText">5</span> Minutes Video / Day
              </p>
            </div>
          </div>
          <div className="buttonDivPricingContainer">
            <button>CHOOSE PLAN</button>
          </div>
        </div>
        <div className="pricingPlans premiumPlan">
          <div className="recommendedDiv">
            <p>MOST POPULAR</p>
          </div>
          <div className="flexPricingDiv">
            <h1>
              <span className="bolderText">$6/</span>
            </h1>
            <p>month</p>
          </div>
          <div className="h1TextDiv">
            <h1> Premium Plan</h1>
          </div>
          <div className="imageDivsParent">
            <div className="plansImagesDiv">
              <div>
                <img src={plansImageWhite} alt="plansImage" />
              </div>

              <p>
                <span className="bolderText">Unlimited</span> Images
              </p>
            </div>
            <div className="plansImagesDiv">
              <div>
                <img src={plansVideoWhite} alt="plansImage" />
              </div>

              <p>
                <span className="bolderText">45</span> Minutes Video / Day
              </p>
            </div>
          </div>
          <div className="buttonDivPricingContainer">
            <button>CHOOSE PLAN</button>
          </div>
        </div>
        <div className="pricingPlans deluxePlan">
          <div className="flexPricingDiv">
            <h1>
              <span className="bolderText">$9.9/</span>
            </h1>
            <p>month</p>
          </div>
          <div className="h1TextDiv">
            <h1> Deluxe Plan</h1>
          </div>
          <div className="imageDivsParent">
            <div className="plansImagesDiv">
              <div>
                <img src={plansImage} alt="plansImage" />
              </div>
              <p>
                <span className="bolderText">unlimited</span> Images
              </p>
            </div>
            <div className="plansImagesDiv">
              <div>
                <img src={plansVideo} alt="plansImage" />
              </div>
              <p>
                <span className="bolderText">Unlimited</span> Videos
              </p>
            </div>
          </div>
          <div className="buttonDivPricingContainer">
            <button>CHOOSE PLAN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
