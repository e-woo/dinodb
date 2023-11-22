import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "./rexlogo.png";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="container">
        <a href="/" style={{ textDecoration: "none" }} className="logo">
          <div className="logoimg">
            <img src={Logo} alt="DinoDB logo" />
          </div>
          <div className="logotext">DinoDB</div>
        </a>
        <nav className="links">
          <Link to={"./"} className="link">
            Home
          </Link>
          <Link to={"./search"} className="link">
            Explore
          </Link>
          <Link to={"./announcements"} className="link">
            Announcements
          </Link>
          {currentUser ?
          <Link to={"./profile"} className="link">
            Profile
          </Link> : null}
          {currentUser ? 
            <span className="signin">
              <Link onClick={logout} to={"/"} className="link" id="sign-in">
                Logout
              </Link>
            </span> 
            : 
            <span className="signin">
            <Link to={"./login"} className="link" id="sign-in">
              Sign in
            </Link>
          </span>}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
