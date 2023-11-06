import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "./rexlogo.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <div className="logoimg">
            {" "}
            <img src={Logo} alt="DinoDB logo" />
          </div>
          <div className="logotext"> DinoDB</div>
        </div>
        <nav className="links">
          <Link to={""} className="link">
            Home
          </Link>
          <Link to={""} className="link">
            Explore
          </Link>
          <Link to={""} className="link">
            Programs
          </Link>
          <Link to={""} className="link">
            Clubs
          </Link>
          <Link to={""} className="link">
            Volunteer
          </Link>
          <span>
            <Link to={"./login"} className="link" id="sign-in">
              Sign in
            </Link>
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
