import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.bibine",
  appName: "Bibine",
  webDir: "dist",
  server: {
    androidScheme: "http", //"https"
    cleartext: true,
  },
  android: {
    backgroundColor: "#000000", // Set the color code here
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_logo_bibine",
      iconColor: "#174eb3",
      sound: "tututu.wav",
    },
  },
};

export default config;
