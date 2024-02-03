import React, { useEffect, useState } from "react";
import CardPropositions, { CardPropositionsProps } from "../CardPropositions/CardPropositions";
import Loader from "../../Loader/Loader";
import { alaivoGet } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";
import Empty from "../../ProfileUser/Empty/Empty";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";
import "./Sended.sass";

const Sended = () => {
  const { loaded, propositions } = useGetData();
  const { addNotifs, notifs } = useMyNotifs();

  const user = getUser();
  return (
    <div className="list_propostions">
      {notifs.map((notif) => notif)}

      {loaded ? (
        propositions.map((k, i) => (
          <CardPropositions
            key={i}
            {...k}
            sender={user.profile}
            block="sending"
            receiver={k.body.vendeur?.profile}
            addNotifs={addNotifs}
          />
        ))
      ) : (
        <div className="loader_propo">
          <Loader />
        </div>
      )}
      {loaded && propositions.length === 0 && <Empty remark="Aucune propositions envoyés" />}
    </div>
  );
};

const useGetData = () => {
  const [propositions, setPropositions] = useState<CardPropositionsProps[]>([]);
  const [loaded, setLoaded] = useState(false);
  const user = getUser();

  useEffect(() => {
    fetchPropo();
  }, []);

  const fetchPropo = async () => {
    setLoaded(false);
    // naka ze rehetra efa lasa ftsny
    // let res = (await alaivoGet(`bibine/user/${user.id}/sent_purchases?offset=0`, null, false)) as any;
    // maka ze rehetra efa valider
    // misy count koa ao
    let res = (await alaivoGet(`bibine/user/${user.id}/accepted?offset=0`, null, false)) as any;
    // maka ze rehetra efa valider le transsaction
    console.log(res);
    setPropositions(res.data);
    setLoaded(true);
  };
  return { loaded, propositions };
};
export default Sended;
