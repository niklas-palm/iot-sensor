import React from "react";

import "./sensorCard.scss";
export const SensorCard = ({ sensor }) => {
  return (
    <div className="SensorCardWrapper">
      <h2>
        <span style={{ color: "white" }}>Value: </span>
        {sensor.sensorValue}
      </h2>
      <h3>
        <span style={{ color: "white" }}>ID: </span>
        {sensor.SensorId}
      </h3>
      <h3>
        <span style={{ color: "white" }}>Location: </span>
        {sensor.sensorLocation}
      </h3>
    </div>
  );
};
