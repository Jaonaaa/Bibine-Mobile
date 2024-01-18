import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import ArrowRight from "../../assets/icons/ArrowRight";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import "./AnnonceSlider.sass";
import { useRef } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

interface AnnonceSliderProps {
  title: string;
  linkTo?: string;
  loadedContent?: boolean;
  context: string;
}

const AnnonceSlider = (annonces: AnnonceSliderProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const close = () => {
    modal.current?.dismiss();
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === "confirm") {
      console.log(ev.detail.data);
    }
  };

  return (
    <div className="annonce_slider_container">
      <div className="top">
        <div className="title"> {annonces.title}</div>
        <div className="linkto" id={`open-${annonces.context}`}>
          <div className="text">Voir plus</div>
          <ArrowRight />
        </div>
      </div>
      <div className="slider_content">
        {[...Array(5).keys()].map((v, i) => (
          <AnnonceBox key={i} loadedContent={annonces.loadedContent} id_annonce={i + ""} />
        ))}
      </div>

      {/* ///// */}
      <IonModal
        className="modal_content_more"
        ref={modal}
        trigger={`open-${annonces.context}`}
        initialBreakpoint={1}
        breakpoints={[0, 0.45, 1]}
        onWillDismiss={onWillDismiss}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title_modal_content">{annonces.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen>
          {[...Array(5).keys()].map((v, i) => (
            <div key={i}>
              <AnnonceBox callback={close} key={i} loadedContent={annonces.loadedContent} id_annonce={i + ""} />
              <hr />
            </div>
          ))}
        </IonContent>
      </IonModal>
    </div>
  );
};

export default AnnonceSlider;
