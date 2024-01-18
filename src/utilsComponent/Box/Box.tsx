import React from "react";
import "./Box.sass";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  style?: any;
}
const Box = (props: BoxProps) => {
  return (
    <div className={`box_container ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Box;
