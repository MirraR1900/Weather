import React from "react";
import { WeatherDay } from '../components/WeatherDay';

type BlockWeatherPast = {
    objectWeather: any
}

export const BlockWeatherPast: React.FC<BlockWeatherPast> = ({objectWeather}) => {
    return (
        <div className="containerPast">
            <WeatherDay date={objectWeather.day} temp={objectWeather.temp} weather={objectWeather.weather} />
        </div>
    )
}