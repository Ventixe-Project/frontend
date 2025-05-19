import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BookingEvent = () => {
  const { navigate } = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = React.useState({});
  const [formData, setFormData] = {
    eventId: id,
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    postalCode: "",
  };

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const res = await fetch(
        `https://eventserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/events/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch event data");

      const data = await res.json();
      setEvent(data.result);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postBooking();

    try {
      const res = await fetch(
        `https://bookingserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        console.error("Error posting booking data:", res.statusText);
      } else {
        console.log("Booking successful:", data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div>
      <h1>Book Event - {event.eventName}</h1>
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Book Event</button>
        </form>
      </div>
    </div>
  );
};

export default BookingEvent;
