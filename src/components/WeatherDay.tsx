import React from "react";

type WeatherDayType = {
  date: String
  temp: String
}

export const WeatherDay: React.FC<WeatherDayType> = ({ date, temp }) => {
  return (
    <div className="cardWeatherDay">
      <p className="date">{date}</p>
      <p className="imageWeather"></p>
      <p className="temperature">{temp}&deg;</p>
    </div>
  )
}