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
import "./Home.sass";

const categories = [
  {
    tag: "Tous",
  },
  {
    tag: "Sport",
  },
  {
    tag: "Plaisir",
  },
  // {
  //   tag: "IDK",
  // },
  // {
  //   tag: "Test",
  // },
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(categories[0].tag);
  const { connected, notifs } = useUserConnectivity(true);

  const handleTab = (tag: string) => {
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
              {categories.map((category, index) => (
                <div className="chip" key={index}>
                  <IonChip
                    className={category.tag === activeTab ? "active-chip" : ""}
                    onClick={() => {
                      handleTab(category.tag);
                    }}
                    outline
                  >
                    {category.tag}
                  </IonChip>
                </div>
              ))}
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

        <AnnonceSlider title="Nouveautés" context="news" category={activeTab} />
        <AnnonceSlider title="Meilleurs ventes" context="bestSellers" category={activeTab} />
        <AnnonceSlider title="Populaire" context="popular" category={activeTab} />
        <AnnonceInfinity category={activeTab} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
