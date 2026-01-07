import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    heardAboutUs: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!formData.name || !formData.email || !formData.heardAboutUs) {
      setError("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Add your API call here to submit the form data
      // Example:
      // await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      console.log("Form submitted:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to home or success page
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <main className="signup-container">
        <div className="signup-box">
          <h1>Join the Competition!</h1>
          <p className="signup-subtitle">
            Sign up now to compete with our community of others
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="heardAboutUs">How did you hear about us? *</label>
              <select
                id="heardAboutUs"
                name="heardAboutUs"
                value={formData.heardAboutUs}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="social-media">Social Media</option>
                <option value="friend">Friend or Family</option>
                <option value="search-engine">Search Engine</option>
                <option value="advertisement">Advertisement</option>
                <option value="news-article">News Article</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Log in</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;