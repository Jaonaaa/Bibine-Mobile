import { useEffect, useState } from "react";
import Notifs from "./Notifs";
import { getUid } from "../../utils/Uid";

export const useNotifs = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let containerNotif = document.getElementById("notifs_container");
    if (containerNotif == null) {
      containerNotif = document.createElement("div");
      containerNotif.setAttribute("id", "notifs_container");
    }
    document.body.prepend(containerNotif);
    setLoaded(true);
  }, []);

  return { loaded };
};

export const useMyNotifs = () => {
  const [notifs, setNotifs] = useState<any[]>([]);

  const addNotifs = (
    status: "OK" | "warning" | "info" | "error" | "succes" | "star",
    details: string,
    timer: number
  ) => {
    setNotifs([...notifs, <Notifs key={getUid()} notif={{ status: status, details: details, timer: timer }} />]);
  };
  const showRandomNotif = () => {
    const status = ["OK", "warning", "info", "error", "succes", "star"];
    const words = [
      "I'm ok",
      "Worryy (╬▔皿▔)╯",
      "Hey I got some news !",
      "Danger danger (ㆆ_ㆆ)",
      "GG dude , nice one (～￣▽￣)～",
      " Star boyy (￣y▽￣)╭ Ohohoho.....",
    ];
    let index = Math.floor(Math.random() * status.length);
    setNotifs([
      ...notifs,
      <Notifs key={getUid()} notif={{ status: status[index], details: words[index], timer: 10000 }} />,
    ]);
  };

  return { showRandomNotif, notifs, addNotifs };
};
export default useMyNotifs;
