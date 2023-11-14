import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

// Footer component represents the page footer containing various sections.
const Footer = () => {
  return (
    <footer className="footer">
      <div className="containerF">
        <div className="row">
          <div className="footerCol">
            {/* Opportunities column */}
            <h4>Opportunities</h4>
            <ul>
              {/* Opportunities links */}
              <li>
                <Link to={"./clubs"} className="link">
                  Club
                </Link>
              </li>
              <li>
                <Link to={"./volunteer"} className="link">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to={"./programs"} className="link">
                  Programs
                </Link>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            {/* Announcements column */}
            <h4>Announcements</h4>
            <ul>
              {/* Announcements links */}
              <li>
                <Link to={"./news"} className="link">
                  News
                </Link>
              </li>
              <li>
                <Link to={"./events"} className="link">
                  Events
                </Link>
              </li>
              <li>
                <Link to={"./calendar"} className="link">
                  Calendar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Exporting Footer component for use in App.tsx
export default Footer;
