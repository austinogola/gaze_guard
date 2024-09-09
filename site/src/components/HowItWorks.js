import React from 'react';
import './styles/HowItWorks.css'; // Add custom styles here

const HowItWorks = () => {
  return (
    <div className="how-it-works-section">
      <div className="steps-container">
        <div className="step-card">
          <h3>Step 1</h3>
          <p>Download the extension from the Chrome Web Store.</p>
        </div>
        <div className="step-card">
          <h3>Step 2</h3>
          <p>Pin the extension to your browser toolbar.</p>
        </div>
        <div className="step-card">
          <h3>Step 3</h3>
          <p>Click on the extension icon to open the settings panel.</p>
        </div>
        <div className="step-card">
          <h3>Step 4</h3>
          <p>Enjoy filtering content based on your preferences!</p>
        </div>
      </div>
      <div className="image-container">
        <img src="your-image-url-here" alt="How the extension works" />
      </div>
    </div>
  );
};

export default HowItWorks;
