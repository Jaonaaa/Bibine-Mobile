import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  SegmentChangeEventDetail,
} from "@ionic/react";
import "./ProfileUser.sass";
import React, { useEffect, useState } from "react";
import MyAnnonces from "./MyAnnonces/MyAnnonces";
import MyAnnoncesSelled from "./MyAnnoncesSelled/MyAnnoncesSelled";
import Favori from "./Favori/Favori";
import useNav from "../../hooks/useNav";
import ParamsUser from "./ParamsUser/ParamsUser";
import { getUser } from "../../data/storage";
import Hider from "../Hider/Hider";
import useMyNotifs from "../../utilsComponent/Notif/useNotifs";
import { AnimatePresence } from "framer-motion";
import CrossIcon from "../../assets/icons/CrossIcon";
import useBackHandler from "../../hooks/useBackHandler";
import { alaivoGet } from "../../utils/Alaivo";

const sections = [
  {
    value: "Annonces",
    component: <MyAnnonces />,
  },
  {
    value: "Vendues",
    component: <MyAnnoncesSelled />,
  },
  {
    value: "Favoris",
    component: <Favori />,
  },
];

const ProfileUser = () => {
  const [content, setContent] = useState(sections[0]);
  const [hiderOn, setHiderOn] = useState(false);

  const [statUser, setStatUser] = useState({
    favoris: 0,
    own_annonce: 0,
    vendu: 0,
  });

  const { addNotifs, notifs } = useMyNotifs();
  const {} = useBackHandler();
  const { to_forward } = useNav();
  const handleContent = (e: CustomEvent<SegmentChangeEventDetail>) => {
    const sec = sections.filter(
      (section) => section.value === e.detail.value
    )[0];
    setContent(sec);
  };

  const handleHider = () => {
    setHiderOn(!hiderOn);
  };

  const getStat = async () => {
    let res = (await alaivoGet(
      "bibine/actu/user/" + user.id + "/count",
      null,
      true
    )) as any; // 3 chose
    setStatUser(res.data);
  };

  const user = getUser();
  useEffect(() => {
    // alaivoGet("bibine/user/" + user.id + "/solde", null, false);
    getStat();
  }, []);

  return (
    <>
      {notifs.map((notif) => notif)}
      <AnimatePresence>
        {hiderOn && (
          <Hider classCss="glassy" animate="showUp">
            <div className="closer_picture" onClick={handleHider}>
              <CrossIcon />
            </div>
            <div className="picture_container">
              <img src={user.profile} alt="" />
            </div>
          </Hider>
        )}
      </AnimatePresence>

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonItem slot="start" lines="none">
              <IonBackButton defaultHref="/main/home"> </IonBackButton>
            </IonItem>
            <IonTitle className="profile_title">Profile</IonTitle>
            <IonItem slot="end" lines="none">
              <ParamsUser />
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding page_content">
          <div className="profile_box">
            <div className="picture">
              <div className="name">{user ? user.name[0] : "<3"}</div>
              <div
                className="picture_box"
                onClick={() => {
                  if (user.profile === null) {
                    addNotifs(
                      "info",
                      "Vous n'avez pas de photo de profile :( ",
                      1500
                    );
                  } else handleHider();
                }}
              >
                <img src={user ? user.profile : ""} alt="" />
              </div>
              <div
                className="add_annonce_btn"
                onClick={(e) => {
                  e.stopPropagation();
                  to_forward("/main/addAnnonce");
                }}
              >
                <div className="circle">+</div>
              </div>
            </div>
            <div className="username">{user ? user.name : "￣へ￣"}</div>
          </div>

          <div className="stat_user">
            <div className="block_stat">
              <div className="value"> {statUser.own_annonce} </div>
              <div className="label"> Mes annonces </div>
            </div>
            <div className="col"></div>

            <div className="block_stat">
              <div className="value"> {statUser.vendu} </div>
              <div className="label"> Ventes </div>
            </div>
            <div className="col"></div>
            <div className="block_stat">
              <div className="value"> {statUser.favoris} </div>
              <div className="label"> Favoris </div>
            </div>
          </div>

          <div className="details_user">
            <IonSegment value={content.value} onIonChange={handleContent}>
              {sections.map((section, index) => (
                <IonSegmentButton key={index} value={section.value}>
                  <IonLabel> {section.value} </IonLabel>
                </IonSegmentButton>
              ))}
            </IonSegment>
            <div className="divider"></div>
            <div className="container">{content.component}</div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ProfileUser;
