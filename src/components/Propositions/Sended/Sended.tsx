import React, { useEffect, useState } from "react";
import CardPropositions, { CardPropositionsProps } from "../CardPropositions/CardPropositions";
import "./Sended.sass";
import Loader from "../../Loader/Loader";
import { alaivoGet } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";

const Sended = () => {
  const { loaded, propositions } = useGetData();
  const user = getUser();
  return (
    <div className="list_propostions">
      {loaded ? (
        propositions.map((k, i) => (
          <CardPropositions key={i} {...k} sender={user.profile} block="sending" receiver={k.body.vendeur?.profile} />
        ))
      ) : (
        <div className="loader_propo">
          <Loader />
        </div>
      )}
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
    let res = (await alaivoGet(`bibine/user/${user.id}/sent_purchases?offset=0`, null, false)) as any;

    setPropositions(res.data);
    setLoaded(true);
  };
  return { loaded, propositions };
};
export default Sended;
