import React from "react";

import "./ListEvents.scss";

export default function Events(props) {
  return <div className="list-events custom-scroll">{props.children}</div>;
}
