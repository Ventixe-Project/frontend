import "./App.css";
import EventPage from "./components/pages/EventPage";
import EventDetails from "./components/pages/EventDetails";
import { Route, Routes } from "react-router-dom";
import BookingEvent from "./components/pages/BookingEvent";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<EventPage />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="events/booking/:id" element={<BookingEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
