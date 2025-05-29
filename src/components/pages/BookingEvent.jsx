import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BookingEvent = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const packageId = queryParams.get("packageId")

  const [selectedPackage, setSelectedPackage] = useState(null);
  const { id } = useParams();
  const [event, setEvent] = React.useState({});
  const [formData, setFormData] = useState({
    eventId: id,
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    ticketQuantity: 1,
    packageId: packageId || "",
  });

  const areAllFieldsFilled =
    formData.firstName !== "" &&
    formData.lastName !== "" &&
    formData.email !== "" &&
    formData.street !== "" &&
    formData.city !== "" &&
    formData.postalCode !== "";

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

  useEffect(() => {
    if (packageId) {
      fetchPackageDetails(packageId);
    }
  }, [packageId]);

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        packageId: selectedPackage.id,
price: selectedPackage.price
      }));
    }
  }, [selectedPackage]);

  const fetchPackageDetails = async (packageId) => {
    const res = await fetch(
      `https://packageserviceventixe-gxd7f5h6dde3dxam.swedencentral-01.azurewebsites.net/api/packages/${packageId}`
    );
    if (res.ok) {
      const data = await res.json();
      setSelectedPackage(data.result);
    } else {
      setSelectedPackage(null);
      console.error("Package fetch failed", res.status);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://bookingservice-ventixe-czbphpafa4eyamb2.swedencentral-01.azurewebsites.net/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        console.error("Error posting booking data:");
      } else {
        console.log("Booking successful:");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-forms">
        <h1>Book Event - {event.eventName}</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="booking-form-field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="booking-form-field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="booking-form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="booking-form-field">
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="booking-form-field">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="booking-form-field">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="booking-submit"
            type="submit"
            disabled={!areAllFieldsFilled}
          >
            Book Now!
          </button>
        </form>
      </div>

      <div className="booking-summary-card">
        <p className="booking-summary-header">Booking summary</p>
        <div className="booking-summary-details">
          <div className="summary-row">
            <div className="booking-summary-details img">
              {event.eventImage && (
                <div className="summary-event-image">
                  <img src={event.eventImage} alt={event.eventName} />
                </div>
              )}
            </div>
          </div>
          <div className="summary-row">
            <span className="summary-label">Event:</span>
            <span className="summary-value">{event.eventName || "-"}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Date & Time:</span>
            <span className="summary-value">
              {event.eventDate
                ? new Date(event.eventDate).toLocaleString()
                : "-"}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Ticket:</span>
            <span className="summary-value">{selectedPackage?.packageName || "-"}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Price:</span>
            <span className="summary-value">
              {selectedPackage?.price ? `$${selectedPackage.price}` : "-"}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Quantity:</span>
            <span className="summary-value">{formData.ticketQuantity}</span>
          </div>
          <div className="summary-row summary-total">
            <span className="summary-label">Total:</span>
            <span className="summary-value">
            {selectedPackage?.price
      ? `$${(selectedPackage.price * formData.ticketQuantity).toFixed(2)}`
      : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingEvent;
