import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faUserCircle,
  faUserCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css"; // Pastikan untuk mengimpor file CSS Navbar

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="logo-link">
        <FontAwesomeIcon icon={faShoppingCart} className="logo-icon" />
      </Link>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About Us
          </Link>
        </li>
      </ul>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <Link to="/cart" className="nav-link">
        <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
        Cart
      </Link>
      <div className="nav-avatar" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faUserCircle} className="avatar-icon" />
        <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
          <Link to="/profile" className="dropdown-item">
            <FontAwesomeIcon icon={faUserCog} className="dropdown-icon" />
            Profile
          </Link>
          <Link to="/settings" className="dropdown-item">
            <FontAwesomeIcon icon={faUserCog} className="dropdown-icon" />
            Settings
          </Link>
          <Link to="/logout" className="dropdown-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
