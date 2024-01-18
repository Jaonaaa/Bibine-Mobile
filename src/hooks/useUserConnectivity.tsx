import { useEffect, useState } from "react";
import useMyNotifs from "../utilsComponent/Notif/useNotifs";
import { Network } from "@capacitor/network";
import { storage } from "../data/storage";

const useUserConnectivity = (notified: boolean) => {
  const { addNotifs, notifs } = useMyNotifs();
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    detect();
    return () => {
      undetect;
    };
  }, []);

  useEffect(() => {
    logCurrentNetworkStatus();
  }, []);

  const setOffline = () => {
    window.localStorage.setItem(storage.connectivity, "offline");
    setConnected(false);
  };
  const setOnline = () => {
    window.localStorage.setItem(storage.connectivity, "online");
    setConnected(true);
  };

  const detect = () => {
    Network.addListener("networkStatusChange", detectFunc);
  };

  const undetect = () => Network.removeAllListeners();

  const detectFunc = (status: any) => {
    if (status.connected) {
      if (notified) {
        if (localStorage.getItem(storage.connectivity) === "offline") {
          addNotifs("info", "Connection restaurée", 2500);
        }
      }
      setOnline();
    } else {
      if (notified) {
        addNotifs("info", "Vous êtes maintenant en mode hors-ligne", 2500);
      }
      setOffline();
    }
  };

  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    if (!status.connected) {
      setConnected(false);
      setOffline();
    } else {
      setConnected(true);
      setOnline();
    }
  };

  return { notifs, connected, addNotifs };
};

export default useUserConnectivity;
