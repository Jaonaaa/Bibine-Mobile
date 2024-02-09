import { StatusBar, Style } from "@capacitor/status-bar";
import { dark, light } from "./ThemeData";
import { Capacitor } from "@capacitor/core";

export const switchTheme = (ThemeName: string) => {
  const theme = getTheme(ThemeName);
  if (theme === undefined) return;
  changeStatus(ThemeName);
  document.documentElement.classList.remove(getTheme(getCurrentThemeName()));
  document.documentElement.classList.add(theme);
  saveTheme(ThemeName);
};

const saveTheme = (themeName: string) => {
  localStorage.setItem("theme_user", themeName);
};

export const useDefaultTheme = () => {
  let themeName = localStorage.getItem("theme_user");
  if (themeName === null) switchTheme("light");
  else switchTheme(themeName);
};

const getTheme = (themeName: string) => {
  if (themeName === "dark") return dark;
  if (themeName === "light") return light;
  else return "light";
};

export const getCurrentThemeName = (): string => {
  return localStorage.getItem("theme_user") || "unknow";
};

const changeStatus = (theme: string) => {
  if (Capacitor.isPluginAvailable("StatusBar")) {
    if (theme === "light") {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: "#ffffff" });
    } else if (theme === "dark") {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "#0f0f10" });
    }
  }
};
