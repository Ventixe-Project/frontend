import { useEffect, useState } from "react";
import EventList from "../EventList";
import SearchBar from "../SearchBar";
import CategoryDropdown from "../CategoryDropdown";
import Pagination from "../Pagination";

const categories = [
  "Music",
  "Fashion",
  "Outdoor & Adventure",
  "Technology",
  "Health & Wellness",
  "Art & Design",
  "Food & Culinary",
  "Sustainability & Environment",
];

const ITEMS_PER_PAGE_OPTIONS = [8, 12, 16, 24];

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

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
      {filteredEvents.length === 0 && query && (
        <p className="no-results">No results found for "{query}"</p>
      )}
      <EventList events={paginatedEvents} />
      <div className="pagination-row">
        <div className="pagination-showing">
          <span>Showing</span>
          <div className="pagination-select-wrapper">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="pagination-select"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="pagination-select-chevron material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </div>
          <span>out of {filteredEvents.length}</span>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default EventPage;
