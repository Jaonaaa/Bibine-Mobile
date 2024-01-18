import { Redirect, Route } from "react-router-dom";
import { useEffect } from "react";
import useConnectServer from "./utils/useConnectServer";

import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Welcome from "./pages/Splash/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import HomePage from "./pages/Home/HomePage/HomePage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./theme/App.sass";
import "./index.css";

setupIonicReact();

const App: React.FC = () => {
  const { connect } = useConnectServer();

  useEffect(() => {
    connect();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/main" component={HomePage}></Route>
          <Route path="/splash" component={Welcome} />
          <Route path="/log" component={Login} />
          <Route path="/profile" component={Profile} />
          <Redirect exact from="/" to="/splash" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
