import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { getIcon } from "../../../../utils/utils";

import "./Today.scss";

export default function Today(props) {
  const { date, humidity, temp, maxTemp, minTemp, icon } = props.today;
  const [file, setFile] = useState("");
  useEffect(() => {
    if (icon) setFile(getIcon(icon));
  }, [props.today]);
  return icon ? (
    <div className="today">
      <ReactSVG src={file} className="today__icon" />
      <div className="today__info">
        <span className="today__title">TODAY</span>
        <p>{parseInt(temp)}°</p>
      </div>
    </div>
  ) : null;
}
