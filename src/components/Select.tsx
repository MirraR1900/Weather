import React from 'react';

type SelectType = {
  cities: any[]
  obj: any
  getOption: any
  getValue: any
}

export const Select: React.FC<SelectType> = ({ cities, obj, getOption, getValue }) => {

  const classes: any = ["listCities"];

  if (!obj.state) {
    classes.push("visible")
  }

  return (
    <div className="containerSelect">
      <div className="styleIinput" onClick={getOption.bind(this)}>
        <label className="selectCities">{obj.text}</label>
        <img className="arrow" src={obj.image} />
      </div>
      <div className={classes.join(' ')}>
        <ul className="list" onClick={getValue}>
          {
            cities.map((item: any, index: number) => {
              return <li key={index} data-lat={item.lat} data-lon={item.lon}>{item.name}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
