import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import Time from "./components/Time";
import Place from "./components/Place";
import ThemeSelector from "./components/ThemeSelector";
import Events from "./components/Events";
import Event from "./components/Event";
import Weather from "./components/Weather";
import Today from "./components/Today";
import Day from "./components/Day";
import countries from "src/utils/countries.json";
import weatherService from "src/services/weatherService";
import { getDays } from "src/utils/utils";
import "./Home.scss";

export default function Home(props) {
  const { events } = props;
  const [theme, setTheme] = useState(0);
  const [otherDays, setOtherDays] = useState([]);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [today, setToday] = useState({ temp: "" });

  const getBgTheme = () => {
    switch (theme) {
      case 0:
        return "bg-1";
      case 1:
        return "bg-2";
      case 2:
        return "bg-3";
      default:
        return "bg-1";
    }
  };

  const changeTheme = (theme) => {
    setTheme(theme);
  };

  async function loadData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          //set input to place
          const {
            cityName,
            countryCode,
          } = await weatherService.getCityNameByLocation(latitude, longitude); //get city name
          const country = countries.find((e) => e.code === countryCode); //find country
          setLocation({ city: cityName, country: country.name });
          //loading actual weather
          const actualWeather = await weatherService.getActualWeather(cityName);
          setToday(actualWeather);
          //loading weather days
          const weatherDays = await weatherService.getWeatherByCity(cityName);
          if (weatherDays && weatherDays.length > 0) {
            const days = getDays();
            setOtherDays(
              weatherDays.map((e, index) => ({ ...e, ...days[index] }))
            );
          }
        }
      );
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={`home ${getBgTheme()}`}>
      <Main>
        <div className="home__header">
          <Time />
          <div className="home__ly">
            <Place country={location.country} city={location.city} />
            <ThemeSelector
              theme={theme}
              changeTheme={(theme) => changeTheme(theme)}
            />
          </div>
        </div>
        <Events>
          {events
            .filter((e) => {
              const actual = new Date(Date.now());
              const date = new Date(e.date);
              return (
                actual.getDate() === date.getDate() &&
                actual.getMonth() === date.getMonth() &&
                actual.getFullYear() === date.getFullYear()
              );
            })
            .map((e, index) => (
              <div key={index} className="event-container">
                {index !== 0 && <div className="list-events-connector"></div>}
                <Event event={e} />
              </div>
            ))}
        </Events>
      </Main>
      <Weather>
        <Today today={today} />
        <div className="home__other-days">
          {otherDays.map((e, index) => (
            <Day key={index} day={e} />
          ))}
        </div>
      </Weather>
    </div>
  );
}
