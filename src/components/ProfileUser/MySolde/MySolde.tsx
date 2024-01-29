import React, { useEffect, useRef, useState } from "react";
import PageTemplate from "../../PageTemplate/PageTemplate";
import CoinsIcon from "../../../assets/icons/CoinsIcon";
import "./MySolde.sass";
import BbRotatedIcon from "../../../assets/icons/BbRotatedIcon";
import Recharge from "./Recharge/Recharge";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";
import PriceParser from "../../../utils/Format";
import Hider from "../../Hider/Hider";
import { alaivoGet } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";
import { AnimatePresence } from "framer-motion";

const MySolde = () => {
  const { addNotifs, notifs } = useMyNotifs();
  const [amount, setAmount] = useState(0);
  const [onSend, setOnSend] = useState(false);
  const user = getUser();

  const getAmout = async () => {
    setOnSend(true);
    let res = (await alaivoGet(
      `bibine/user/${user.id}/solde`,
      null,
      false
    )) as any;
    console.log(res.data);
    setOnSend(false);

    setAmount(res.data);
  };
  useEffect(() => {
    getAmout();
  }, []);

  const succes = (res: any, value: number) => {
    addNotifs("OK", "Rechargement reussi ! ", 2000);
    setAmount((oldValue) => oldValue + value);
  };

  const error = (err: any) => {
    addNotifs("error", "Rechargement non validé ! ", 2000);
  };

  return (
    <PageTemplate
      tiltePage="Mon Solde"
      subtitle="La somme de votre solde utilisable dans l'application Bibine sera affcihé ici"
    >
      <AnimatePresence>
        {onSend && <Hider loader classCss="glassy" />}
      </AnimatePresence>
      {notifs.map((notif) => notif)}
      <div className="solde_container">
        <div className="carte_solde" id="recharge_modal">
          <div className="header">
            <div className="icon">
              <CoinsIcon />
            </div>
            <div className="text">Pièces </div>
          </div>
          <div className="piece_value">
            <div className="value"> {PriceParser(amount)} </div>
            <div className="unit">MGA</div>
          </div>
          <div className="icon_bb">
            <BbRotatedIcon />
          </div>

          <div className="recharge">
            <div className="text">Recharger mon compte</div>
            <div className="icon">
              <SmallArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
      <Recharge callBack={succes} errorCallback={error} />
    </PageTemplate>
  );
};

const SmallArrowRightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4.479"
      height="7.453"
      viewBox="0 0 4.479 7.453"
    >
      <path
        id="Tracé_356"
        data-name="Tracé 356"
        d="M7632.41,2689.694l3.06,3.216-3.06,2.824"
        transform="translate(-7631.703 -2688.987)"
        fill="none"
        stroke="#707070"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </svg>
  );
};
export default MySolde;
