import React from "react";
import './scss/app.scss';
import { Card } from './components/Card';



const App: React.FC = () => {

  return (
    <div className="wrapper">
      <h1>Weather forecast</h1>
      <div className="layout">
        <Card title="7 Days Forecast" time={true} />
        <Card title="Forecast for a Date in the Past" time={false} />
      </div>
    </div>
  )
};

export default App;