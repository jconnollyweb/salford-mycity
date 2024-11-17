import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../images/My-City-Salford.png';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search-results?query=${searchQuery}`);
  };

  useEffect(() => {
    if (userToken) {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://salford-mycity.local/wp-json/wp/v2/users/me", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userToken]); 

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserData(null); 
    navigate("/"); 
  };

  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="logo">
          <img src={logo} alt="My City Salford Logo" className="logo-image" />
        </div>
        
        {userData ? (
          <div className="username">
            <p>Welcome, {userData.name}!</p> 
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="sign-but">
              <Link to="/log-in" className="login-btn">Login</Link>
            </button>
            <button className="sign-but">
              <Link to="/sign-up" className="signup-btn">Sign up</Link>
            </button>
          </div>
        )}

        {userData && (
          <div className="account-link">
            <button className="account-btn">
              <Link to="/account" className="account-link">My Account</Link>
            </button>
          </div>
        )}
         {userData && (
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        )}
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
