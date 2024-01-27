import React from "react";
import { IonBackButton, IonContent, IonHeader, IonItem, IonPage, IonToolbar } from "@ionic/react";
import { motion } from "framer-motion";
import "./PageTemplate.sass";

interface PageTemplateProps {
  children?: React.ReactNode;
  tiltePage?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  contentAllScreen?: boolean;
  redirect?: string;
  rightItem?: React.ReactNode;
}
const slideUp = {
  hidden: {
    y: "20%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  visible_slowed: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
  visible_slowed_more: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.4,
    },
  },
};

const PageTemplate = (props: PageTemplateProps) => {
  const centredPadding = props.contentAllScreen || props.contentAllScreen === undefined;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem slot="start" lines="none">
            <IonBackButton defaultHref={props.redirect ? props.redirect : "/main/home"}> "" </IonBackButton>
          </IonItem>
          <IonItem slot="end" lines="none">
            {" "}
            {props.rightItem}
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`${centredPadding ? "ion-padding" : ""} page_content`}>
        <div className={`header_page ${centredPadding ? "" : "centered_padding"}`}>
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="title">
            {props.tiltePage}
          </motion.div>
          <motion.div variants={slideUp} initial="hidden" animate="visible_slowed" className={`subtitle `}>
            {props.subtitle}
          </motion.div>
        </div>
        <motion.div className="content" variants={slideUp} initial="hidden" animate="visible_slowed_more">
          {props.children}
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default PageTemplate;
