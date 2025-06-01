import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState("");
  const [packageName, setPackageName] = useState("");

  useEffect(() => {
    console.log("BookingId param:", bookingId); 
    const fetchBooking = async () => {
      try {
        const url = `https://bookingservice-ventixe-czbphpafa4eyamb2.swedencentral-01.azurewebsites.net/api/bookings/${bookingId}`;
        console.log("Fetching booking from:", url);
        const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      console.log("Fetched booking data:", data);
      setBooking(data.result || data);

      fetch(`https://eventserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/events/${(data.result || data).eventId}`)
        .then(res => res.json())
        .then(ev => setEventName(ev.result?.eventName || ''));

      fetch(`https://packageserviceventixe-gxd7f5h6dde3dxam.swedencentral-01.azurewebsites.net/api/packages/${(data.result || data).packageId}`)
        .then(res => res.json())
        .then(pkg => setPackageName(pkg.result?.packageName || ''));
      } else {
        const text = await res.text();
        console.warn("Fetch failed. Status:", res.status, "Body:", text);
        setBooking(null);
      }
    } catch (err) {
      console.error("Fetch threw an error:", err);
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };
  fetchBooking();
  }, [bookingId]);

  
  

  if (loading) return <div>Loading booking...</div>;
  if (!booking) {
    return (
      <div>
        <h2>Booking not found</h2>
        <button onClick={() => navigate("/")}>Back to Events</button>
      </div>
    );
  }

  return (
    <div className="booking-confirmation-wrapper">
      <div className="booking-confirmation-card">
        <i
          className="fa-solid fa-circle-check fa-5x"
          style={{ color: "#f47fff" }}
        ></i>

        <h1> Thank you for your booking!</h1>
        <h3>Your ticket is confirmed</h3>
        <div className="confirmed-booking-summary">
          <p>
            <b>Booking ID:</b> {booking.id}
          </p>
          <p>
            <b>Event:</b> {eventName}
          </p>
          <p className="confirmed-package">
            <b>Package:</b>
            <span> {packageName} </span>
            {packageName && packageName.toLowerCase().includes("vip") && (
              <span className="vip-badge">
                <i
                  className="fa-solid fa-check"
                  style={{ fontSize: 14, marginRight: 4 }}
                ></i>{" "}
                VIP
              </span>
            )}
            {packageName &&
              !packageName.toLowerCase().includes("vip") &&
              ["ultimate", "all-inclusive"].some((tier) =>
                packageName.toLowerCase().includes(tier)
              ) && (
                <span className="premium-badge">
                  <i
                    className="fa-solid fa-check"
                    style={{ fontSize: 14, marginRight: 4, color: "#f47fff" }}
                  ></i>{" "}
                  Exclusive
                </span>
              )}
          </p>
          <p>
            <b>Quantity:</b> {booking.ticketQuantity}
          </p>
          <p>
            <b>Name:</b> {booking.firstName} {booking.lastName}
          </p>
          <p>
            <b>Email:</b> {booking.email}
          </p>
          <p>
            <b>Your city:</b> {booking.city}
          </p>
          <p>
            <b>Your postal code:</b> {booking.postalCode}
          </p>
        </div>
        <div className="confirmation-actions">
          <button onClick={() => navigate("/")}>Back to Events</button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationPage;
