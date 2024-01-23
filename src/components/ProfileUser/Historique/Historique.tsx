import React from "react";
import PageTemplate from "../../PageTemplate/PageTemplate";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import PriceParser, { getRandomNumber } from "../../../utils/Format";
import "./Historique.sass";

const Historique = () => {
  return (
    <PageTemplate
      tiltePage="Mes transactions"
      subtitle="Ici apparaitront tout les transactions que vous aviez effectuer chez Bibine ."
    >
      <div className="list_historique">
        {[...Array(18).keys()].map((k, i) => (
          <RowHistorique key={i} index={i} />
        ))}
      </div>
    </PageTemplate>
  );
};

interface RowHistoriqueProps {
  data?: any;
  index: number;
}
const RowHistorique = (props: RowHistoriqueProps) => {
  const recharge = getRandomNumber(0, 10);
  return (
    <>
      <div className="row_histo">
        <div className="left">
          <div className={`cube ${recharge % 2 === 0 ? "up" : "down"}`}>
            <ArrowDownIcon />
          </div>
        </div>
        <div className="right">
          <div className="block_left">
            <div className="title">{recharge % 2 === 0 ? " Recharge solde" : "Achat d'un article"}</div>
            <div className="ref">
              <span>Ref: </span> 1523365458{" "}
            </div>
          </div>
          <div className="block_right">
            <div className="time"> 01/12/23 12:33 </div>
            <div className="value">
              <div className="text"> {PriceParser(getRandomNumber(1000, 5000000))} </div>
              <div className="unit"> Ar </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Historique;
