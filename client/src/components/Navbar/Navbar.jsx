import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import "./Navbar.scss";
import home from "src/assets/home.svg";
import book from "src/assets/notes.svg";

export default function Navbar() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (window.location.href.indexOf("events") !== -1) setPage(1);
    else setPage(0);
  }, []);

  return (
    <div className="nav">
      <Link to="/" onClick={() => setPage(0)}>
        <ReactSVG
          src={home}
          afterInjection={(_, svg) => {
            svg.classList.add(`${page === 0 && "nav__icon--active"}`);
          }}
          beforeInjection={(svg) => {
            svg.classList.add("nav__icon"),
              svg.setAttribute(
                "style",
                `width:30px;height:30px;fill:white;margin:0 4px;cursor:pointer;`
              );
          }}
        />
      </Link>
      <Link to="/events" onClick={() => setPage(1)}>
        <ReactSVG
          src={book}
          afterInjection={(_, svg) => {
            svg.classList.add(`${page === 1 && "nav__icon--active"}`);
          }}
          beforeInjection={(svg) => {
            svg.classList.add("nav__icon"),
              svg.setAttribute(
                "style",
                "width:30px;height:30px;fill:white;margin:0 4px;cursor:pointer;"
              );
          }}
        />
      </Link>
    </div>
  );
}
