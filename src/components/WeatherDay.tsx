import React from "react";

type WeatherDayType = {
  date: String
  temp: String
  weather: any
}

export const WeatherDay: React.FC<WeatherDayType> = ({ date, temp, weather }) => {
  return (
    <div className="cardWeatherDay">
      <p className="date">{date}</p>
      <p className="description">{weather.main}</p>
      <p className="imageWeather"><img src={ `http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon weather" /></p>
      <p className="temperature">{temp}&deg;</p>
    </div>
  )
}