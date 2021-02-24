import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import edit from "src/assets/edit.svg";
import erase from "src/assets/delete.svg";

import "./Events.scss";

export default function Events(props) {
  const { events, setEvents } = props;
  const [newEvent, setNewEvent] = useState({
    event: "",
    date: null,
    time: null,
  });

  const onTrash = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
    //change in localstorage
  };
  const onAddNewEvent = () => {
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
  };

  return (
    <div className="events">
      <div className="events__form custom-scroll">
        <div className="events__new-event">
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
              const date = new Date(
                e.target.valueAsNumber + 1000 * 60 * 60 * 24
              );
              setNewEvent({
                ...newEvent,
                date: `${date.getFullYear()}/${
                  date.getMonth() < 9
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1
                }/${
                  date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
                }`,
              });
            }}
          />
          <input
            type="time"
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <button onClick={onAddNewEvent}>Agregar</button>
        </div>

        {events.map((e) => (
          <div key={e.id} className="events__event">
            <p>
              ({e.date.replace(/\//g, "-")} {e.time}) {e.title}
            </p>
            <ReactSVG
              src={erase}
              beforeInjection={(svg) => {
                svg.classList.add("event__remove"),
                  svg.setAttribute(
                    "style",
                    `width:20px;height:20px;margin:0 8px;fill:#F93154;cursor:pointer;`
                  );
              }}
              afterInjection={(_, svg) => {
                svg.classList.add(`s`);
              }}
              onClick={() => onTrash(e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
