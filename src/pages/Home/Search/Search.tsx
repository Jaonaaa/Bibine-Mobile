import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import AvatarToogler from "../AvatarToogler/AvatarToogler";
import SearchBar from "../../../components/SearchBar/SearchBar";
import SearchBlockIcon from "../../../assets/icons/SearchBlockIcon";
import useUserConnectivity from "../../../hooks/useUserConnectivity";
import OfflineIndicator from "../../../components/OfflineIndicator/OfflineIndicator";

import "./Search.sass";

const Search: React.FC = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [res, setRes] = useState(null);
  const { connected, notifs } = useUserConnectivity(false);

  const handleHeader = (state: boolean) => {
    setHideHeader(state);
    return {};
  };

  return (
    <IonPage>
      {!connected ? <OfflineIndicator /> : ""}
      {notifs.map((notif) => notif)}
      <IonHeader className={`header_search ${hideHeader ? "header_search_hidden" : ""}`}>
        <IonToolbar>
          <IonButtons slot="start">
            <AvatarToogler />
          </IonButtons>
          <IonTitle>Recherche</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="search_content">
          {!res ? (
            <>
              <SearchBar hideHeader={handleHeader} focusedHeader={hideHeader} />
              <div
                className="blurer"
                onClick={() => {
                  setHideHeader(false);
                }}
              ></div>
              <div className="block_search_icon">
                <SearchBlockIcon />
                <div className="text">Rechercher la voiture qui vous définis.</div>
              </div>
            </>
          ) : (
            <>
              <div className="block"></div>
              <div className="block"></div>
              <div className="block"></div>
              <div className="block"></div>
              <div className="block"></div>
              <div className="block"></div>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
