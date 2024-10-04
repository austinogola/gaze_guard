import React from "react";
import "./styles/HowItWorks.css"; // Add custom styles here
import Steps from "./newSteps";
import laptopImage from "./Images/lapi.png";
import bigLogoImage from "./Images/logo-bigger.png";

const HowItWorks = () => {
  return (
    <div>
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle title">
          <h4>How It Works</h4>
        </div>
        <div>
          <h4 className="title" style={{fontSize:'2rem'}}>
            Complete Solution for <br /> your{" "}
            <span style={{fontSize:'2rem'}} className="extensionSpan">Extension</span>{" "}
          </h4>
          <p className="reg">
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
