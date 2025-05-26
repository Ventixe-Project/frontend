import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState({});
  const [eventPackage, setEventPackage] = useState([]);

  const getEvents = async () => {
    const res = await fetch(
      `https://eventserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/events/${id}`
    );

    if (res.ok) {
      const response = await res.json();
      setEvent(response.result);
    }
  };

  const getPackages = async () => {
    const res = await fetch(
      `https://packageserviceventixe-gxd7f5h6dde3dxam.swedencentral-01.azurewebsites.net/api/packages?eventId=${id}`
    );

    if (res.ok) {
      const response = await res.json();
      setEventPackage(response.result);
    }
  };

  useEffect(() => {
    getEvents();
    getPackages();
  }, [id]);

  return (
    <>
      <div className="event-card">
        <img
          className="event-image"
          src={event.eventImage}
          alt={event.eventName}
        />
        <div className="event-details">
          <div className="event-header">
            <div className="event-header text">
              <h4 className="event-title">
                {event?.eventName || "Loading event..."}
              </h4>
              <p className="event-date">
                <span className="material-symbols-outlined">event</span>
                {event?.eventDate
                  ? `${new Date(event.eventDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })} — ${new Date(event.eventDate).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}`
                  : "No date available."}
              </p>
              <p className="event-location">
                <span className="material-symbols-outlined">location_on</span>
                {event?.eventLocation || "No location available."}
              </p>
            </div>
            <div className="event-header booking">
              <button className="event-booking-button">
                <span className="material-symbols-outlined">
                  event_available
                </span>
                <Link to={`/events/booking/${id}`}>Book event</Link>
              </button>
              <div className="eventprice">
                <p>Starts from</p>
                <h6>
                  {eventPackage?.packagePrice ? `$${event.eventPrice}` : "Free"}
                </h6>
              </div>
            </div>
          </div>
          <hr className="event-divider" />

          <p className="about-event">About Event</p>
          <p className="event-description">
            {event?.eventDescription || "No description available."}
          </p>
        </div>
      </div>
      <div className="event-packages">
        <h2>Packages</h2>
        <div className="packages-list">
          {eventPackage && eventPackage.length > 0 ? (
            eventPackage.map((pkg) => (
              <div key={pkg.id} className="package-item">
                <h3>{pkg.packageName}</h3>
                <p>{pkg.type}</p>
                <p>{pkg.description}</p>
                <p>Price: ${pkg.price}</p>
              </div>
            ))
          ) : (
            <p>No packages available for this event.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetails;
