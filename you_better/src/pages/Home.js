import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import EventCardCarousel from "../components/EventCardCarousel"; // Import the EventCardCarousel component
import IconCarousel from "../components/IconCarousel"; // Import the Carousel component
import dodecahedronIcon from "../assets/DodecathlonLogoOutline.png";
import appHome from "../assets/AppHome.png";

import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup"); 
  };

  return (
    <div className="page-container">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Shrikhand&display=swap" rel="stylesheet"/>
      <IconCarousel />
      <div>
        <div className="welcome-body">
          <h1>A New Competition Has Begun!</h1>
          <p>Join our community of competitors and find your new favorite hobby today!</p>
          <button className="cta-button" onClick={handleSignUp}>
            Sign Up Now
          </button>
        </div>
        <div className="current-events-body">
          <h1 className="current-events-header">Current Events</h1>
          <p>See what our competitors are currently up to</p>
          <EventCardCarousel />
        </div>
        <div className="pink-block">
          <h2>Who we are</h2>
          <p>
            Welcome to the worlds first, all inclusive competition! We're here to get you motivated,
            active, and socializing with others. We believe that everyone deserves a chance to compete
            and have fun, regardless of their skill level or background.
          </p>
          <p>
            Our platform offers a wide range of events and challenges, from physical activities like running
            and cycling, to mental challenges like puzzles and trivia. Create your own challenges, or join one of 
            our existing events based on your interests! With something for everyone, you're sure to find an 
            event that suits your interests and abilities.
          </p>
          <button className="cta-button-outlined" onClick={handleSignUp}>
            Join now!
          </button>
        </div>
        <div className="mobile-app-body">
          <div className="mobile-app-image-container">
            <img 
              src={appHome} 
              alt="App Home" 
              className="mobile-app-image" 
            />
          </div>
          <div className="mobile-app-text">
            <h2>Check out our mobile app!</h2>
            <p>Comming soon to iOS and Android</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;