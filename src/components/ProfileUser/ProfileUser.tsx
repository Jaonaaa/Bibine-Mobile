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
import React, { useState } from "react";
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

const statBlocks = [
  {
    label: "Mes Annonces",
    value: "20",
  },
  {
    label: "Ventes",
    value: "0",
  },
  {
    label: "Favoris",
    value: "1.2k",
  },
];

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
  const { addNotifs, notifs } = useMyNotifs();
  const {} = useBackHandler();
  const { to_forward } = useNav();
  const handleContent = (e: CustomEvent<SegmentChangeEventDetail>) => {
    const sec = sections.filter((section) => section.value === e.detail.value)[0];
    setContent(sec);
  };

  const handleHider = () => {
    setHiderOn(!hiderOn);
  };

  const user = getUser();

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
                    addNotifs("info", "Vous n'avez pas de photo de profile :( ", 1500);
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
            {statBlocks.map((statBlock, index) => {
              let col = index < statBlocks.length - 1 ? <div className="col"></div> : "";
              return (
                <React.Fragment key={index}>
                  <div className="block_stat">
                    <div className="value"> {statBlock.value} </div>
                    <div className="label"> {statBlock.label} </div>
                  </div>
                  {col}
                </React.Fragment>
              );
            })}
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
