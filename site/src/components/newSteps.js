import React from "react";
import stepIcon from "./Images/icons8-puzzle-80.png";
import "./styles/steps.css";

function Steps() {
  return (
    <div className="stepParentDiv">
      <div className="stepFloating">
        <p>step 1</p>
      </div>
      <div className="stepsBodyDiv">
        <div>
          <img src={stepIcon} alt="stepIcon" />
        </div>
        <div>
          <h3>Go to Chrome Extension</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            porta ante non ante dignissim aliquam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
