import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import erase from "src/assets/delete.svg";
import "./Event.scss";

export default function Event(props) {
  const { event, onTrash } = props;
  return (
    <div key={event.id} className="events__event">
      <p>
        ({event.date.replace(/\//g, "-")} {event.time}) {event.title}
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
        onClick={() => onTrash(event)}
      />
    </div>
  );
}
