import React from "react";
import "./style.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="containerF">
        <div className="row">
          <div className="footerCol">
            <h4>Opportunities</h4>
            <ul>
              <li>
                <a href="#">Clubs</a>
              </li>
              <li>
                <a href="#">Volunteer</a>
              </li>
              <li>
                <a href="#">Programs</a>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>Announcements</h4>
            <ul>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Calendar</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
