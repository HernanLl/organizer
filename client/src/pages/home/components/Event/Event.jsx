import React from "react";

import "./Event.scss";

export default function Events(props) {
  const { time, title } = props.event;
  return (
    <div className="event">
      <span className="event__time">{time}</span>
      <span className="event__title">{title}</span>
    </div>
  );
}
