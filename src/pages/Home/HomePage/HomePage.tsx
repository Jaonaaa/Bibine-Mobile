import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import Home from "../Home/Home";
import Search from "../Search/Search";
import SideMenu from "../../../components/SideMenu/SideMenu";
import useStatusBar from "../../../hooks/useStatusBar";

import AnnonceDetails from "../../../components/AnnonceDetails/AnnonceDetails";
import useViewPort from "../../../hooks/useViewPort";
import useExit from "../../../hooks/useExit";
import { paths, pathsSideMenu } from "./PathsHome";
import useNotification from "../../../hooks/useNotifications";
import useUserTime from "../../../hooks/useUserTime";

import "./HomePage.sass";
import DevPage from "../../../components/Parameter/DevPage/DevPage";
import AchatAnnonce from "../../../components/AchatAnnonce/AchatAnnonce";

interface HomePageProps {
  sendingMessage: Function;
}
const HomePage = (props: HomePageProps) => {
  useExit();
  const { closeFirstTime } = useUserTime();
  const { changeStatusBar } = useStatusBar();
  const { scheduleNow, askPermission } = useNotification();

  const { md } = useViewPort();
  useEffect(() => {
    closeFirstTime();
    setTimeout(() => {
      askPermission(() => {
        scheduleNow(
          "Bienvenue chez Bibine !! ⚡",
          `Toute l'équipe de Bibine vous accueille chaleureusement et espère que vous trouverez ce que vous recherchez chez nous :) 
            `,
          11,
          "first_time"
        );
      });
    }, 1000);

    setTimeout(() => {
      changeStatusBar();
    }, 750);
  }, []);

  const isTabSelected = (tab: string) => {
    return window.location.pathname === tab;
  };

  return (
    <>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <SideMenu paths={pathsSideMenu} />
        </IonMenu>
        <div className="ion-page page_home" id="main">
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/main/home" component={Home} exact />
              <Route path="/main/search" component={Search} exact />
              <Route path="/main/parameter/devs" component={DevPage} />

              {pathsSideMenu.map((path, index) => {
                return path.pageIn ? (
                  <Route key={index} path={path.path} component={path.component} exact />
                ) : (
                  <Route path="/main/home" key={index} component={Home} exact />
                );
              })}
              <Route path="/main/annonce/:id" component={AnnonceDetails} exact />
              <Route path="/main/annonce/achat/:id" component={AchatAnnonce} exact />

              <Redirect exact from="/main" to="/main/home" />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className={md ? "tab_bar" : " tab_bar_on"}>
              {paths.map((path, index) => (
                <IonTabButton
                  key={index}
                  tab={path.page}
                  href={path.path}
                  className={`${isTabSelected(path.path) ? "selected" : "tab_nav"}`}
                  selected={isTabSelected(path.path)}
                >
                  <IonIcon className="tab_icon" icon={isTabSelected(path.path) ? path.iconFilled : path.iconOutline} />
                  <IonLabel className="tab_label"> {path.page}</IonLabel>
                </IonTabButton>
              ))}
            </IonTabBar>
          </IonTabs>
        </div>
      </IonSplitPane>
    </>
  );
};

export default HomePage;
