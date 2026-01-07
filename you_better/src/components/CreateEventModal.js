import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./CreateEventModal.css"; // Ensure the modal styles are applied

const CreateEventModal = ({
  isOpen,
  onClose,
}) => {
    const [newEventName, setNewEventName] = useState("");
    const [newEventDescription, setNewEventDescription] = useState("");
    const [newEventThemeColor, setNewEventThemeColor] = useState("#000000");
    const [newEventStartDate, setNewEventStartDate] = useState("");
    const [newEventEndDate, setNewEventEndDate] = useState("");

    const handleCreateEvent = async () => {
        if (!newEventName.trim() || !newEventDescription.trim() || !newEventStartDate || !newEventEndDate) {
          alert("Please fill out all required fields.");
          return;
        }
    
        try {
          const eventsCollection = collection(db, "events");
          var doc = await addDoc(eventsCollection, {
            name: newEventName,
            description: newEventDescription,
            hasMultipleDifficulties: false,
            themeColor: newEventThemeColor,
            icon: "",
            startDate: newEventStartDate,
            endDate: newEventEndDate,
            displayImageUrl: "",
            beginnerDescription: "",
            intermediateDescription: "",
            advancedDescription: "",
            prize: "",
            mainChallengeId: "",
          });
    
          clearInput();
          onClose(doc.id);
        } catch (error) {
          console.error("Error creating event:", error);
        }
    };

    const clearInput = () => {
      setNewEventName("");
      setNewEventDescription("");
      setNewEventThemeColor("#000000");
      setNewEventStartDate("");
      setNewEventEndDate("");
    }

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create a New Event</h2>
            <button className="close-button" onClick={(()=> onClose(null))}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission behavior
                handleCreateEvent(); // Call the event creation handler
              }}
            >
              <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input
                  id="eventName"
                  type="text"
                  placeholder="Event Name"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDescription">Event Description</label>
                <input
                  id="eventDescription"
                  height={100}
                  type="text"
                  placeholder="Event Description"
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={newEventStartDate}
                  onChange={(e) => setNewEventStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  value={newEventEndDate}
                  onChange={(e) => setNewEventEndDate(e.target.value)}
                />
              </div>
              <div className="form-footer">
                <button type="submit">Submit</button>
                <button type="button" onClick={(()=> onClose(null))}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default CreateEventModal;