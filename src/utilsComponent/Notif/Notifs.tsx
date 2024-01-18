import React from "react";
import ReactDOM from "react-dom";
import NotifRow from "./NotifRow";
import "./Notifs.sass";
import { useNotifs } from "./useNotifs";

interface NotifsProps {
  notif: any;
}
const Notifs = (props: NotifsProps) => {
  const { notif } = props;
  const { loaded } = useNotifs();

  const status =
    (notif.status + "").toLowerCase() === "ok" || (notif.status + "").toLowerCase() === "good"
      ? "succes"
      : (notif.status + "").toLowerCase();
  return (
    <>
      {loaded &&
        ReactDOM.createPortal(
          <NotifRow
            notif={{
              status: status,
              body: notif.details,
            }}
            timer={notif.timer}
          />,
          document.getElementById("notifs_container") as Element | DocumentFragment
        )}
    </>
  );
};

export default Notifs;
