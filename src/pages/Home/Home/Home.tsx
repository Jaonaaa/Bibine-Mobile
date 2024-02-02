import {
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import AvatarToogler from "../AvatarToogler/AvatarToogler";
import AnnonceSlider from "../../../components/AnnonceSlider/AnnonceSlider";
import { useEffect, useState } from "react";
import AnnonceInfinity from "../../../components/AnnonceInfinity/AnnonceInfinity";
import useUserConnectivity from "../../../hooks/useUserConnectivity";
import OfflineIndicator from "../../../components/OfflineIndicator/OfflineIndicator";
import Loader from "../../../components/Loader/Loader";
import { alaivoGet } from "../../../utils/Alaivo";
import { capitalizeFirstLetter } from "../../../utils/Format";
import "./Home.sass";

const types_predef = [
  {
    id: "*",
    nom: "Tous",
  },
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<any>(types_predef[0]);
  const { connected, notifs } = useUserConnectivity(true);
  const { types, loaded } = useGetData();

  const handleTab = (tag: any) => {
    setActiveTab(tag);
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <AvatarToogler />
          </IonButtons>
          <IonTitle className="title_bar">
            <div className="filter_annonce">
              <div className="chip">
                <IonChip
                  className={types_predef[0].id === activeTab.id ? "active-chip" : ""}
                  onClick={() => {
                    handleTab(types_predef[0]);
                  }}
                  outline
                >
                  {types_predef[0].nom}
                </IonChip>
              </div>
              {loaded ? (
                types.map((type, index) => (
                  <div className="chip" key={index}>
                    <IonChip
                      className={type.id === activeTab.id ? "active-chip" : ""}
                      onClick={() => {
                        handleTab(type);
                      }}
                      outline
                    >
                      {capitalizeFirstLetter(type.nom)}
                    </IonChip>
                  </div>
                ))
              ) : (
                <div className="loading_menu">
                  <Loader size="2rem" weigth="4px" />
                </div>
              )}
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <hr />
      <IonContent fullscreen className="padding">
        {!connected ? <OfflineIndicator /> : ""}
        {notifs.map((notif) => notif)}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {activeTab.id === "*" ? (
          <>
            <AnnonceSlider title="Nouveautés" context="news" />
            <AnnonceSlider title="Populaire" context="popular" />
          </>
        ) : (
          ""
        )}
        <AnnonceInfinity category={activeTab} />
      </IonContent>
    </IonPage>
  );
};

const useGetData = () => {
  const [types, setTypes] = useState<any[]>([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    getAllTypes();
  }, []);

  const getAllTypes = async () => {
    setloaded(false);
    let res = (await alaivoGet("bibine/actu/types", null, true)) as any;
    setloaded(true);
    setTypes(res.data);
  };
  return { types, loaded };
};

export default Home;
