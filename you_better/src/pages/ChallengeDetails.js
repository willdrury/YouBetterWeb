import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/firebase"; 
import { useChallenges } from "../providers/ChallengeContext";
import { DifficultyEnum, ScoringEnum, EnforcementEnum, SubmissionScreenEnum } from "../constants/enums";
import "./ChallengeDetails.css";

const ChallengeDetails = () => {
  const { challengeId } = useParams();
  const { challenges, loading } = useChallenges();
  const challenge = challenges.find((e) => e.id === challengeId);
  const eventChallenges = challenges.filter((c) => c.eventId === challenge.eventId && c.id !== challengeId);

  const navigate = useNavigate(); 
  const storage = getStorage();

  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes
  const [editedChallenge, setEditedChallenge] = useState(challenge || {}); // Store the editable fields

  const difficultyOptions = Object.values(DifficultyEnum);
  const scoringOptions = Object.values(ScoringEnum);
  const enforcementOptions = Object.values(EnforcementEnum);
  const submissionScreenOptions = Object.values(SubmissionScreenEnum);

  if (loading) {
    return <p>Loading challenge details...</p>;
  }

  if (challenge === undefined) {
    return <p>Challenge not found.</p>;
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
      setEditedChallenge({
        ...editedChallenge,
        displayImageUrl: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const toggleIsEditing = () => {
    if (isEditing) {
        setEditedChallenge(challenge); // Reset to original event details if cancelling edit
    }
    setIsEditing(!isEditing);
  }
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedChallenge({ ...editedChallenge, [name]: value });
  };

  const handleSave = async () => {
    try {
      const challengeRef = doc(db, "challenges", challengeId); 
      await updateDoc(challengeRef, editedChallenge); 
      console.log("Challenge updated successfully!");
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating challenge:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this challenge?");
    if (!confirmDelete) {
      return;
    }

    try {
      const challengeRef = doc(db, "challenges", challengeId);
      await deleteDoc(challengeRef, editedChallenge); 
      console.log("Challenge deleted successfully!");
      setIsEditing(false); 
      navigate(-1)
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  return (
    <div className="page-details">
        <main>
        <h1 className="page-header">
          <a onClick={() => navigate(-1)}>
            &larr;
          </a>
          &nbsp;
          {challenge.name}
        </h1>
        <div className="challenge-details-box">
          <h2 className="details-header"><strong>Details</strong></h2>&nbsp;
          <button className="edit-button" onClick={() => toggleIsEditing(true)}>{isEditing ? 'Cancel' : 'Edit'}</button>
          <div className="challenge-inner-details">
            <p><strong>Name:&nbsp;</strong> 
              {isEditing ? (
                <textarea
                  name="name"
                  value={editedChallenge.name}
                  onChange={handleInputChange}
                  rows={1}
                />
              ) : (
                challenge.name
              )}
            </p>
            <p><strong>Description:&nbsp;</strong> 
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedChallenge.description}
                  onChange={handleInputChange}
                  rows={1}
                />
              ) : (
                challenge.description
              )}
            </p>
            <p><strong>Difficulty:&nbsp;</strong>
              {isEditing ? (
                <select
                  name="difficulty"
                  value={editedChallenge.difficulty}
                  onChange={handleInputChange}
                >
                {difficultyOptions.map((option) => (
                  <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize */}
                  </option>
                ))}
                </select>
              ) : (
                challenge.difficulty
                  ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)
                  : "NA"
              )}
            </p>
            <p><strong>Scoring Mechanism:&nbsp;</strong>
              {isEditing ? (
                <select
                  name="scoringMechanism"
                  value={editedChallenge.scoringMechanism}
                  onChange={handleInputChange}
                >
                {scoringOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize */}
                  </option>
                ))}
                </select>
              ) : (
                challenge.scoringMechanism
                  ? challenge.scoringMechanism.charAt(0).toUpperCase() + challenge.scoringMechanism.slice(1)
                  : "NA"
              )}
            </p>
            <p><strong>Enforcement:&nbsp;</strong>
              {isEditing ? (
                <select
                  name="enforcement"
                  value={editedChallenge.enforcement}
                  onChange={handleInputChange}
                >
                {enforcementOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize */}
                  </option>
                ))}
                </select>
              ) : (
                challenge.enforcement
                  ? challenge.enforcement.charAt(0).toUpperCase() + challenge.enforcement.slice(1)
                  : "NA"
              )}
            </p>
            <p><strong>Submission Screen:&nbsp;</strong>
              {isEditing ? (
                <select
                  name="submissonScreen"
                  value={editedChallenge.submissonScreen}
                  onChange={handleInputChange}
                >
                {submissionScreenOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize */}
                  </option>
                ))}
                </select>
              ) : (
                challenge.submissonScreen
                  ? challenge.submissonScreen.charAt(0).toUpperCase() + challenge.submissonScreen.slice(1)
                  : "NA"
              )}
            </p>
            <p><strong>Display Image:&nbsp;</strong>{" "}
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="displayImageUrl"
                    value={editedChallenge.displayImageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                challenge.displayImageUrl 
                  ? <a href={challenge.displayImageUrl} target="_blank" rel="noopener noreferrer">
                    View Image
                    </a>
                  : "None"
              )}
            </p>
            <p><strong>Max Points:&nbsp;</strong>
              {isEditing ? (
                <input
                  name="maxPoints"
                  type="number"
                  value={editedChallenge.maxPoints}
                  min="0"
                  max="100"
                  maxLength={2}
                  placeholder="Max points"  
                  onChange={(e) =>
                    setEditedChallenge({
                      ...editedChallenge,
                      maxPoints: parseInt(e.target.value, 10),
                    })
                  }
                >
                </input>
              ) : (
                challenge.maxPoints ? challenge.maxPoints : "NA"
              )}
            </p>
            <p><strong>Is Recurring:&nbsp;</strong>
              {isEditing ? (
                <input
                  name="isRecurring"
                  type="checkbox"
                  checked={editedChallenge.isRecurring}
                  onChange={(e) =>
                    setEditedChallenge({
                      ...editedChallenge,
                      isRecurring: e.target.checked,
                    })
                  }
                />
              ) : (
                challenge.isRecurring ? "Yes" : "No"
              )}
            </p>
            <p><strong>Is Bonus:&nbsp;</strong>
              {isEditing ? (
                <input
                  name="isBonus"
                  type="checkbox"
                  checked={editedChallenge.isBonus}
                  onChange={(e) =>
                    setEditedChallenge({
                      ...editedChallenge,
                      isBonus: e.target.checked,
                    })
                  }
                />
              ) : (
                challenge.isBonus ? "Yes" : "No"
              )}
            </p>
            <p><strong>Is Editable:&nbsp;</strong>
              {isEditing ? (
                <input
                  name="isEditable"
                  type="checkbox"
                  checked={editedChallenge.isEditable}
                  onChange={(e) =>
                    setEditedChallenge({
                      ...editedChallenge,
                      isEditable: e.target.checked,
                    })
                  }
                />
              ) : (
                challenge.isEditable ? "Yes" : "No"
              )}
            </p>
            <p><strong>Start Date:&nbsp;</strong> 
              {isEditing ? (
                <input
                  className="start-date-picker"
                  name="startDate"
                  type="date"
                  value={challenge.startDate}
                  onChange={handleInputChange}
                />
              ) : (
                challenge.startDate ? new Date(challenge.startDate).toLocaleDateString() : "None"
              )}
            </p>
            <p><strong>End Date:&nbsp;</strong> 
              {isEditing ? (
                <input
                  className="end-date-picker"
                  name="endDate"
                  type="date"
                  value={challenge.endDate}
                  onChange={handleInputChange}
                />
              ) : (
                challenge.endDate ? new Date(challenge.endDate).toLocaleDateString() : "None"
              )}
            </p>
            <p><strong>Prerequisites:&nbsp;</strong>
              {isEditing ? (
                <select
                  name="prerequisiteChallenges"
                  multiple
                  value={editedChallenge.prerequisiteChallanges || []}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                    setEditedChallenge({
                      ...editedChallenge,
                      prerequisiteChallanges: selectedOptions,
                    });
                  }}
                >
                  {eventChallenges.map((challenge) => (
                    <option key={challenge.id} value={challenge.id}>
                      {challenge.name}
                    </option>
                  ))}
                </select>
              ) : (
                challenge.prerequisiteChallanges && challenge.prerequisiteChallanges.length > 0 ? (
                  <div className="prerequisite-list">
                    {challenge.prerequisiteChallanges.map((prerequisite, index) => (
                      <Link to={`/challenges/${prerequisite}`} className="prerequisite-item">{challenges.find((e) => e.id === prerequisite).name}</Link>
                    ))}
                  </div>
                ) : (
                  "None"
                )
              )}
            </p>
            <p><strong>Conflicting Challenges:&nbsp;</strong>
              {isEditing ? (
                <select
                  name="conflictingChallenges"
                  multiple
                  value={editedChallenge.conflictingChallenges || []}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                    setEditedChallenge({
                      ...editedChallenge,
                      conflictingChallenges: selectedOptions,
                    });
                  }}
                >
                  {eventChallenges.map((challenge) => (
                    <option key={challenge.id} value={challenge.id}>
                      {challenge.name}
                    </option>
                  ))}
                </select>
              ) : (
                challenge.conflictingChallenges && challenge.conflictingChallenges.length > 0 ? (
                  <div className="prerequisite-list">
                    {challenge.conflictingChallenges.map((conflicting, index) => (
                      <Link to={`/challenges/${conflicting}`} className="prerequisite-item">{challenges.find((e) => e.id === conflicting).name}</Link>
                    ))}
                  </div>
                ) : (
                  "None"
                )
              )}
            </p>
          </div>
          <div className={`save-button-container ${isEditing ? "show" : ""}`}>
            {isEditing && <button className="save-button" onClick={handleSave}>Save</button>}
            {isEditing && <button className="delete-button" onClick={handleDelete}>Delete</button>}
            {isEditing && <button className="cancel-button" onClick={toggleIsEditing}>Cancel</button>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChallengeDetails;