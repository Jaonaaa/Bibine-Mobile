import React from "react";
import "./NotifItem.sass";

interface NotifItemProps {
  data?: any;
  read?: boolean;
}
const NotifItem = (props: NotifItemProps) => {
  return (
    <div className={`item_notif ${props.read ? "" : "unread"}`}>
      <div className="avatar">
        <div className="picture">Je</div>
        <div className="icon_categorie"></div>
      </div>
      <div className="details_notifs">
        <p className="title">
          <span className="username">Jean Mark</span>
          vous à envoyé une message
        </p>
        <p className="action">
          Salame o ! Otrin kay ny tena vidiny farany anleh Audi T38-R semi-auto anreo io azafady .
        </p>
        <div className="time"> 21/01/23 à 19:45</div>
      </div>
    </div>
  );
};

export default NotifItem;
