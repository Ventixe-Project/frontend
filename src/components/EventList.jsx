import EventItem from "./EventItem";

const EventList = ({ events }) => (
  <section id="events">
    {events.map((event) => (
      <EventItem key={event.id} item={event} />
    ))}
  </section>
);

export default EventList;
