import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../images/My-City-Salford.png';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search-results?query=${searchQuery}`);
  };

  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="logo">
          <img src={logo} alt="My City Salford Logo" className="logo-image" />
        </div>

        <div className="auth-buttons">
          <button> <Link to="/log-in" className="login-btn">Login</Link></button>
          <button> <Link to="/sign-up" className="signup-btn">Sign up</Link></button>
        </div>
      </div>

      <nav className="nav-bar">
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/whats-on" className="nav-link">What's On</Link></li>
          <li><Link to="/contact-us" className="nav-link">Contact Us</Link></li>
          <li><Link to="/help" className="nav-link">Help</Link></li>
          <li className="dropdown" style={{ width: '200px' }}>
            <span className="nav-link">Directory</span>
            <ul className="dropdown-menu">
              <li><Link to="/services-and-groups" className="dropdown-link">Services and Groups</Link></li>
              <li><Link to="/childcare" className="dropdown-link">Childcare</Link></li>
              <li><Link to="/local-offer" className="dropdown-link">Local Offer</Link></li>
              <li><Link to="/adult-care" className="dropdown-link">Adult Care and Support</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Search Bar Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        <button onClick={handleSearchSubmit} className="search-btn">Search</button>
      </div>
    </header>
  );
};

export default Header;
