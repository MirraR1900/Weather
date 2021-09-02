import React from 'react';

type SelectType = {
  cities: any[]
  obj: any
  getOption: any
  getValue: any
  getValuesPast?: any
}

export const Select: React.FC<SelectType> = ({ cities, obj, getOption, getValue, getValuesPast }) => {

  const classes: any = ["listCities"];
  const classesSelect:any = ["selectCities", "default"];

  if (!obj.state) {
    classes.push("visible")
  }

  if(obj.text !== "Select city") {
    let temp = classesSelect.indexOf("default");
    classesSelect.splice(temp, 1, "selected");
  }

  return (
    <div className="containerSelect">
      <div className="styleIinput" onClick={getOption.bind(this)} onChange={getValuesPast}>
        <label className={classesSelect.join(' ')}>{obj.text}</label>
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
