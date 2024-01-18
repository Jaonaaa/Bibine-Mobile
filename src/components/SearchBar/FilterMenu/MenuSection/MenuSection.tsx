import React from "react";
import "./MenuSection.sass";

interface MenuSection {
  title?: string;
  children?: React.ReactNode;
}

const MenuSection = (props: MenuSection) => {
  return (
    <div className="menu_section">
      <div className="title_section">{props.title}</div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default MenuSection;
