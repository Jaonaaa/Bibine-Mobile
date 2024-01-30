import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import AvatarToogler from "../AvatarToogler/AvatarToogler";
import SearchBar from "../../../components/SearchBar/SearchBar";
import SearchBlockIcon from "../../../assets/icons/SearchBlockIcon";
import useUserConnectivity from "../../../hooks/useUserConnectivity";
import OfflineIndicator from "../../../components/OfflineIndicator/OfflineIndicator";

import "./Search.sass";
import Loader from "../../../components/Loader/Loader";
import SearchResult from "../../../components/SearchResult/SearchResult";

const Search: React.FC = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [res, setRes] = useState(null);
  const { connected, notifs } = useUserConnectivity(false);
  const [annoncesResult, setAnnoncesResult] = useState([]);
  const [fecthing, setFectching] = useState(false);

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
          <>
            <SearchBar
              hideHeader={handleHeader}
              setFetching={setFectching}
              addAnnonces={setAnnoncesResult}
              focusedHeader={hideHeader}
            />
            <div
              className="blurer"
              onClick={() => {
                setHideHeader(false);
              }}
            ></div>

            {fecthing ? (
              <div className="container_search_loader">
                <Loader />
              </div>
            ) : annoncesResult.length > 0 ? (
              <SearchResult annonces={annoncesResult} />
            ) : (
              <div className="block_search_icon">
                <SearchBlockIcon />
                <div className="text">Rechercher la voiture qui vous définis.</div>
              </div>
            )}
          </>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
