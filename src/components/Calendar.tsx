import React from 'react';

type Calendar= {
  text: String
  getTime: any
  state: boolean
}

export const Calendar: React.FC<Calendar> = ({text, state, getTime}) => {

    const today = new Date();
    const dateOffsetFive = (24*60*60*1000) * 5; //5 days
    const dateOffsetOne = (24*60*60*1000); // 1 day
    const timestampMin = today.getTime() - dateOffsetFive;
    const timestampMax = today.getTime() - dateOffsetOne;
    const datePastMin = new Date(timestampMin);
    const datePastMax = new Date(timestampMax);

    const ddMin = datePastMin.getDate();
    const mmMin = datePastMin.getMonth()+1;
    const yyyyMin = datePastMin.getFullYear();

    const ddMax = datePastMax.getDate();
    const mmMax = datePastMax.getMonth()+1;
    const yyyyMax = datePastMax.getFullYear();

    const dateMin = `${yyyyMin}-${mmMin < 10 ? "0" + mmMin : mmMin}-${ddMin < 10 ? "0" + ddMin : ddMin}`;   
    const dateMax = `${yyyyMax}-${mmMax < 10 ? "0" + mmMax : mmMax}-${ddMax < 10 ? "0" + ddMax : ddMax}`;

    const classes: any = ["calendarText",  "default"];
    if (state) {
      let temp = classes.indexOf("default");
      classes.splice(temp, 1, "selected");
    }

  return (
    <div className="containerCalendar">
      <div className={classes.join(' ')}>{text}</div>
      <input className="styleIinput calendar" type="date" min={dateMin} max={dateMax} onChange={getTime} />
    </div>
  )
}