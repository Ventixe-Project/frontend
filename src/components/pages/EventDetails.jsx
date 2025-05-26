import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState({});
  const [eventPackage, setEventPackage] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const sortedPackages = [...eventPackage].sort((a, b) => a.price - b.price);
  const cheapestPackage = sortedPackages[0];

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

  useEffect(() => {
    if (eventPackage && eventPackage.length > 0) {
      const sorted = [...eventPackage].sort((a, b) => a.price - b.price);
      setSelectedPackage(sorted[0]);
    }
  }, [eventPackage]);

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
                  <p>
                    {selectedPackage &&
                    selectedPackage.id !== cheapestPackage.id
                      ? "Selected package"
                      : "Starts from"}
                  </p>
                  <h6>
                    {selectedPackage
                      ? `$${selectedPackage.price}`
                      : cheapestPackage
                      ? `$${cheapestPackage.price}`
                      : "Free"}
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

      <div className="event-packages-container">

          <p>Packages</p>
          <div className="packages-list">
            {eventPackage && eventPackage.length > 0 ? (
              eventPackage
                .sort((a, b) => a.price - b.price)
                .map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`package-item ${
                      selectedPackage?.id === pkg.id ? "selected" : ""
                    }`}
                    onClick={() =>
                      selectedPackage?.id === pkg.id
                        ? setSelectedPackage(null)
                        : setSelectedPackage(pkg)
                    }
                  >
                    <div className="package-header">
                      <p>{pkg.packageName}</p>
                      <p className="package-price">${pkg.price}</p>
                    </div>
                    <div className="package-details">
                      <div className="package-type">
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>
                        <p>{pkg.type}</p>
                      </div>
                      <div className="package-description">
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>
                        <p>{pkg.description}</p>
                      </div>
                    </div>
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
