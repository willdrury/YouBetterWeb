import React from "react";
import Footer from "../components/Footer";
import "./PrivacyPage.css";

const PrivacyPage = () => {
  return (
    <div className="page-container">
      <main>
        <div className="centered-header">
          <h1>Privacy Policy</h1>
        </div>
        <p className="body-text">We care about your privacy.</p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;