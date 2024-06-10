import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faUserCircle,
  faUserCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const Navbar = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryDropdownRef = useRef(null);
  const avatarDropdownRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout");
      console.log("Logout response:", response.data);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const toggleAvatarDropdown = () => {
    setShowAvatarDropdown(!showAvatarDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(event.target)
      ) {
        setShowAvatarDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <li
          className="nav-item dropdown"
          ref={categoryDropdownRef}
          onMouseEnter={toggleCategoryDropdown}
          onMouseLeave={() => setShowCategoryDropdown(false)}
        >
          <div className="dropdown-toggle">
            Categories
            <div
              className={`dropdown-content ${
                showCategoryDropdown ? "show" : "hide"
              }`}
            >
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products/${category.slug}`}
                    className={
                      selectedCategory === category.name
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div>Loading categories...</div>
              )}
            </div>
          </div>
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
      <div
        className="nav-avatar"
        ref={avatarDropdownRef}
        onMouseEnter={toggleAvatarDropdown}
        onMouseLeave={() => setShowAvatarDropdown(false)}
      >
        <FontAwesomeIcon icon={faUserCircle} className="avatar-icon" />
        <div
          className={`dropdown-content ${showAvatarDropdown ? "show" : "hide"}`}
        >
          <Link to="/profile" className="dropdown-item">
            <FontAwesomeIcon icon={faUserCog} className="dropdown-icon" />
            Profile
          </Link>
          <Link to="/settings" className="dropdown-item">
            <FontAwesomeIcon icon={faUserCog} className="dropdown-icon" />
            Settings
          </Link>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" />
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
