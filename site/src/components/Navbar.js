// src/Navbar.js
import React, { useState } from 'react';
import './styles/Navbar.css'
import Logo from './Logo'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Logo bottom='20px'/>
      </div>
      <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href='#ShowCase'>Explore</a></li>
        <li><a href="#accounts">My Account</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#install">
            <button id='installBtn'>Install</button>
        </a></li>
      </ul>
    </nav>
  );
};

export default Navbar;