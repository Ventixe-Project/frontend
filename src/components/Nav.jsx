import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "/src/images/logo/logo.svg";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 767);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 767);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const Nav = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isEventsRoot =
    location.pathname === "/" || location.pathname === "/events";

  const showLogo = !isMobile || isEventsRoot;
  const showBack = isMobile && !isEventsRoot;

  const getPageTitle = (pathname) => {
    if (pathname === "/" || pathname === "/events") return "Events";
    if (pathname.startsWith("/events/booking")) return "Booking";
    if (pathname.startsWith("/events/")) return "Event Details";
    if (pathname.startsWith("/bookings")) return "Bookings";
    if (pathname.startsWith("/projects")) return "Projects";
    return "";
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <nav>
      {showLogo && (
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isEventsRoot
              ? "nav-link nav-logo-link active"
              : "nav-link nav-logo-link"
          }
        >
          <img src={logo} alt="Logo" />
          <h4>Ventixe</h4>
        </NavLink>
      )}
      {showBack && (
        <button
          className="nav-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          type="button"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}
      {isMobile && <span className="nav-page-title">{pageTitle}</span>}

      <NavLink
        to="/events"
        className={() =>
          location.pathname === "/" ||
          location.pathname === "/events" ||
          location.pathname.startsWith("/events/")
            ? "nav-link active events"
            : "nav-link events"
        }
      >
        <span className="material-symbols-outlined">confirmation_number</span>
        <p>Events</p>
      </NavLink>
    </nav>
  );
};

export default Nav;
