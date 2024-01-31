import React, { useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { IonLabel, IonSegment, IonSegmentButton, SegmentChangeEventDetail } from "@ionic/react";
import Received from "./Received/Received";
import Sended from "./Sended/Sended";
import "./Propositions.sass";

const sections = [
  {
    value: "Envoyer",
    component: <Sended />,
  },
  {
    value: "Reçues",
    component: <Received />,
  },
];

const Propositions: React.FC = () => {
  const [content, setContent] = useState(sections[0]);
  const handleContent = (e: CustomEvent<SegmentChangeEventDetail>) => {
    const sec = sections.filter((section) => section.value === e.detail.value)[0];
    setContent(sec);
  };
  return (
    <PageTemplate
      tiltePage={"Proposition"}
      subtitle={
        "Ici vous pourrez vori les propositions aue vous aviez envoyer et ceux que vous recevez pour l'achat et vente des produits."
      }
      contentAllScreen
    >
      <div className="details_user propositions-container">
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
    </PageTemplate>
  );
};

export default Propositions;
