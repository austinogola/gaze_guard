import React from 'react';
import './styles/AboutSection.css'; 
import { Image,Box } from '@chakra-ui/react';
import darkExt from './Images/extDark.png'
import lightExt from './Images/extLight.png'

import logoBig from './Images/logo-bigger.png'

const AboutSection = () => {
  return (
    <div className="landing-section">
      <div className="left-side">
        <div className='images-holder'>
            <div className='dark-holder'>
              <Image src={darkExt} />
            </div>
            <div className='light-holder'>
              <Image src={lightExt} />
            </div>
            <div className='logo-holder'>
              <Image src={logoBig} w='12rem'/>
            </div>
        </div>
      </div>
      <div className="right-side">
        <h2>High Quality Chrome <span>Extension</span></h2>
        <p>Gaze Guard is a Google Chrome extension that helps users comply with the Islamic practice of lowering their gaze by blurring out images and videos of men and women on websites. 
        
        </p>
        <p>
        By automatically obscuring these visual elements , Gaze Guard allows users to browse the internet while maintaining adherence to their religious values. Easy to install and use, Gaze Guard ensures that your online activities remain respectful and aligned with your beliefs
        </p>


      </div>
    </div>
  );
};

export default AboutSection;
