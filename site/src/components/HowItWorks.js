import React from "react";
import "./styles/HowItWorks.css"; // Add custom styles here
import Steps from "./newSteps";
import laptopImage from "./Images/lapi.png";
import bigLogoImage from "./Images/logo-bigger.png";

const HowItWorks = () => {
  return (
    <div>
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle">
          <h2>How It Works</h2>
        </div>
        <div>
          <h2>
            Complete Solution for <br /> your{" "}
            <span className="extensionSpan">Extension</span>{" "}
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            porta ante non ante dignissim aliquam. Pellentesque nunc leo,
            pretium a lorem vel, ornare mollis leo.
          </p>
        </div>
      </div>
      <div className="how-it-works-section">
        <div className="steps-container">
          <Steps />
          <Steps />
          <Steps />
          <Steps />
        </div>
        <div className="image-container">
          <img src={laptopImage} alt="How the extension works" />
        </div>
        <div className="bigLogoImage">
          <img src={bigLogoImage} alt="bigLogoImage" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
