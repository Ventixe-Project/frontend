import { useEffect, useState } from "react";
import EventList from "../EventList";
import SearchBar from "../SearchBar";
import CategoryDropdown from "../CategoryDropdown";

const categories = [
  "Music", "Fashion", "Outdoor & Adventure", "Technology", "Health & Wellness"
];

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(
      "https://eventserviceventixe-a3dzg2fyc9hcc4dy.swedencentral-01.azurewebsites.net/api/events"
    )
      .then((res) => res.json())
      .then((data) => setEvents(data.result || []));
  }, []);

  const filteredEvents = events.filter((event) => {
    const search = query.toLowerCase();
    const matchesQuery =
      event.eventName.toLowerCase().includes(search) ||
      event.eventLocation.toLowerCase().includes(search);

    const matchesCategory =
      !selectedCategory || event.eventCategory === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <div className="search-bar-row">
        <SearchBar query={query} setQuery={setQuery} />
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <EventList events={filteredEvents} />
      {filteredEvents.length === 0 && query && (
        <p className="no-results">No results found for "{query}"</p>
      )}
    </>
  );
};

export default EventPage;
