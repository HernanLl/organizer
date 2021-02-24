import React from "react";

import "./Weather.scss";

export default function Weather(props) {
  return <div className="weather">{props.children}</div>;
}
