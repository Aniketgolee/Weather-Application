import React, { useEffect, useState } from "react";
import "./css/style.css";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "X-RapidAPI-Key",
          "d88eb29213msh6eaa36891f52d42p1482c1jsn0b1de5386161"
        );
        myHeaders.append(
          "X-RapidAPI-Host",
          "yahoo-weather5.p.rapidapi.com"
        );

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `https://yahoo-weather5.p.rapidapi.com/weather?location=${search}&format=json&u=c`,
          requestOptions
        );
        const result = await response.json();
        console.log(result);
        const temperature = result?.current_observation?.condition?.temperature;
        const forecasts = result?.forecasts;
        setCity({ temperature, forecasts });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputFeild"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {!city ? (
          <p>No data found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fa fa-street-view"></i>
                {search}
              </h2>
              <h1 className="temp">
                {city.temperature ? (
                  `${city.temperature}°C`
                ) : (
                  "Temperature data not available"
                )}
              </h1>
              {city.forecasts && city.forecasts.length > 0 ? (
                <h3>
                  Min: {city.forecasts[0].low}°C | Max: {city.forecasts[0].high}
                  °C
                </h3>
              ) : (
                <p>No forecast data available</p>
              )}
            </div>
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
