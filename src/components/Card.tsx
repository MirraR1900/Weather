import React, { useState } from 'react';
import { Select } from '../components/Select';
import { Calendar } from '../components/Calendar';
import { WeatherDay } from '../components/WeatherDay';
type CardType = {
  title: String
  time: Boolean
}

export const Card: React.FC<CardType> = ({ title, time }) => {
  let value: string;
  let array: any = [];
  const urlWeather = 'https://api.openweathermap.org/data/2.5/onecall';

  const cities: any = [
    { name: "Samara", lat: 53.195873, lon: 50.100193 },
    { name: "Tolyatti", lat: 53.507836, lon: 49.420393 },
    { name: "Saratov", lat: 51.533557, lon: 46.034257 },
    { name: "Kazan", lat: 55.796127, lon: 49.106405 },
    { name: "Krasnodar ", lat: 45.035470, lon: 38.975313 }
  ];

  const months = ["January", "February", "March", "April", "May", "June ", "July", "August", "September", "October", "November", "December"];

  const [arr, setArray] = useState([]);

  const select: any = {
    text: "Select city",
    image: "../images/down.png",
    state: true
  }
  const [obj, setText] = useState(select);

  const getOption = () => {
    if (obj.state) {
      setText({ ...select, image: "../images/up.png", state: false })
    } else {
      setText({ ...select, image: "../images/down.png", state: true })
    }
  }

  const getValues = async (e: any) => {
    let target = e.target;
    let lat = target.getAttribute("data-lat");
    let lon = target.getAttribute("data-lon");
    if (target.tagName == 'LI') {
      value = target.textContent;
      setText({ ...select, text: value })
    }
    
    const api = await fetch(urlWeather + '?lat=' + lat + '&lon=' + lon + '&exclude=current,minutely,hourly&units=metric&cnt=7&appid=b7ffe509c620c29c32fabe4bb2890f00')
    const data = await api.json();
    data.daily.forEach((item: any) => {
      let date = new Date(item.dt * 1000);
      let setDate = ` ${date.getDate()} ${months[date.getMonth()]} ${date.getUTCFullYear()}`;
      if (array.length < 7) {
        array.push({
          day: setDate,
          temp: item.temp.day
        })
      }
    })

    setArray(array);
  }

  const present = <Select cities={cities} obj={obj} getOption={getOption} getValue={getValues} />
  const past = <><Select cities={cities} obj={obj} getOption={getOption} getValue={getValues} /><Calendar /></>

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="containerInputs">
        {time ? present : past}
      </div>
      {
        arr.length ?
          <div className="container">
            <div className="arrows"><img src="images/arrowLeft.png" /></div>
            <div className="containerWeather">
              {arr.map((item: any, index: number) => {
                return (
                  <WeatherDay key={index} date={item.day} temp={item.temp} />
                )
              })}
            </div>
            <div className="arrows"><img src="images/arrowRight.png" /></div>
          </div>
          :
          <div className="containerPlacholder">
            <img className="cloud" src="images/cloud.svg" alt="cloud" />
            <p>Fill in all the fields and the weather will be displayed</p>
          </div>
      }
    </div>
  )
}