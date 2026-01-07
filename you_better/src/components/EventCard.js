import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      {/* Event Image */}
      <div
        className="event-card-image"
        style={{ backgroundImage: `url(${event.displayImageUrl})` }}
      ></div>

      {/* Event Details */}
      <div className="event-card-details">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EventCard;