import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './pages/Layout';
import Home from "./pages/Home";
import EventManager from './pages/EventManager';
import EventDetails from './pages/EventDetails';
import AboutPage from './pages/AboutPage';
import Signup from './pages/Signup';
import { EventProvider } from "./providers/EventContext";
import { ChallengeProvider } from "./providers/ChallengeContext";
import ChallengeDetails from './pages/ChallengeDetails';
import PrivacyPage from './pages/PrivacyPage';
import './App.css';

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, [pathname]); // Trigger when the route changes
  
    return null; // This component does not render anything
  };

  return (
    <ChallengeProvider>
      <EventProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="events" element={<EventManager />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="events/:eventId" element={<EventDetails />} />
              <Route path="challenges/:challengeId" element={<ChallengeDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </ChallengeProvider>
  );
}

export default App;