import React from "react";
import stepIcon from "../images/puzzle.png";
import "./styles/steps.css";

function Steps() {
  return (
    <div className="stepParentDiv">
      <div className="stepFloating title">
        <p>step 1</p>
      </div>
      <div className="stepsBodyDiv">
        <div>
          <img src={stepIcon} alt="stepIcon" />
        </div>
        <div className="step_text_holder">
          <h3 className="title">Go to Chrome Extension</h3>
          <p className="reg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            porta ante non ante dignissim aliquam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
