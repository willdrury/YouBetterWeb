import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import dodecahedronIcon from "../assets/DodecathlonLogoOutline.png"; // Import the PNG file
import "./Footer.css";
import { FaX, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Logo and Name */}
        <div className="footer-logo">
          <img src={dodecahedronIcon} alt="Company Logo" className="logo" />
          <span className="company-name">YouBetter.LLC</span>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
        </div>

        {/* Page Links */}
        <div className="footer-links">
          <Link to="/about" className="footer-link">About Us</Link>
          &nbsp;|&nbsp;
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;