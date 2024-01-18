import { useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Chez from "../../../assets/img/Chez.png";
import SplashBg from "../../../assets/icons/SplashBg";
import Logo from "../../../assets/icons/Logo";

import useStatusBar from "../../../hooks/useStatusBar";

import useExit from "../../../hooks/useExit";
import useNav from "../../../hooks/useNav";
import useUserTime from "../../../hooks/useUserTime";
import "./Welcome.sass";

const Welcome = () => {
  useExit();
  const { log } = useUserTime();
  const { changeStatusBar } = useStatusBar();
  const { to } = useNav();

  useEffect(() => {
    setTimeout(() => {
      changeStatusBar();
    }, 500);
    log();
  }, [window.location.pathname]);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="welcome_content">
          <div className="splash">
            <div className="splash_bg">
              <div className="text">
                Bienvenue
                <div className="chez">
                  <img src={Chez} alt="chez" />
                </div>
              </div>
              <SplashBg />
            </div>
          </div>
          <div className="logo">
            <Logo />
          </div>
          <div className="desc">
            Explorez l'excellence automobile avec notre sélection de voitures d'occasion de qualité.
          </div>
          <div
            className="btn_long"
            onClick={() => {
              to("/main/home");
            }}
          >
            <button>Continuer</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
