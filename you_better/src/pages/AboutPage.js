import React from "react";
import Footer from "../components/Footer";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="page-container">
      <main>
        <div className="about-us-section">
          <div className="centered-header">
            <h1>About Us</h1>
          </div>
          <p className="body-text">Our mission and values.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;