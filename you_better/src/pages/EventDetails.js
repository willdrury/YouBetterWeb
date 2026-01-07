import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/firebase"; 
import { useEvents } from "../providers/EventContext";
import { useChallenges } from "../providers/ChallengeContext";
import CreateChallengeModal from "../components/CreateChallengeModal";
import EventChallengeList from "../components/EventChallengeList";
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const { events, loading } = useEvents();
  const event = events.find((e) => e.id === eventId);
  const { challenges, loadingChallenges } = useChallenges();
  const eventChallenges = challenges.filter((c) => c.eventId === eventId);

  const storage = getStorage();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes
  const [editedEvent, setEditedEvent] = useState(event || {}); // Store the editable fields
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false); // State for the modal

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const storageRef = ref(storage, `challenge-images/${file.name}`); // Create a reference in Firebase Storage

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      console.log("Image uploaded successfully!");

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image URL:", downloadURL);

      // Update the editedChallenge state with the new image URL
      setEditedEvent({
        ...editedEvent,
        displayImageUrl: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleNewChallenge = () => {
    setIsChallengeModalOpen(true); // Open the modal
  };

  const handleCloseChallengeModal = (id) => {
    setIsChallengeModalOpen(false); // Close the modal
    console.log(id);
    if (id) {
      navigate(`/challenges/${id}`);
    }
  };

  const toggleIsEditing = () => {
    if (isEditing) {
      setEditedEvent(event); // Reset to original event details if cancelling edit
    }
    setIsEditing(!isEditing);
  }
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSave = async () => {
    try {
      const eventRef = doc(db, "events", eventId); 
      await updateDoc(eventRef, editedEvent); 
      console.log("Event updated successfully!");
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? " +
      "This will also delete all associated challenges."
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels the confirmation
    }

    try {
      for(var challenge of eventChallenges) {
        console.log(challenge);
        const challengeRef = doc(db, "challenges", challenge.id); 
        await deleteDoc(challengeRef, challenge); 
      }

      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef, editedEvent); 
      console.log("Event deleted successfully!");
      setIsEditing(false); 
      navigate(-1)
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="page-container">
      <main>
        <h1 className="page-header">
          <a onClick={() => navigate(-1)}>
              &larr;
          </a>
          &nbsp;
          {event.name}
        </h1>
        <div className="event-details-box">
          <h2 className="details-header"><strong>Details</strong></h2>&nbsp;
          <button className="edit-button" onClick={() => toggleIsEditing(true)}>{isEditing ? 'Cancel' : 'Edit'}</button>
          <div className="event-inner-details">
              <p><strong>Name:&nbsp;</strong> 
                {isEditing ? (
                  <textarea
                    name="name"
                    value={editedEvent.name}
                    onChange={handleInputChange}
                    rows={1}
                  />
                ) : (
                  event.name
                )}
              </p>
              <p><strong>Description:&nbsp;</strong> 
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editedEvent.description}
                    onChange={handleInputChange}
                    rows={1}
                  />
                ) : (
                  event.description
                )}
              </p>
              <p><strong>Has Multiple Difficulties:&nbsp;</strong>
                {isEditing ? (
                    <input
                      className="difficulty-picker"
                      name="hasMultipleDifficulties"
                      type="checkbox"
                      checked={editedEvent.hasMultipleDifficulties}
                      value={editedEvent.hasMultipleDifficulties ? "true" : "false"}
                      onChange={handleInputChange}
                    />
                  ) : (
                    event.hasMultipleDifficulties ? "Yes" : "No"
                  )} 
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <strong>Theme Color:&nbsp;</strong>
                <span className="theme-color-box">
                  {isEditing ? (
                    <input
                      className="color-picker"
                      name="themeColor"
                      type="color"
                      value={editedEvent.themeColor}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div
                      style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: event.themeColor,
                      border: "1px solid #ccc",
                      }}
                    ></div>
                  )}
                </span>
              </div>
              <p><strong>Icon:&nbsp;</strong>
                {isEditing ? (
                  <textarea
                    name="icon"
                    value={editedEvent.icon}
                    onChange={handleInputChange}
                    rows={1}
                  />
                ) : (
                  <span class="material-symbols-outlined">{event.icon}</span>
                )}
              </p>
              <p><strong>Start Date:&nbsp;</strong> 
                {isEditing ? (
                  <input
                    className="start-date-picker"
                    name="startDate"
                    type="date"
                    value={editedEvent.startDate}
                    onChange={handleInputChange}
                  />
                ) : (
                  new Date(event.startDate).toLocaleDateString()
                )}
              </p>
              <p><strong>End Date:&nbsp;</strong> 
                {isEditing ? (
                  <input
                    className="end-date-picker"
                    name="endDate"
                    type="date"
                    value={editedEvent.endDate}
                    onChange={handleInputChange}
                  />
                ) : (
                  new Date(event.endDate).toLocaleDateString()
                )}
              </p>
              <p><strong>Display Image:&nbsp;</strong>{" "}
                {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="displayImageUrl"
                    value={editedEvent.displayImageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload} // Handle file upload
                  />
                </div>
                ) : (
                  event.displayImageUrl 
                    ? <a href={event.displayImageUrl} target="_blank" rel="noopener noreferrer">
                      View Image
                      </a>
                    : "None"
                )}
              </p>
              <p><strong>Beginner Description:&nbsp;</strong> 
                {isEditing ? (
                  <textarea
                    name="beginnerDescription"
                    value={editedEvent.beginnerDescription}
                    onChange={handleInputChange}
                    rows={1}
                  />
                ) : (
                  event.beginnerDescription || "N/A"
                )}
              </p>
              <p><strong>Intermediate Description:&nbsp;</strong> 
                {isEditing ? (
                  <textarea
                    name="intermediateDescription"
                    value={editedEvent.intermediateDescription}
                    onChange={handleInputChange}
                    rows={1}
                  />
                ) : (
                  event.intermediateDescription || "N/A"
                )}
              </p>
              <p><strong>Advanced Description:&nbsp;</strong> 
                {isEditing ? (
                  <textarea
                    name="advancedDescription"
                    value={editedEvent.advancedDescription} 
                    onChange={handleInputChange}
                    rows={1}
                  />
                ) : (
                  event.advancedDescription || "N/A"
                )}
              </p>            
              <p><strong>Prizes:&nbsp;</strong> 
                {isEditing ? (
                  <textarea
                    name="prize"
                    value={editedEvent.prize}
                    onChange={handleInputChange}
                    rows={1}
                  />
                ) : (
                  event.prize || "N/A"
                )}
              </p>     
              <p><strong>Main Challenge:&nbsp;</strong> 
                {isEditing ? (
                  <select
                    name="mainChallengeId"
                    value={editedEvent.mainChallengeId || ""}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select a challenge</option>
                    {eventChallenges.map((challenge) => (
                      <option key={challenge.id} value={challenge.id}>
                        {challenge.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  eventChallenges.find(c => c.id === event.mainChallengeId)?.name || "N/A"
                )}
              </p>       
              <p><strong>Created By:&nbsp;</strong> {event.createdBy}</p>
          </div>
          <div className={`save-button-container ${isEditing ? "show" : ""}`}>
              {isEditing && <button className="save-button" onClick={handleSave}>Save</button>}
              {isEditing && <button className="delete-button" onClick={handleDelete}>Delete</button>}
              {isEditing && <button className="cancel-button" onClick={toggleIsEditing}>Cancel</button>}
          </div>
        </div>
        <div className="event-details-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2><strong>Challenges</strong></h2>
            <button className="save-button" onClick={handleNewChallenge}>New Challenge</button>
            <CreateChallengeModal
              isOpen={isChallengeModalOpen}
              onClose={handleCloseChallengeModal}
              event={event}
            />
          </div>
          <div className="challenge-details">
              <EventChallengeList eventId={eventId}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;