import React, { useState } from "react";

import "./Events.scss";
import NewEventForm from "./components/NewEventForm";
import Event from "./components/Event";

export default function Events(props) {
  const { events, setEvents } = props;
  const [newEvent, setNewEvent] = useState({
    event: "",
    date: null,
    time: null,
  });

  const onTrash = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
  };

  return (
    <div className="events">
      <div className="events__form custom-scroll">
        <NewEventForm
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          setEvents={setEvents}
          events={events}
        />
        {events.length !== 0 && <h1>Eventos</h1>}
        {events.map((e, i) => (
          <Event key={i} event={e} onTrash={(e) => onTrash(e)} />
        ))}
      </div>
    </div>
  );
}
