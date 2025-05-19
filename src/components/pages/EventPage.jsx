import EventList from "../EventList";
import Footer from "../Footer";
import Header from "../Header";
import Nav from "../Nav";
import React from "react"; 

const EventPage = () => {
  return (
    <div className="portal-wrapper">
      <Nav />
      <Header />
      <main>
        <EventList />
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
