// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src="/logoSMR.png" alt="SellMyRig Logo" className="navbar-logo" />
        <div className="navbar-links">
          <Link to="/DealSubmission">Deal Submission</Link>
          <>|</>
          <Link to="/seller">Seller Forms</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
