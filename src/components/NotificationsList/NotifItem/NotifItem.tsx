import React from "react";
import { URL_message } from "../../../utils/Alaivo";
import { storage } from "../../../data/storage";
import "./NotifItem.sass";

export interface Notif {
  content: string;
  date: string;
  id: string;
  picturePath: string;
  receiverEmail: string;
  senderId: string;
  senderName: string;
}
interface NotifItemProps {
  data?: Notif;
  read?: boolean;
  template?: boolean;
}

function formatCustomDate(inputDate: string) {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} à ${hours}:${minutes}`;
}

const NotifItem = (props: NotifItemProps) => {
  const { data, template } = props;
  return (
    <>
      {template ? (
        <>
          <div className={`item_notif ${props.read ? "" : "unread"}`}>
            <div className="avatar">
              <div className="picture skeleton"></div>
              <div className="icon_categorie"></div>
            </div>
            <div className="details_notifs">
              <p className="title skeleton long">
                <span className="username">{data?.senderName}</span>
              </p>

              <p className="action skeleton action-long">{data?.content}</p>
              <p className="action skeleton action-long-semi">{data?.content}</p>

              <div className="time skeleton skeleton-time "> 21/01/23 à 19:45</div>
            </div>
          </div>{" "}
        </>
      ) : (
        <div
          className={`item_notif ${props.read ? "" : "unread"}`}
          onClick={() => {
            window.location.href = URL_message + "message/my-profile/" + localStorage.getItem(storage.token);
          }}
        >
          <div className="avatar">
            <div className="picture">{data?.picturePath ? <img src={data?.picturePath} alt="avatar" /> : "   Je"}</div>
            <div className="icon_categorie"></div>
          </div>
          <div className="details_notifs">
            <p className="title">
              <span className="username">{data?.senderName}</span>
              vous à envoyé une message
            </p>
            <p className="action">{data?.content}</p>
            <div className="time"> {data?.date ? formatCustomDate(data?.date) : "---"}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotifItem;
