import React, { useState } from "react";
import "./NewEventForm.scss";

export default function NewEventForm(props) {
  const { newEvent, setNewEvent, setEvents, events } = props;
  const [error, setError] = useState("");
  const onAddNewEvent = () => {
    if (newEvent.event && newEvent.date && newEvent.time) {
      setError("");
      let arr = [
        ...events,
        {
          id: parseInt(Math.random() * 100000),
          time: newEvent.time,
          date: newEvent.date,
          title: newEvent.event,
        },
      ];
      arr = arr.sort((a, b) => {
        if (
          Math.abs(new Date(Date.now()) - new Date(`${a.date} ${a.time}`)) <
          Math.abs(new Date(Date.now()) - new Date(`${b.date} ${b.time}`))
        )
          return -1;
        else return 1;
      });
      setEvents(arr);
    } else {
      setError("Debe completar todos los datos");
    }
  };

  return (
    <div className="events__new-event">
      <span class="error">{error}</span>
      <input
        type="text"
        placeholder="Evento"
        value={newEvent.event}
        onChange={(e) =>
          setNewEvent({
            ...newEvent,
            event: e.target.value,
          })
        }
      />
      <input
        type="date"
        onChange={(e) => {
          const date = new Date(e.target.valueAsNumber + 1000 * 60 * 60 * 24);
          setNewEvent({
            ...newEvent,
            date: `${date.getFullYear()}/${
              date.getMonth() < 9
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1
            }/${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`,
          });
        }}
      />
      <input
        type="time"
        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
      />
      <button onClick={onAddNewEvent}>Agregar</button>
    </div>
  );
}
