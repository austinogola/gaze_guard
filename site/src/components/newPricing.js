import React, { useEffect, useState } from "react";
import "./styles/newPricing.css";
import plansImage from "./Images/icons8-image-50-black.png";
import plansVideo from "./Images/icons8-video-50-black.png";
import plansImageWhite from "./Images/icons8-image-50-white.png";
import plansVideoWhite from "./Images/icons8-video-50-white.png";

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => setImageSrc(src);
    img.onerror = () => setError(true); // Handle error

    return () => {
      setImageSrc(null); // Clean up on unmount
      setError(false);
    };
  }, [src]);

  return error ? (
    <div
      className={`error-placeholder ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <p>Error loading image</p>
    </div>
  ) : imageSrc ? (
    <img src={imageSrc} alt={alt} className={className} loading="lazy" />
  ) : (
    <div
      className={`image-placeholder ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

function Pricing() {
  return (
    <div className="PricingParentContainer title">
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle title">
          <h2>Pricing</h2>
        </div>
        {/* <div>
          <h2>
            Our Expert Tells Via <br />
            <span className="extensionSpan">Tutorial</span>{" "}
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            porta ante non ante dignissim aliquam. Pellentesque nunc leo,
            pretium a lorem vel, ornare mollis leo.
          </p>
        </div> */}
      </div>
      <div className="plansParentDiv">
        <div className="pricingPlans freePlan">
          <div className="recommendedDiv">
            <p>RECOMMENDED</p>
          </div>
          <div>
            <h1>Free Plan</h1>
          </div>
          <div className="imageDivsParent">
            <div className="plansImagesDiv">
              <div>
                <LazyImage src={plansImage} alt="plansImage" />
              </div>
              <p>
                <span className="bolderText">60</span> Minutes / Day
              </p>
            </div>
            <div className="plansImagesDiv">
              <div>
                <LazyImage src={plansVideo} alt="plansVideo" />
              </div>
              <p>
                <span className="bolderText">5</span> Minutes Video / Day
              </p>
            </div>
          </div>
          <div className="buttonDivPricingContainer">
            <a
              href="https://app.gazeguard.io/plans"
              target="_blank"
              rel="noreferrer"
            >
              <button>CHOOSE PLAN</button>
            </a>
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
                <LazyImage src={plansImageWhite} alt="plansImageWhite" />
              </div>
              <p>
                <span className="bolderText">Unlimited</span> Images
              </p>
            </div>
            <div className="plansImagesDiv">
              <div>
                <LazyImage src={plansVideoWhite} alt="plansVideoWhite" />
              </div>
              <p>
                <span className="bolderText">45</span> Minutes Video / Day
              </p>
            </div>
          </div>
          <div className="buttonDivPricingContainer">
            <a
              href="https://app.gazeguard.io/plans"
              target="_blank"
              rel="noreferrer"
            >
              <button>CHOOSE PLAN</button>
            </a>
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
                <LazyImage src={plansImage} alt="plansImage" />
              </div>
              <p>
                <span className="bolderText">unlimited</span> Images
              </p>
            </div>
            <div className="plansImagesDiv">
              <div>
                <LazyImage src={plansVideo} alt="plansVideo" />
              </div>
              <p>
                <span className="bolderText">Unlimited</span> Videos
              </p>
            </div>
          </div>
          <div className="buttonDivPricingContainer">
            <a
              href="https://app.gazeguard.io/plan"
              target="_blank"
              rel="noreferrer"
            >
              <button>CHOOSE PLAN</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
