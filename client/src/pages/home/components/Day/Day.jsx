import React, { useEffect } from "react";

import "./Day.scss";
import { getIcon } from "../../../../utils/utils";

export default function Day(props) {
  const { short, icon, temp, maxTemp, minTemp } = props.day;
  return icon ? (
    <div className="day">
      <span className="day__name">{short}</span>
      <img className="day__icon" src={getIcon(icon)} alt="" />
      <span className="day__temperature">{parseInt(temp)}°</span>
    </div>
  ) : null;
}
