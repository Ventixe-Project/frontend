import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const EventItem = ({ item }) => {
const [cheapestPrice, setCheapestPrice] = useState(null);

useEffect(() => {
  const fetchPrice = async () => {
    const res = await fetch(
      `https://packageserviceventixe-gxd7f5h6dde3dxam.swedencentral-01.azurewebsites.net/api/packages?eventId=${item.id}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.result && data.result.length > 0) {
        const sorted = [...data.result].sort((a, b) => a.price - b.price);
        setCheapestPrice(sorted[0].price);
      } else {
        setCheapestPrice(0); // Free fallback
      }
    }
  };
  fetchPrice();
}, [item.id]);

  return (
    <Link to={`/events/${item.id}`}>
      <div className="event-wrapper">
        <div className="event-image-container">
          <img className="event-image" src={item.eventImage} />
          <span className="event-category">{item.eventCategory}</span>
        </div>
        <div className="event-card">
          <div className="event-header text">
            <p className="event-date">
              {item.eventDate
                ? `${new Date(item.eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} — ${new Date(item.eventDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}`
                : "No date available."}
            </p>
            <p className="event-title">{item.eventName}</p>
            <p className="event-location">
              <span className="material-symbols-outlined">location_on</span>
              {item?.eventLocation || "No location available."}
            </p>
          </div>
          <div className="event-header booking">
            {" "}
            <div className="eventprice">
              <p>
                $
                {cheapestPrice === null
                  ? "Loading..."
                  : cheapestPrice === 0
                  ? "Free"
                  : `${cheapestPrice}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventItem;
