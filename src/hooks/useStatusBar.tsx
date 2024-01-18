import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";

const useStatusBar = () => {
  useEffect(() => {
    changeStatusBar();
  }, []);

  const changeStatusBar = () => {
    if (Capacitor.isPluginAvailable("StatusBar")) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: "#ffffff" });
    }
  };
  return { changeStatusBar };
};

export const useStatusBarDark = () => {
  useEffect(() => {
    changeStatusBar();
  }, []);

  const changeStatusBar = () => {
    if (Capacitor.isPluginAvailable("StatusBar")) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "#000000" });
    }
  };
  return { changeStatusBar };
};
export default useStatusBar;
