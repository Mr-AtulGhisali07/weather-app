import React, { useState } from "react";
import moment from "moment/moment";
import "./components/Weather.css";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState({
    temp: 28,
    temp_feels_like: 24,
    temp_max: 30,
    temp_min: 22,
    city_name: "India",
    humidity: 10,
    speed: 2,
    visibility: 1000,
    weather: "Clouds",
    country: "IN",
    image: "./images/clouds.webp",
  });

  const [serchName, setSerchName] = useState("");
  const [error, setError] = useState("");
  const [getTime, setTime] = useState("");
  const [getDate, setDate] = useState("");

  const handelClick = () => {
    if (serchName !== "") {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${serchName}&appid=fba9d8973b94e79f7fd99a179542671f&&units=metric`;
      axios
        .get(apiURL)
        .then((res) => {
          console.log(res.data);
          let imgPath = "";
          if (res.data.weather[0].main == "Clouds") {
            imgPath = "./images/clouds.webp";
          } else if (res.data.weather[0].main == "Rain") {
            imgPath = "./images/rain.webp";
          } else if (res.data.weather[0].main == "Drizzle") {
            imgPath = "./images/Drizzle.webp";
          } else if (res.data.weather[0].main == "Mist") {
            imgPath = "./images/mist.png";
          } else if (res.data.weather[0].main == "Clear") {
            imgPath = "./images/sun.png";
          } else if (res.data.weather[0].main == "Smoke") {
            imgPath = "./images/smoke.webp";
          } else if (res.data.weather[0].main == "Snow") {
            imgPath = "./images/snow.webp";
          } else {
            imgPath = "./images/clouds.webp";
          }

          setData({
            ...data,
            temp: res.data.main.temp,
            temp_feels_like: res.data.main.feels_like,
            temp_max: res.data.main.temp_max,
            temp_min: res.data.main.temp_min,
            city_name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            visibility: res.data.visibility,
            weather: res.data.weather[0].main,
            country: res.data.sys.country,
            image: imgPath,
          });

          setError("");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          }
          console.log(err);
        });
    }
  };

  setTimeout(() => {
    const time = moment().format("h : mm : ss");
    setTime(time);
    const date = moment().format("dddd , Do MMMM YYYY");
    setDate(date);
  }, 1000);

  return (
    <div className="container">
      <div className="parent-grid">
        <div className="grid-child-1">
          <div className="weather-1">
            <div className="time">
              {" "}
              <h1>{getTime}</h1>
            </div>
            <div className="date">
              {" "}
              <h2>{getDate}</h2> <p>{Math.round(data.temp)}°c</p>
            </div>
          </div>
        </div>

        <div className="grid-child-2">
          <div className="weather-2">
            <div className="weather-info">
              <img src={data.image} alt="cloud/img" className="icon"></img>
              <h1>{Math.round(data.temp)}°c</h1>
              <span className="clouds">
                {data.weather} {Math.round(data.temp_feels_like)} <sub>°</sub>/
                {Math.round(data.temp_min)}
                <sub>°</sub>
              </span>
              <div className="search">
                <input
                  type="text"
                  placeholder="Enter City Name"
                  onChange={(e) => setSerchName(e.target.value)}
                />
                <button>
                  <img
                    src="./images/search.png"
                    alt="search Img"
                    onClick={handelClick}
                  />
                </button>
              </div>
              <div className="error">
                <p>{error}</p>
              </div>

              <h2>
                {data.city_name}
                <span className="country"> , {data.country}</span>
              </h2>

              <div className="details">
                <div className="col">
                  <p className="para">
                    Feels Like <span>{Math.round(data.temp_feels_like)}°C</span>
                  </p>
                  <p className="para">
                    Humidity <span>{data.humidity}%</span>
                  </p>
                  <p className="para">
                    Visibility <span>{data.visibility} ml </span>
                  </p>
                  <p className="para">
                    Wind Speed <span>{Math.round(data.speed)} Km/h</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
