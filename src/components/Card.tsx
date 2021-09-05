import React, { useState } from 'react';
import { Select } from '../components/Select';
import { Calendar } from '../components/Calendar';
import { ContainerPlacholder } from '../components/ContainerPlacholder';
import { BlockWeatherWeek } from '../components/BlockWeatherWeek';
import { BlockWeatherPast } from '../components/BlockWeatherPast';

type CardType = {
  title: String
  time: Boolean
}

// The values for the variables are taken from two different select. 
let lat = "";
let lon = "";
let timeValue = "";

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

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June ", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const calendar = {
    text: "Selected date",
    state: false
  }

  const select: any = {
    text: "Select city",
    image: "../images/down.png",
    state: true
  }

  const [arrayState, setArray] = useState([]);
  const [calendarState, setDate] = useState(calendar);
  const [selectState , setText] = useState(select);
  const [weatherState, setObj] = useState({});

  const getLocation = (e: any) => {
    let target = e.target;
    if (target.tagName == 'LI') {
      lat = target.getAttribute("data-lat");
      lon = target.getAttribute("data-lon");

      value = target.textContent;
      setText({ ...select, text: value })
    }
    getValuesPast();
  }

  const getOption = () => {
    if (selectState.state) {
      setText({ ...select, image: "../images/up.png", state: false })
    } else {
      setText({ ...select, image: "../images/down.png", state: true })
    }
  }

  const getTime = (e: any) => {
    let target = e.target;
    let strDate;

    if (target.type == 'date') {
      let time = target;
      timeValue = time.valueAsDate;
      strDate = time.valueAsDate;
    }
    let day = strDate.getDate();
    let monthsDate = strDate.getMonth()+1;

    let date = `${day < 10 ? "0" + day : day} / ${monthsDate < 10 ? "0" + monthsDate : monthsDate} / ${strDate.getFullYear()}`;
    setDate({text: date, state: true});
    getValuesPast();
  }

  const getValuesPresent = async (e: any) => {
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
      if (array.length < 7) {   // comes an array with length 8 
        array.push({
          day: setDate,
          temp: Math.round(item.temp.day),
          weather: item.weather[0]
        })
      }
    })

    setArray(array);
  }

  const getValuesPast = async () => {
    let datePast = Math.round(new Date(timeValue).getTime() / 1000);

    if (lat && lon && timeValue) {
      const api = await fetch(`${urlWeather}/timemachine?lat=${lat}&lon=${lon}&dt=${datePast}&appid=b7ffe509c620c29c32fabe4bb2890f00`)
      const data = await api.json();
      let date = new Date(data.current.dt * 1000);
      let setDate = ` ${date.getDate()} ${months[date.getMonth()]} ${date.getUTCFullYear()}`;
      let temp = Math.round(data.current.temp - 273.15);
      let weatherPast = {
        day: setDate,
        temp: temp,
        weather: data.current.weather[0]
      }
      setObj(weatherPast);      
    }

  }

  const present = <Select cities={cities} obj={selectState} getOption={getOption} getValue={getValuesPresent} />
  const past = <><Select cities={cities} obj={selectState} getOption={getOption} getValue={getLocation} getValuesPast={getValuesPast} /><Calendar text={calendarState.text} state={calendarState.state} getTime={getTime} /></>

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="containerInputs">
        {time ? present : past}
      </div>
      {time ?
        arrayState.length ?
          <BlockWeatherWeek arrayWeather={arrayState} />
          :
          <ContainerPlacholder />
        :
        Object.keys(weatherState).length  ?
          <BlockWeatherPast objectWeather={weatherState} />
          :
          <ContainerPlacholder />
      }
    </div>
  )
}