import React from 'react';

type Calendar= {
  getTime: any
  getValuesPast: any

}

export const Calendar: React.FC<Calendar> = ({getTime, getValuesPast}) => {
  return (
    <div className="containerCalendar">
      <input className="styleIinput" type="date" onChange={getTime}  />
    </div>
  )
}