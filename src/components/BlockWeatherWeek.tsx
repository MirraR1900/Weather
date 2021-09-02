import React, {useState} from "react";
import { WeatherDay } from '../components/WeatherDay';

type BlockWeatherWeek = {
    arrayWeather: any
  }

export const BlockWeatherWeek: React.FC<BlockWeatherWeek> = ({arrayWeather}) => {

    const [indexstep, setStep] = useState(0);

    return(
        <div className="container">
        <div className="arrows"><img src="images/arrowLeft.png" onClick={() => { if (indexstep < arrayWeather.length - 1) setStep(indexstep + 1) }} /></div>
        <div className="containerWeather">
          {
            arrayWeather.map((item: any, index: number) => {
              if (index >= indexstep) {
                return (
                  <WeatherDay key={index} date={item.day} temp={item.temp} weather={item.weather} />
                )
              }
            })
          }
        </div>
        <div className="arrows"><img src="images/arrowRight.png" onClick={() => { if (indexstep >= 0) setStep(indexstep - 1) }} /></div>
      </div>
    )
}