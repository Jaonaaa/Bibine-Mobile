import React, { MouseEventHandler } from "react";
import "./ButtonCartoon.sass";

interface ButtonCartoonProps {
  text: string;
  callback: Function;
  icon?: React.ReactNode;
  className?: string;
}
() => {};

const ButtonCartoon = (props: ButtonCartoonProps) => {
  const { callback, text, icon, className } = props;
  return (
    <button className={`learn-more ${className}`} onClick={callback as MouseEventHandler<HTMLButtonElement>}>
      <div className={`text ${icon ? "slide_left" : ""}`}>{text}</div>
      {icon ? icon : ""}
    </button>
  );
};

export default ButtonCartoon;
