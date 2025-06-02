import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link nav-logo-link active" : "nav-link nav-logo-link"
        }
      >
        <img src="src/images/logo/logo.svg" alt="Logo" />
        <h4>Ventixe</h4>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive || window.location.pathname.startsWith("/events")
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
