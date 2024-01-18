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
  const { to_forward } = useNav();
  const handleContent = (e: CustomEvent<SegmentChangeEventDetail>) => {
    const sec = sections.filter((section) => section.value === e.detail.value)[0];
    setContent(sec);
  };
  return (
    <>
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
              A
              <img src="" alt="" />
              <div
                className="add_annonce_btn"
                onClick={() => {
                  to_forward("/main/addAnnonce");
                }}
              >
                <div className="circle">+</div>
              </div>
            </div>
            <div className="username">Peter Parker</div>
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
