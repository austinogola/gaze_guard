import React from "react";
import OurSpecialtySteps from "./ourSpecialtySteps";
import "./styles/newOurSpecialty.css";

function OurSpecialty() {
  return (
    <div className="OurSpecialtyParentDiv" id='specialty'>
      <div className="howItWorksTopDiv">
        <div className="howItWorksFloatingTitle title">
          <h4>Our Specialty</h4>
        </div>
        <div>
          <h4 className="title extensionTitle">
            Complete Solution for <br /> your{" "}
            <span className="extensionSpann">Extension</span>{" "}
          </h4>
          <p className="reg">
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
          title="High Top Quality"
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
