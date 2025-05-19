import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState({});

  const getEvents = async () => {
    const res = await fetch(
      `https://eventserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/events/${id}`
    );

    if (res.ok) {
      const response = await res.json();
      setEvent(response.result);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="event-details">
      <h1>{event.eventName}</h1>
      <Link to={`/events/booking/${id}`}>Book event</Link>
    </div>
  );
};

export default EventDetails;
