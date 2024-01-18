import React from "react";
import "./List.sass";

interface item {
  label: string;
  value: string;
}
interface ListProps {
  data?: item[];
}
const List = (props: ListProps) => {
  return (
    <div className="list">
      <div className="row">
        <div className="label">DISPLACEMENT</div>
        <div className="value"> 6498.5 cm³ (396.6 cu in)</div>
      </div>
      <div className="row">
        <div className="label">TOP SPEED</div>
        <div className="value"> {">"}350 km/h</div>
      </div>{" "}
      <div className="row">
        <div className="label">POWER CONSUMPTION COMBINED </div>
        <div className="value"> 78,1 kWh/100 Km (WLTP)</div>
      </div>
      <div className="row">
        <div className="label">ACCELERATION 0-100 KM/H (0-62 MPH)</div>
        <div className="value">2.5 s</div>
      </div>
    </div>
  );
};

export default List;
