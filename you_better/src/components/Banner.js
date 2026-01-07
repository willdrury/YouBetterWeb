import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Banner.css"; 
import dodecahedronIcon from "../assets/DodecathlonLogoOutline.png";

const Banner = () => {
  const auth = getAuth();

  const [user, setUser] = useState(null); // State to track the current user

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when auth state changes
      if (currentUser) {
        console.log("User logged in:", currentUser);
      } else {
        console.log("User logged out");
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  const handleAuthAction = () => {
    if (auth.currentUser) {
      signOut(auth)
        .then(() => {
          console.log("User logged out successfully");
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    } else {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("User logged in successfully:", result.user);
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    }
  };

  return (
    <div className="banner">
      <div className="banner-left">
        <div className="banner-icon">
          <img src={dodecahedronIcon} alt="Dodecahedron Icon" className="dodecahedron-icon" />
        </div>
        <div className="banner-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Events
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
        </div>
      </div>
      <div className="banner-logout">
        <button onClick={handleAuthAction} className="logout-button">
          {auth.currentUser ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Banner;