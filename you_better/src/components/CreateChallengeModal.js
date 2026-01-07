import React, { useState } from "react";
import { collection, addDoc, endAt } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DifficultyEnum } from "../constants/enums";
import "./CreateChallengeModal.css"; // Ensure the modal styles are applied

const CreateChallengeModal = ({
  isOpen,
  onClose,
  event
}) => {
    const [newChallengeName, setNewChallengeName] = useState("");
    const [newChallengeDescription, setNewChallengeDescription] = useState("");
    const [newChallengeDifficulty, setNewChallengeDifficulty] = useState("");
    const [newChallengeMaxPoints, setNewChallengeMaxPoints] = useState(0);
    const difficultyOptions = Object.values(DifficultyEnum);

    const handleCreateEvent = async () => {
        if (!newChallengeName.trim() || !newChallengeDescription.trim()) {
          alert("Please fill out all required fields.");
          return;
        }
    
        try {
          const challengesCollection = collection(db, "challenges");
          var doc = await addDoc(challengesCollection, {
            name: newChallengeName,
            description: newChallengeDescription,
            difficulty: newChallengeDifficulty,
            maxPoints: newChallengeMaxPoints,
            eventId: event.id,
            prerequisiteChallenges: [],
            conflictingChallenges: [],
            startDate: event.startDate,
            endDate: event.endDate,
            enforcement: null,
            scoringMechanism: null,
            submissionScreen: null,
            isBonus: false,
            isRecurring: false,
            isEditable: false,
          });
    
          console.log("Challenge created with ID:", doc.id);
          clearInput();
          onClose(doc.id);
        } catch (error) {
          console.error("Error creating challenge:", error);
        }
    };

    const clearInput = () => {
      setNewChallengeName("");
      setNewChallengeDescription("");
      setNewChallengeDifficulty("");
      setNewChallengeMaxPoints(0);
    }

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create a New Event</h2>
            <button className="close-button" onClick={()=>onClose(null)}>
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
                <label htmlFor="challengeName">Challenge Name</label>
                <input
                  id="challengeName"
                  type="text"
                  placeholder="Challenge Name"
                  value={newChallengeName}
                  onChange={(e) => setNewChallengeName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="challengeDescription">Description</label>
                <input
                  id="challengeDescription"
                  type="text"
                  placeholder="Challenge Description"
                  value={newChallengeDescription}
                  onChange={(e) => setNewChallengeDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="challengeDifficulty">Difficulty</label>
                <select
                  name="challengeDifficulty"
                  value={newChallengeDifficulty}
                  onChange={(e) => setNewChallengeDifficulty(e.target.value)}
                  >
                  {difficultyOptions.map((option) => (
                      <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize */}
                      </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="maxPoints">Max Points</label>
                <input
                  id="maxPoints"
                  name="maxPoints"
                  type="number"
                  value={newChallengeMaxPoints}
                  onChange={(e) => setNewChallengeMaxPoints(parseInt(e.target.value, 10))} // Ensure integer value
                  min="0"
                  max="100"
                  placeholder="0"
                />
              </div>
              <div className="form-footer">
                <button type="submit">Submit</button>
                <button type="button" onClick={()=>onClose(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default CreateChallengeModal;