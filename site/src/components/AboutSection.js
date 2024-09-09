import React from "react";
import "./styles/AboutSection.css";
import logoBigger from "./Images/logo-bigger.png";
import lightImg from "./Images/extLight.png";
import darkImg from "./Images/extDark.png";

const AboutSection = () => {
  return (
    <div className="landing-section">
      <div className="left-side">
        <div className="image-holder">
          <div className="logoBiggerDiv">
            <img src={logoBigger} alt="" />
          </div>
          <div className="darkImgDiv">
            <img src={darkImg} alt="" />
          </div>
          <div className="lightImgDiv">
            <img src={lightImg} alt="" />
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="aboutSectionFloatingTitle">
          <h2>About Us</h2>
        </div>
        <div>
          <h2>
            High Quality <br /> Chrome{" "}
            <span className="extensionSpan"> Extension</span>
          </h2>
          <div className="paragraphDiv">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum porta ante non ante dignissim aliquam. Pellentesque
              nunc leo, pretium a lorem vel, ornare mollis leo.
            </p>
            <p>
              Nulla facilisi. Donec laoreet velit at dui interdum, et rhoncus
              leo vehicula. Nam rutrum diam eu pellentesque ornare. Maecenas
              laoreet turpis pharetra imperdiet conseqdddduat. In finibus mauris
              sed vestibulum sodales. Donec luctus, ipsum ut bibendum dictum,
              turpis tortor molestie diam, consequat auctor sem nisi id eros
            </p>
          </div>
        </div>
        <button className="learnMoreButton">Learn More</button>
      </div>
    </div>
  );
};

export default AboutSection;
