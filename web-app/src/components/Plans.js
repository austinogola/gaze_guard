import React from 'react';
import SideMenu from './SideMenu'; // Import the SideMenu component
import './styles/Home.css';

function PlansPage() {
  return (
    <div className="home-page">
      <SideMenu activeLink='plans'/>
      <div className="content">
        <h1>Plans Page</h1>
        <p>View your plan and payments</p>
      </div>
    </div>
  );
}

export default PlansPage;
