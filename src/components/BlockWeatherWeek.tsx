import React, { useState } from "react";
import { WeatherDay } from '../components/WeatherDay';

type BlockWeatherWeek = {
  arrayWeather: any
}

export const BlockWeatherWeek: React.FC<BlockWeatherWeek> = ({ arrayWeather }) => {

  const [indexstep, setStep] = useState(0);
  const classLeft: any = [];
  const classRight: any = [];
  const width = document.documentElement.clientWidth;

  if (indexstep == 0) {
    classRight.push("arrowsOpasity");
  } else if ((indexstep == 4 && width > 650) || (indexstep == 6 && width < 650)) {
    classLeft.push("arrowsOpasity");
  }

  const clickArrow = (e: any) => {
    let target = e.target;
    if (indexstep < arrayWeather.length - 1 && target.id === "left") {
      setStep(indexstep + 1)
    } else if (indexstep >= 0 && target.id === "right") {
      setStep(indexstep - 1)
    }
  }

  return (
    <div className="container">
      <div className="arrows"><img id="left" className={classLeft.join(' ')} src="images/arrowLeft.png" onClick={clickArrow} /></div>
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
      <div className="arrows"><img id="right" className={classRight.join(' ')} src="images/arrowRight.png" onClick={clickArrow} /></div>
    </div>
  )
}