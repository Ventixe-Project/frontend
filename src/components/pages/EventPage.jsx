import { useEffect, useState } from "react";
import EventList from "../EventList";
import SearchBar from "../SearchBar";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(
      "https://eventserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/events"
    )
      .then((res) => res.json())
      .then((data) => setEvents(data.result || []));
  }, []);

  const filteredEvents = (Array.isArray(events) ? events : []).filter(
    (event) => {
      const name = event.eventName ? event.eventName.toLowerCase() : "";
      const location = event.eventLocation
        ? event.eventLocation.toLowerCase()
        : "";
      const search = query.toLowerCase();
      return name.includes(search) || location.includes(search);
    }
  );

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <EventList events={filteredEvents} />
      {filteredEvents.length === 0 && query && (
        <p className="no-results">No results found for "{query}"</p>
      )}
    </>
  );
};

export default EventPage;
