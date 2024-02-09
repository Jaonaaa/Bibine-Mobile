import React, { MouseEventHandler } from "react";
import ArrowSwipeRight from "../../../assets/icons/ArrowSwipeRight";
import "./ParamRow.sass";

interface ParamRowProps {
  type: "clickable" | "toogler";
  callback?: MouseEventHandler<HTMLDivElement>;
  component: React.ReactNode;
  label: string;
  default?: Boolean;
}
const ParamRow: React.FC<ParamRowProps> = (props) => {
  const { type, callback, component, label } = props;

  return (
    <div className="param_row_container" onClick={type === "clickable" ? callback : () => {}}>
      <div className="left">
        <div className="label"> {label} </div>
      </div>
      <div className={`right ${type === "clickable" ? "space" : ""}`}>
        {type === "clickable" ? <ArrowSwipeRight /> : component}
      </div>
    </div>
  );
};

export default ParamRow;
