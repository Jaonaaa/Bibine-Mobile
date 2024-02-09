import React, { useEffect, useState } from "react";
import CardPropositions, { CardPropositionsProps } from "../CardPropositions/CardPropositions";
import Loader from "../../Loader/Loader";
import { alaivoGet } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";
import Empty from "../../ProfileUser/Empty/Empty";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";

const Received = () => {
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
            sender={k.user.profile}
            block="receiving"
            receiver={user.profile}
            addNotifs={addNotifs}
          />
        ))
      ) : (
        <div className="loader_propo">
          <Loader />
        </div>
      )}
      {loaded && propositions.length === 0 && <Empty remark="Aucune demande de propositions recues pour l'instant" />}
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
    let res = (await alaivoGet(`bibine/user/${user.id}/valid/purchases?offset=0`, null, false)) as any;
    console.log(res);
    let data = res.data.filter((data: any) => +data.state !== 3);
    setPropositions(data);

    setLoaded(true);
  };
  return { loaded, propositions };
};
export default Received;
