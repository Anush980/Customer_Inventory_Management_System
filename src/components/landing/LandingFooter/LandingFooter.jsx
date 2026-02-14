import React from "react";
import "./landingFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";

const LandingFooter = () => {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>ORMS</h3>
          <p>Manage Smarter, Not Harder!</p>

          <div className="social-links">
            <a href="https://facebook.com/anush232" className=" facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>

            <a href="https://github.com/anush980" className=" github">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://react-portfolio-jade-tau.vercel.app"
              className=" website"
            >
              <FontAwesomeIcon icon={faGlobeAsia} />
            </a>
            <a href="https://instagram.com/_anush232" className=" instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Open Source Project</h3>
          <ul>
            <li>
              <a href="https://github.com/Anush980/Customer_Inventory_Management_System">
                Frontend Repo
              </a>
            </li>
            <li>
              <a href="https://github.com/Anush980/CIMS_Backend">
                Backend Repo
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p> Online retail management system. An Open source project</p>
      </div>
    </footer>
  );
};

export default LandingFooter;
