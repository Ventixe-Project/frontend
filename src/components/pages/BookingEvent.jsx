import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BookingEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageId = queryParams.get("packageId");

  const [selectedPackage, setSelectedPackage] = useState(null);
  const { id } = useParams();
  const [event, setEvent] = React.useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const isFormValid = areAllFieldsFilled && !errors.email && !errors.postalCode;

  const getEvents = async () => {
    try {
      const res = await fetch(
        `https://eventserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/events/${id}`
      );
      if (!res.ok) {
        let errorMsg = "Failed to fetch event data";
        try {
          const errorData = await res.json();
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
        } catch {}
        setSubmitError(errorMsg);
        return;
      }

      const data = await res.json();
      setEvent(data.result);
    } catch (error) {
      setSubmitError(
        error?.message || "Error fetching event data. Please try again later."
      );
    }
  };

  const validate = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }

    if (name === "postalCode") {
      const swedishPostalCodeRegex = /^\d{3}\s?\d{2}$/;
      if (!swedishPostalCodeRegex.test(value)) {
        error = "Please provide a valid postal code, eg. 12345 or 123 45";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
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
        price: selectedPackage.price,
      }));
    }
  }, [selectedPackage]);

  const fetchPackageDetails = async (packageId) => {
    try {
      const res = await fetch(
        `https://packageserviceventixe-gxd7f5h6dde3dxam.swedencentral-01.azurewebsites.net/api/packages/${packageId}`
      );
      if (!res.ok) {
        let errorMsg = "Failed to fetch package details";
        try {
          const errorData = await res.json();
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
        } catch {
          errorMsg =
            "An unexpected error occurred while fetching package details.";
        }
        setSelectedPackage(null);
        setSubmitError(errorMsg);
        return;
      }
      const data = await res.json();
      setSelectedPackage(data.result);
    } catch (error) {
      setSelectedPackage(null);
      setSubmitError(
        error?.message ||
          "Error fetching package details. Please try again later."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
  
    try {
      const payload = {
        EventId: formData.eventId,
        PackageId: formData.packageId,
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Street: formData.street,
        City: formData.city,
        PostalCode: formData.postalCode,
        TicketQuantity: formData.ticketQuantity,
      };
      console.log("Booking payload:", JSON.stringify(payload, null, 2));
  
      const res = await fetch(
        `https://bookingservice-ventixe-czbphpafa4eyamb2.swedencentral-01.azurewebsites.net/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!res.ok) {
        // Handle backend validation/logic errors
        let errorMsg = "An error occurred. Please try again";
        const text = await res.text();
        console.error("Booking submission full error:", text);
        try {
          const errorData = JSON.parse(text);
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
        } catch {
          errorMsg = text;
        }
        setSubmitError(errorMsg);
        setIsSubmitting(false);
        return;
      }
  
      try {
        const data = await res.json();
        const bookingId = data.id;
        if (bookingId) {
          navigate(`/booking/confirmation/${bookingId}`);
        } else {
          navigate(`/booking/confirmation/`);
        }
      } catch (jsonErr) {
        console.warn("Booking created, but no JSON in response.");
        navigate(`/booking/confirmation/`);
      }
    } catch (error) {
      setSubmitError(
        "Network error: Could not submit booking. Please check your connection and try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="booking-page-title">Book your ticket</h1>
      <p className="booking-page-subtitle">
        Secure your spot. Instant confirmation!
      </p>
      <div className="booking-wrapper">
        <div className="booking-forms">
          <h1>Book Event</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="booking-form-field">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="booking-form-field">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="booking-form-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="booking-form-field">
              <input
                type="text"
                name="street"
                value={formData.street}
                placeholder="Street"
                onChange={handleChange}
                required
              />
            </div>
            <div className="booking-form-field">
              <input
                type="text"
                name="city"
                value={formData.city}
                placeholder="City"
                onChange={handleChange}
                required
              />
            </div>
            <div className="booking-form-field">
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                placeholder="Postal Code"
                onChange={handleChange}
                required
              />
              {errors.postalCode && (
                <span className="error-message">{errors.postalCode}</span>
              )}
            </div>
            <div className="booking-form-field quantity-field">
              <label htmlFor="ticketQuantity">Ticket Quantity</label>
              <div className="quantity-input-wrapper">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      ticketQuantity: Math.max(1, prev.ticketQuantity - 1),
                    }))
                  }
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <input
                  type="number"
                  id="ticketQuantity"
                  name="ticketQuantity"
                  min={1}
                  max={10}
                  value={formData.ticketQuantity}
                  onChange={handleChange}
                  className="quantity-input"
                />
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      ticketQuantity: Math.min(10, prev.ticketQuantity + 1),
                    }))
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {submitError && (
              <div className="submit-error-message">{submitError}</div>
            )}
            <div className="booking-submit-wrapper">
              <button
                className="booking-submit"
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                Book Now
              </button>
            </div>
          </form>
          <div className="secure-booking">
            <span className="material-symbols-outlined">lock</span>
            <p>Your booking is secure</p>
          </div>
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
                  : "-"}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Ticket:</span>
              <span className="summary-value ticket">
                {selectedPackage?.packageName &&
                  selectedPackage.packageName.toLowerCase().includes("vip") && (
                    <span className="vip-badge">
                      <span className="material-symbols-outlined check">
                        check
                      </span>
                      VIP
                    </span>
                  )}
                {selectedPackage?.packageName &&
                  !selectedPackage.packageName.toLowerCase().includes("vip") &&
                  ["ultimate", "all-inclusive"].some((tier) =>
                    selectedPackage.packageName.toLowerCase().includes(tier)
                  ) && (
                    <span className="premium-badge">
                      <span className="material-symbols-outlined check">
                        check
                      </span>
                      Exclusive
                    </span>
                  )}
                <span>{selectedPackage?.packageName || "-"}</span>
              </span>
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
                  ? `$${(
                      selectedPackage.price * formData.ticketQuantity
                    ).toFixed(2)}`
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingEvent;
