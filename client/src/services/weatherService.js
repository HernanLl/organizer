import axios from "axios";
import { getIconCode } from "../utils/utils";

const weatherService = {
  getCityNameByLocation: async function (latitude, longitude) {
    try {
      if (localStorage.getItem("city")) {
        const city = JSON.parse(localStorage.getItem("city"));
        if (
          city &&
          city.longitude == parseFloat(longitude).toFixed(2) &&
          city.latitude == parseFloat(latitude).toFixed(2)
        ) {
          console.info("-Load city from local storage-");
          return { cityName: city.name, countryCode: city.countryCode };
        }
      }

      console.info("-Load city from api-");
      const res = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=3378201560809e3a6ffe4d6fc2bb33e2`
      );
      if (res.data && res.data.length > 0) {
        localStorage.setItem(
          "city",
          JSON.stringify({
            name: res.data[0].name,
            latitude: parseFloat(latitude).toFixed(2),
            longitude: parseFloat(longitude).toFixed(2),
            countryCode: res.data[0].country,
          })
        );
        return {
          cityName: res.data[0].name,
          countryCode: res.data[0].country,
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
  getActualWeather: async function (cityName) {
    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${cityName}&appid=3378201560809e3a6ffe4d6fc2bb33e2`
      );
      let weather = res?.data?.list[0];
      return {
        date: weather.dt_txt,
        humidity: weather.main.humidity,
        temp: weather.main.temp,
        maxTemp: weather.main.temp_max,
        minTemp: weather.main.temp_min,
        icon: getIconCode(weather.weather[0].id),
      };
    } catch (err) {
      console.log(err);
    }
  },
  getWeatherByCity: async function (cityName) {
    try {
      if (localStorage.getItem("weather")) {
        const weather = JSON.parse(localStorage.getItem("weather"));
        if (
          weather.weatherDays &&
          new Date(weather.date) > new Date(Date.now() - 1000 * 60 * 60 * 12)
        ) {
          console.info("-Weather days loaded from local storage-");
          return weather.weatherDays;
        }
      }
      console.info("-Weather days loaded from api-");
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${cityName}&appid=3378201560809e3a6ffe4d6fc2bb33e2`
      );
      let resWeatherDays = res.data.list;
      let index = 0;
      const date = new Date(Date.now());
      let time =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      while (resWeatherDays[index].dt_txt.indexOf(time) === 0) {
        index++;
      }
      resWeatherDays = resWeatherDays.slice(
        index,
        resWeatherDays.length - (8 - index)
      );

      let weatherDays = [];
      for (let i = 0; i < parseInt(resWeatherDays.length / 8); i++) {
        const weatherDay = resWeatherDays.slice(i * 8, i * 8 + 8);
        weatherDays.push(getWeather(weatherDay));
      }

      localStorage.setItem(
        "weather",
        JSON.stringify({ weatherDays, date: new Date(Date.now()) })
      );
      return weatherDays;
    } catch (err) {
      console.log(err);
    }
  },
};

function getWeather(weatherDay) {
  // weatherDay is an array of 8 elements where each element is weather every 3 hours for a day
  let humidity = 0;
  let temperature = 0;
  let maxTemp = 0;
  let minTemp = 0;

  let icons = [800, 801, 802, 803, 804, 300, 500, 200];

  let maxIcon = -1;
  //icrement counters
  weatherDay.forEach((e) => {
    (humidity += e.main.humidity),
      (temperature += e.main.temp),
      (maxTemp += e.main.temp_max),
      (minTemp += e.main.temp_min);
    const iconCode = getIconCode(e.weather[0].id);
    const index = icons.indexOf(iconCode);
    if (index > maxIcon) maxIcon = index;
  });

  return {
    date: weatherDay[0].dt_txt,
    humidity: humidity / 8,
    temp: temperature / 8,
    maxTemp: maxTemp / 8,
    minTemp: minTemp / 8,
    icon: icons[maxIcon],
  }; // must return {temp, minTemp,maxTemp, icon, humidity, date}
}

export default weatherService;
