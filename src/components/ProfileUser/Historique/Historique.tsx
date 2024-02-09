import React, { useEffect, useState } from "react";
import PageTemplate from "../../PageTemplate/PageTemplate";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import PriceParser, { getRandomNumber } from "../../../utils/Format";
import { alaivoGet } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";
import Loader from "../../Loader/Loader";
import Empty from "../Empty/Empty";
import "./Historique.sass";

const Historique = () => {
  const { historique, loaded } = useGetData();

  return (
    <PageTemplate
      tiltePage="Mes transactions"
      subtitle="Ici apparaitront tout les transactions que vous aviez effectuer chez Bibine ."
    >
      {loaded ? (
        historique.length === 0 ? (
          <div className="empty_box_histo">
            <Empty remark="Aucun historique  " />
          </div>
        ) : (
          <div className="list_historique">
            {historique.map((k, i) => (
              <RowHistorique key={i} index={i} data={k} />
            ))}
          </div>
        )
      ) : (
        <div className="loader_container_histo">
          <Loader size="3.5rem" weigth="4" />
        </div>
      )}
    </PageTemplate>
  );
};

interface RowHistoriqueProps {
  data?: any;
  index: number;
}
const RowHistorique = (props: RowHistoriqueProps) => {
  const { data } = props;

  const formateDate = (date: string) => {
    let datesPart = date.split("-");

    return `${datesPart[2]}/${datesPart[1]}/${datesPart[0]}`;
  };
  return (
    <>
      <div className="row_histo">
        <div className="left">
          <div className={`cube down"}`}>
            <ArrowDownIcon />
          </div>
        </div>
        <div className="right">
          <div className="block_left">
            <div className="title">{"Achat " + data.body.brand.nom + " | " + data.body.modele.nom}</div>
            <div className="ref">
              <span>Ref: </span> {(data.annonce + "").substring(0, 10)}{" "}
            </div>
          </div>
          <div className="block_right">
            <div className="time"> {formateDate(data.date)} </div>
            <div className="value">
              <div className="text"> {PriceParser(data.montant)} </div>
              <div className="unit"> Ar </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const useGetData = () => {
  const [historique, sethistorique] = useState<any[]>([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    getAllHistorique();
  }, []);

  const getAllHistorique = async () => {
    setloaded(false);
    let user = getUser();
    let res = (await alaivoGet(
      "bibine/user/" + user.id + "/purchases_with_transaction?offset=0&limit=100",
      null,
      false
    )) as any;

    console.log(res);
    setloaded(true);
    sethistorique(res.data);
  };
  return { historique, loaded };
};

export default Historique;
