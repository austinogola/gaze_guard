import React from 'react';
import './styles/HowItWorks.css'; // Add custom styles here
import logoImage from './Images/logo-bigger.png'
import lapiImage from './Images/lapi.png'

const HowItWorks = () => {
  return (
    <div className="how-it-works-section">
      <div className="steps-container">
        <div className="step-card">
          <h3>Step 1</h3>
          <p>Download the extension from the Chrome Web Store.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ante non ante dignissim aliquam. Pellentesque nunc leo, pretium a lorem vel, ornare mollis leo.</p>
        </div>
        <div className="step-card">
          <h3>Step 2</h3>
          <p>Pin the extension to your browser toolbar.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ante non ante dignissim aliquam. Pellentesque nunc leo, pretium a lorem vel, ornare mollis leo.</p>
        </div>
        <div className="step-card">
          <h3>Step 3</h3>
          <p>Click on the extension icon to open the settings panel.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ante non ante dignissim aliquam. Pellentesque nunc leo, pretium a lorem vel, ornare mollis leo.</p>
        </div>
        <div className="step-card">
          <h3>Step 4</h3>
          <p>Enjoy filtering content based on your preferences!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ante non ante dignissim aliquam. Pellentesque nunc leo, pretium a lorem vel, ornare mollis leo.</p>
          
        </div>
      </div>
      <div className="image-container">
        <img src={lapiImage} alt="How the extension works" />
      </div>
    </div>
  );
};

export default HowItWorks;
