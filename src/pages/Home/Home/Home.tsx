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

import "./Home.sass";
import useUserConnectivity from "../../../hooks/useUserConnectivity";
import OfflineIndicator from "../../../components/OfflineIndicator/OfflineIndicator";

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
  {
    tag: "IDK",
  },
  {
    tag: "Test",
  },
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(categories[0].tag);
  const [loadedContent, setLoadedConted] = useState(false);
  const { connected, notifs } = useUserConnectivity(true);

  const handleContentLoaded = () => {
    setLoadedConted(false);
    setTimeout(() => {
      setLoadedConted(true);
    }, 2000);
  };

  const handleTab = (tag: string) => {
    setActiveTab(tag);
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  useEffect(() => {
    handleContentLoaded();
  }, [activeTab]);

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
                <div className="chip" key={index} onClick={handleContentLoaded}>
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

        <AnnonceSlider loadedContent={loadedContent} title="Nouveautés" context="news" />
        <AnnonceSlider loadedContent={loadedContent} title="Meilleurs ventes" context="bestSellers" />
        <AnnonceSlider loadedContent={loadedContent} title="Populaire" context="popular" />
        <AnnonceInfinity loadedContent={loadedContent} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
