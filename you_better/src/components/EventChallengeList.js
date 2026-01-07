import React from "react";
import { Link } from "react-router-dom";
import { useChallenges } from "../providers/ChallengeContext";
import { FaCheck } from "react-icons/fa";
import "./EventTable.css";

const EventChallengeList = ({eventId}) => {
  const { challenges, loading } = useChallenges();
  const eventChallenges = challenges.filter(challenge => challenge.eventId === eventId);

  if (eventChallenges.length === 0) {
    return <p style={{"padding-bottom": "20px"}}>No challenges to display.</p>;
  }

  return (
    <div className="event-table-container">
      <table className="event-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>IsBonus</th>
            <th>Max Points</th>
          </tr>
        </thead>
        <tbody>
          {eventChallenges.map((challenge) => (
            <tr key={challenge.id}>
              <td>
                <Link to={`/challenges/${challenge.id}`}>{challenge.name}</Link>
              </td>
              <td>{challenge.description}</td>
              <td>{
                challenge.difficulty 
                  ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)
                  : "NA"
              }</td>
              <td>{
                challenge.isBonus ? <FaCheck /> : ""
              }</td>
              <td>{
                challenge.maxPoints 
                  ? challenge.maxPoints
                  : "NA"
              }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventChallengeList;