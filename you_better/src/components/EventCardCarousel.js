import React, { useRef } from "react";
import { useEvents } from "../providers/EventContext";
import EventCard from "./EventCard";
import "./EventCardCarousel.css";

const EventCardCarousel = () => {
    const carouselRef = useRef(null);
    const { events, loading } = useEvents();
  

    const scrollLeft = () => {
        if (carouselRef.current) {
        carouselRef.current.scrollBy({
            left: -320, // Adjust based on card width
            behavior: "smooth",
        });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
        carouselRef.current.scrollBy({
            left: 320, // Adjust based on card width
            behavior: "smooth",
        });
        }
    };

    return (
        <div className="card-carousel-container">
        <button className="carousel-arrow left-arrow" onClick={scrollLeft}>
            &#8249; {/* Left arrow */}
        </button>
        <div className="card-carousel-track" ref={carouselRef}>
            {events.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
        </div>
        <button className="carousel-arrow right-arrow" onClick={scrollRight}>
            &#8250; {/* Right arrow */}
        </button>
        </div>
    );
};

export default EventCardCarousel;