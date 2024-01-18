import { useEffect, useRef } from "react";
import { menuOutline } from "ionicons/icons";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import WalletIcon from "../../../assets/icons/WalletIcon";
import HistoIcon from "../../../assets/icons/HistoIcon";

import "./ParamsUser.sass";
import useNav from "../../../hooks/useNav";
import useViewPort from "../../../hooks/useViewPort";

const params = [
  {
    icon: <WalletIcon />,
    label: "Mon Solde",
    path: "/profile/me/wallet/",
  },
  {
    icon: <HistoIcon />,
    label: "Historique de transaction",
    path: "/profile/me/histo",
  },
];
const ParamsUser = () => {
  const { md } = useViewPort();
  const { to_forward } = useNav();
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    resizeHandler();
  }, []);

  const resizeHandler = () => {
    window.addEventListener("resize", () => {
      modal.current?.dismiss();
    });
  };

  return (
    <div className="params">
      <IonIcon icon={menuOutline} className="button_params" id="params_modal" />

      <IonModal
        ref={modal}
        trigger="params_modal"
        className="modal_content_more auto_height_modal"
        initialBreakpoint={md ? params.length * 0.192 : params.length * 0.092}
        breakpoints={[0, md ? params.length * 0.192 : params.length * 0.092]}
      >
        <IonContent>
          <IonList className="list_param">
            {params.map((para, index) => (
              <IonItem
                lines="none"
                className="item_row"
                key={index}
                onClick={() => {
                  modal.current?.dismiss();
                  to_forward(para.path);
                }}
              >
                <div className="icon">{para.icon}</div>
                <IonLabel className="label">{para.label}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default ParamsUser;
