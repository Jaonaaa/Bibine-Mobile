import { IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import React, { useRef } from "react";
import PriceParser, { getNumberPrice, getRandomNumber } from "../../../utils/Format";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";

const MyPropositions = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      trigger="my_propositions"
      className="modal_content_more auto_height_modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title_modal_content">Mes propositions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="list_historique">
          {[...Array(18).keys()].map((k, i) => (
            <RowMyProposition key={i} index={i} />
          ))}
        </div>
      </IonContent>
    </IonModal>
  );
};

interface RowMyPropositionProps {
  data?: any;
  index: number;
}
const RowMyProposition = (props: RowMyPropositionProps) => {
  const recharge = getRandomNumber(0, 10);
  return (
    <>
      <div className="row_histo">
        <div className="right">
          <div className="block_left">
            <div className="title">Mon prix</div>
            <div className="ref">
              <span>Ref: </span> 1523365458{" "}
            </div>
          </div>
          <div className="block_right">
            <div className="time"> 01/12/23 12:33 </div>
            <div className="value">
              <div className="text"> {getNumberPrice(1000, 5000000)} </div>
              <div className="unit"> Ar </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPropositions;
