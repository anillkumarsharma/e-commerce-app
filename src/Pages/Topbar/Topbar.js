import React from "react";
import { NavLink } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <h1 className="store-logo">My Store</h1>
      <nav>
        <NavLink to="/" className="nav-link" activeclassname="active-link">
          Home
        </NavLink>
        <NavLink to="/cart" className="nav-link" activeclassname="active-link">
          Cart
        </NavLink>
      </nav>
    </div>
  );
};

export default TopBar;
