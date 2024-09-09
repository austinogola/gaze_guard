import React from 'react';
import './styles/AboutSection.css'; 
import { Image,Box } from '@chakra-ui/react';
import darkExt from './Images/extDark.png'
import lightExt from './Images/extLight.png'

const AboutSection = () => {
  return (
    <div className="landing-section">
      <div className="left-side">
        <div className='image-holder'>
            <div>

            </div>
        </div>
        <h2>Images Here (3)</h2>
        <p>This is the left side content. Will have the images</p>
      </div>
      <div className="right-side">
        <h2>Another Section</h2>
        <p>This is the right side content. Put the paragraph here</p>
      </div>
    </div>
  );
};

export default AboutSection;
