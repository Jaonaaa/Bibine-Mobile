import { IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import ArrowRight from "../../assets/icons/ArrowRight";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import { useEffect, useRef, useState } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { AnnonceData } from "../../data/Types";
import { alaivoGet } from "../../utils/Alaivo";
import ButtonCartoon from "../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import AddIcon from "../../assets/icons/AddIcon";
import Loader from "../Loader/Loader";
import "./AnnonceSlider.sass";

interface AnnonceSliderProps {
  title: string;
  linkTo?: string;
  loadedContent?: boolean;
  context: string;
  category?: string;
  fetching: string;
}

const AnnonceSlider = (props: AnnonceSliderProps) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { annonces, load, getAnnonces, getAnnoncesSupp, btnAddOn, annoncesSupp, loadSupp, resetPlus } = useGetData(
    props.fetching
  );

  const close = () => {
    modal.current?.dismiss();
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    resetPlus();
  };

  useEffect(() => {
    getAnnonces();
  }, [props.category]);

  return (
    <div className="annonce_slider_container">
      <div className="top">
        <div className="title"> {props.title}</div>
        <div className="linkto" id={`open-${props.context}`} onClick={() => getAnnoncesSupp()}>
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
          {!loadSupp &&
            [...Array(4).keys()].map((k, index) => (
              <div key={index}>
                <AnnonceBox callback={close} key={index} loadedContent={props.loadedContent} id_annonce={index + ""} />
                <hr />
              </div>
            ))}
          {annoncesSupp.map((k, index) => (
            <div key={index}>
              <AnnonceBox {...k} callback={close} key={index} loadedContent={load} />
              <hr />
            </div>
          ))}
          {!loadSupp ? (
            <div className="loader_supp_container">
              <Loader />
            </div>
          ) : btnAddOn ? (
            <div className="add_new_annonce">
              <ButtonCartoon callback={getAnnoncesSupp} text="Afficher plus" icon={<AddIcon />} />
            </div>
          ) : (
            ""
          )}
          <hr />
        </IonContent>
      </IonModal>
    </div>
  );
};

const useGetData = (fetching: string) => {
  const [annonces, setAnnonces] = useState<AnnonceData[]>([]);
  const [annoncesSupp, setAnnoncesSupp] = useState<AnnonceData[]>([]);
  const [offset, setOffset] = useState([0, 5]);
  const [countPages, setCountPages] = useState(1);
  const [load, setLoaded] = useState(false);
  const [loadSupp, setLoadedSupp] = useState(false);
  const [btnAddOn, setBtnAddOn] = useState(true);

  useEffect(() => {
    getPagesCount();
    getAnnonces();
  }, []);

  useEffect(() => {
    if (offset[0] !== 0) getAnnoncesSuppLoad();
  }, [offset]);

  const getPagesCount = async () => {
    let res = (await alaivoGet("bibine/actu/valid_annonces/pagination?limit=5", null, true)) as any;
    // console.log(res);
    setCountPages(res.data);
  };

  const getAnnonces = async () => {
    setLoaded(false);
    let res = null;
    if (fetching === "latest") res = (await alaivoGet("bibine/actu/annonces/recentes", null, true)) as any;
    else res = (await alaivoGet(`bibine/actu/annonces?offset=${offset[0]}&limit=${offset[1]}`, null, true)) as any;
    setLoaded(true);
    let annocs = res.data as AnnonceData[];
    setAnnonces(annocs);
  };

  const getAnnoncesSupp = () => {
    setOffset((old) => [old[0] + 1, old[1]]);
    if (offset[0] + 2 > countPages) {
      setBtnAddOn(false);
    }
  };

  const resetPlus = () => {
    setOffset([0, 5]);
    setAnnoncesSupp([]);
    setBtnAddOn(true);
  };

  const getAnnoncesSuppLoad = async () => {
    setLoadedSupp(false);
    let res = (await alaivoGet(`bibine/actu/pagination/annonces?offset=${offset[0]}&limit=${offset[1]}`, null, true)) as any;
    setLoadedSupp(true);
    let annocs = res.data as AnnonceData[];
    setAnnoncesSupp((ans) => [...ans, ...annocs]);
  };

  return { annonces, annoncesSupp, load, getAnnonces, btnAddOn, getAnnoncesSupp, loadSupp, resetPlus };
};

export default AnnonceSlider;
