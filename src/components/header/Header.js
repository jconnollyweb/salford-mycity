import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 
import logo from '../images/My-City-Salford.png';


const Header = () => {
  return (
    <header className="header-container">
     
      <div className="top-bar">
      <div className="logo">
        <img src={logo} alt="My City Salford Logo" className="logo-image" />
      </div>

        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>

     
      <nav className="nav-bar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/whats-on" className="nav-link">What's On</Link>
          </li>
          <li>
            <Link to="/contact-us" className="nav-link">Contact Us</Link>
          </li>
          <li>
            <Link to="/help" className="nav-link">Help</Link>
          </li>
          <li className="dropdown" style={{ width: '200px' }}>
            <span className="nav-link">Directory</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/services-and-groups" className="dropdown-link">
                  Services and Groups
                </Link>
              </li>
              <li>
                <Link to="/childcare" className="dropdown-link">Childcare</Link>
              </li>
              <li>
                <Link to="/local-offer" className="dropdown-link">Local Offer</Link>
              </li>
              <li>
                <Link to="/adult-care" className="dropdown-link">
                  Adult Care and Support
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
