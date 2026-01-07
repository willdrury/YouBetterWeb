import React, { useEffect, useRef } from "react";
import "./IconCarousel.css";

const IconCarousel = () => {
    const trackRef = useRef(null);

    useEffect(() => {
      const track = trackRef.current;
      if (track) {
        const trackWidth = track.scrollWidth; // Get the total width of the track
        const iconWidth = trackWidth / icons.length; // Calculate the width of one icon
        track.style.setProperty("--track-width", `${trackWidth}px`); // Set a CSS variable for the width
        track.style.setProperty("--icon-width", `${iconWidth}px`); // Set a CSS variable for the width
      }
    }, []);

    const icons = [
        <span class="material-symbols-outlined">chef_hat</span>,
        <span class="material-symbols-outlined">sprint</span>,
        <span class="material-symbols-outlined">chess</span>,
        <span class="material-symbols-outlined">book_ribbon</span>,
        <span class="material-symbols-outlined">exercise</span>,
        <span class="material-symbols-outlined">camera</span>,
        <span class="material-symbols-outlined">volunteer_activism</span>,
        <span class="material-symbols-outlined">stadia_controller</span>,
        <span class="material-symbols-outlined">self_improvement</span>,
        <span class="material-symbols-outlined">sports_gymnastics</span>,
        <span class="material-symbols-outlined">ink_pen</span>,
        <span class="material-symbols-outlined">toys_and_games</span>,

        <span class="material-symbols-outlined">chef_hat</span>,
        <span class="material-symbols-outlined">sprint</span>,
        <span class="material-symbols-outlined">chess</span>,
        <span class="material-symbols-outlined">book_ribbon</span>,
        <span class="material-symbols-outlined">exercise</span>,
        <span class="material-symbols-outlined">camera</span>,
        <span class="material-symbols-outlined">volunteer_activism</span>,
        <span class="material-symbols-outlined">stadia_controller</span>,
        <span class="material-symbols-outlined">self_improvement</span>,
        <span class="material-symbols-outlined">sports_gymnastics</span>,
        <span class="material-symbols-outlined">ink_pen</span>,
        <span class="material-symbols-outlined">toys_and_games</span>
    ];

    return (
        <div className="carousel-container">
            <div className="carousel-track" ref={trackRef}>
            {icons.map((icon, index) => (
                <div className="carousel-item" key={index}>
                {icon}
                </div>
            ))}
            {icons.map((icon, index) => (
                <div className="carousel-item" key={`duplicate-${index}`}>
                {icon}
                </div>
            ))}
            </div>
        </div>
    );
};

export default IconCarousel;