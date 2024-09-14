import React from "react";
import logoShield from "./Images/group_logo.png";
import "./styles/ourSpecialtySteps.css";

function OurSpecialtySteps({ title, paragraph, number }) {
  return (
    <div className="ourSpecialtyStepsParentDiv">
      <div className="logoShieldContainer">
        <img src={logoShield} alt="" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{paragraph}</p>
        <div>
          <h1>{number}</h1>
        </div>
      </div>
    </div>
  );
}

export default OurSpecialtySteps;
