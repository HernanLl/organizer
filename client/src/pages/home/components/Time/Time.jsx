import React, { useEffect, useState } from "react";
import * as Contants from "../../../../utils/constants";

import "./Time.scss";

export default function Time() {
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [date, setDate] = useState("");
  const [itsAm, setItsAm] = useState(false);

  function setTime() {
    const date = new Date(Date.now());
    const name = Contants.days[date.getDay()].name;
    const day = date.getDate();
    const month = Contants.months[date.getMonth()].name;
    const year = date.getFullYear();
    setDate(`${name}, ${day} ${month} ${year}`);
    setMinutes(
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    );
    setHour(date.getHours() < 10 ? "0" + date.getHours() : date.getHours());
    if (date.getHours() > 12) setItsAm(false);
    else setItsAm(true);
  }

  useEffect(() => {
    setTime();
    const interval = setInterval(() => {
      setTime();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="time">
      <div className="time__hour">
        <h1>
          {hour}:{minutes}
        </h1>
        <span>{itsAm ? "AM" : "PM"}</span>
      </div>
      <span className="time__date">{date}</span>
    </div>
  );
}
