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
      <div className="event-details">
        <h1>{event?.eventName || "Loading event..."}</h1>
        <Link to={`/events/booking/${id}`}>Book event</Link>
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
