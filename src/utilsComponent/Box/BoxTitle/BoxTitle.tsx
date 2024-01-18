import React from "react";
import "./BoxTitle.sass";

interface BoxTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: any;
  title?: string;
}

const BoxTitle = (props: BoxTitleProps) => {
  return (
    <div className={`container_box_title ${props.className}`} style={props.style}>
      <div className="title">{props.title}</div>
      <div className="box_container">{props.children}</div>
    </div>
  );
};

export default BoxTitle;
