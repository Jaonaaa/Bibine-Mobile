import { useIonRouter } from "@ionic/react";
import { useEffect } from "react";
import { App } from "@capacitor/app";

const useExit = () => {
  const ionRouter = useIonRouter();
  useEffect(() => {
    document.addEventListener("ionBackButton", (ev: any) => {
      ev.detail.register(-1, () => {
        if (!ionRouter.canGoBack()) {
          App.exitApp();
        }
      });
    });
  }, []);

  return {};
};

export default useExit;
