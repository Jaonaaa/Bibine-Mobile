import { useEffect } from "react";
import FormSignIn from "./FormSignIn/FormSignIn";
import FormSignUp from "./FormSignUp/FormSignUp";
import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";
import useStatusBar from "../../hooks/useStatusBar";
import { useDefaultTheme } from "../../theme/Theme";
import "./Login.sass";

const Login = () => {
  const { changeStatusBar } = useStatusBar();
  useEffect(() => {
    changeStatusBar();
    useDefaultTheme();
  }, []);
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path="/log/in" component={FormSignIn} exact />
        <Route path="/log/up" component={FormSignUp} exact />
        <Redirect exact from="/log" to="/log/in" />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Login;
