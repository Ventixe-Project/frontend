import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const { id } = useParams();

  let headerText;
  let breadcrumb = null;
  let arrowBack = null;

  if (pathname === "/" || pathname === "/events") {
    headerText = "Events";
  } else if (pathname.startsWith("/events/booking")) {
    arrowBack = (
      <Link to={`/events/${id}`} className="arrow-back-link">
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
    );
    headerText = "Booking";
    breadcrumb = (
      <>
        <Link to="/" className="breadcrumb-link">
          Events
        </Link>
        {" / "}
        <Link to={`/events/${id}`} className="breadcrumb-link">
          Event Details
        </Link>
        {" / "}
        <span>Booking</span>
      </>
    );
  } else if (pathname.startsWith("/events/")) {
    arrowBack = (
      <Link to="/" className="arrow-back-link">
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
    );
    headerText = "Event Details";
    breadcrumb = (
      <>
        <Link to="/" className="breadcrumb-link">
          Events
        </Link>
        {" / "}
        <span>Event Details</span>
      </>
    );
  } else if (pathname.startsWith("/booking/confirmation")) {
    arrowBack = (
      <Link to="/" className="arrow-back-link">
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
    );
    headerText = "Order Confirmation";
    breadcrumb = (
      <>
        <Link to="/" className="breadcrumb-link">
          Events
        </Link>
        {" / "}
        <span>Order Confirmation</span>
      </>
    );
  } else {
    headerText = "Page Not Found";
  }

  return (
    <header>
      <div className="header-text-container">
        {breadcrumb && <nav className="breadcrumb">{breadcrumb}</nav>}
        <div className="header-title-row">
          {arrowBack}
          <h4>{headerText}</h4>
        </div>
      </div>
    </header>
  );
}

export default Header;
