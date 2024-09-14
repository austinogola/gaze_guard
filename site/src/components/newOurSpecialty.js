import React from "react";
import OurSpecialtySteps from "./ourSpecialtySteps";
import "./styles/newOurSpecialty.css";

function OurSpecialty() {
  return (
    <div className="OurSpecialtyParentDiv">
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle">
          <h2>Our Specialty</h2>
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
      <div className="ourSpecialtyStepsContainer">
        <OurSpecialtySteps
          title="Huge Collection"
          paragraph="Nulla facilisi. Donec laoreet
velit at dui interdum"
          number="01"
        />
        <OurSpecialtySteps
          title="High Quality"
          paragraph="Nulla facilisi. Donec laoreet
velit at dui interdum"
          number="02"
        />
        <OurSpecialtySteps
          title="Top Resource"
          paragraph="Nulla facilisi. Donec laoreet
velit at dui interdum"
          number="03"
        />
        <OurSpecialtySteps
          title="Big Community"
          paragraph="Nulla facilisi. Donec laoreet
velit at dui interdum"
          number="04"
        />
      </div>
    </div>
  );
}

export default OurSpecialty;
