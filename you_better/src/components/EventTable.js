import React from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../providers/EventContext";
import "./EventTable.css";

const EventTable = () => {
  const { events, loading } = useEvents();
  const sortedEvents = [...events].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  if (events.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <div className="event-table-container">
      <table className="event-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Has Multiple Difficulties</th>
            <th>Theme Color</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Display Image</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id}>
              <td>
                <Link to={`/events/${event.id}`}>{event.name}</Link>
              </td>
              <td>{event.description}</td>
              <td>{event.hasMultipleDifficulties ? "Yes" : "No"}</td>
              <td>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: event.themeColor,
                    border: "1px solid #ccc",
                  }}
                ></div>
              </td>
              <td>{new Date(event.startDate).toLocaleDateString()}</td>
              <td>{new Date(event.endDate).toLocaleDateString()}</td>
              <td>
                {event.displayImageUrl 
                  ? <a href={event.displayImageUrl} target="_blank" rel="noopener noreferrer">
                      View Image
                    </a>
                  : "None"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;