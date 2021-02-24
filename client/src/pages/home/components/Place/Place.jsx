import React from "react";
import "./Place.scss";

export default function Place(props) {
  return (
    <div className="place">
      <h1>{props.city}</h1>
      <h2>{props.country}</h2>
    </div>
  );
}
