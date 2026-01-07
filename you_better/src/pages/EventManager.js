import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "../components/CreateEventModal";
import EventTable from "../components/EventTable"; 
import "./EventManager.css";

const EventManager = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const onClose = (id) => {
    setIsModalOpen(false);
    if (id) {
      navigate(`/events/${id}`);
    }
  }

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (!user) {
    return (
      <main>
        <div className="page-header">
          <h1>Please log in to view events</h1>
          <button onClick={handleLogin}>Log in with Google</button>
        </div>
      </main>
    );
  }

  return (
    <div>
      <main>
        <div className="page-header">
          <h1>Manage Events</h1>
        </div>
        <div className="event-table-box">
          <EventTable />
        </div>
        <div className="create-event-button">
          <button onClick={() => setIsModalOpen(true)}>Create New Event</button>
        </div>
        <CreateEventModal
          isOpen={isModalOpen}
          onClose={onClose}
        />
      </main>
    </div>
  );
};

export default EventManager;