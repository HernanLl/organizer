import React, { useEffect, useState } from "react";
import "./App.scss";
import "./normalize.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Events from "./pages/events/Events";
import Navbar from "./components/Navbar";

function App() {
  const [events, setEvents] = useState([]);

  const onSetEvents = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
    setEvents(events);
  };

  useEffect(() => {
    if (localStorage.getItem("events")) {
      const _events = JSON.parse(localStorage.getItem("events"));
      setEvents(_events);
    }
  }, []);

  return (
    <BrowserRouter>
      <main className="app">
        <Navbar />
        <Switch>
          <Route path="/" exact={true}>
            <Home events={events} />
          </Route>
          <Route path="/events">
            <Events events={events} setEvents={onSetEvents} />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
