import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import ArrowRight from "../../assets/icons/ArrowRight";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import "./AnnonceSlider.sass";
import { useEffect, useRef, useState } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { AnnonceData } from "../../data/Types";
import { alaivoGet } from "../../utils/Alaivo";

interface AnnonceSliderProps {
  title: string;
  linkTo?: string;
  loadedContent?: boolean;
  context: string;
  category?: string;
}

const AnnonceSlider = (props: AnnonceSliderProps) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { annonces, load, getAnnonces } = useGetData();

  const close = () => {
    modal.current?.dismiss();
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === "confirm") {
      console.log(ev.detail.data);
    }
  };

  useEffect(() => {
    getAnnonces();
  }, [props.category]);

  return (
    <div className="annonce_slider_container">
      <div className="top">
        <div className="title"> {props.title}</div>
        <div className="linkto" id={`open-${props.context}`}>
          <div className="text">Voir plus</div>
          <ArrowRight />
        </div>
      </div>
      <div className="slider_content">
        {!load
          ? [...Array(5).keys()].map((k, index) => <AnnonceBox key={index} loadedContent={load} />)
          : annonces.map((k, index) => <AnnonceBox {...k} key={index} loadedContent={load} />)}
      </div>
      {/* ///// */}
      <IonModal
        className="modal_content_more"
        ref={modal}
        trigger={`open-${props.context}`}
        initialBreakpoint={1}
        breakpoints={[0, 0.45, 1]}
        onWillDismiss={onWillDismiss}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title_modal_content">{props.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen>
          {!load
            ? [...Array(5).keys()].map((k, index) => (
                <div key={index}>
                  <AnnonceBox
                    callback={close}
                    key={index}
                    loadedContent={props.loadedContent}
                    id_annonce={index + ""}
                  />
                  <hr />
                </div>
              ))
            : annonces.map((k, index) => (
                <div key={index}>
                  <AnnonceBox {...k} key={index} loadedContent={load} />
                  <hr />
                </div>
              ))}
        </IonContent>
      </IonModal>
    </div>
  );
};

const useGetData = () => {
  const [annonces, setAnnonces] = useState<AnnonceData[]>([]);
  const [load, setLoaded] = useState(false);

  useEffect(() => {
    getAnnonces();
  }, []);

  const getAnnonces = async () => {
    setLoaded(false);
    let res = (await alaivoGet("bibine/actu/annonces", null, true)) as any;
    setLoaded(true);
    let annocs = res.data as AnnonceData[];
    setAnnonces(annocs);
  };

  return { annonces, load, getAnnonces };
};

export default AnnonceSlider;
