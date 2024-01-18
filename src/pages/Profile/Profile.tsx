import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";
import ProfileUser from "../../components/ProfileUser/ProfileUser";
import AnnonceDetailsUser from "../../components/AnnonceDetailsUser/AnnonceDetailsUser";
import MySolde from "../../components/ProfileUser/MySolde/MySolde";
import Historique from "../../components/ProfileUser/Historique/Historique";

const Profile = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path="/profile/me" component={ProfileUser} exact />
        <Route path="/profile/annonce/:id" component={AnnonceDetailsUser} exact />
        <Route path="/profile/me/wallet" component={MySolde} exact />
        <Route path="/profile/me/histo" component={Historique} exact />
        <Redirect exact from="/profile" to="/profile/me" />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Profile;
