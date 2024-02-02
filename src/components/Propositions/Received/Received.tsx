import React, { useEffect, useState } from "react";
import CardPropositions, { CardPropositionsProps } from "../CardPropositions/CardPropositions";
import Loader from "../../Loader/Loader";
import { alaivoGet } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";

const Received = () => {
  const { loaded, propositions } = useGetData();
  const user = getUser();

  return (
    <div className="list_propostions">
      {loaded ? (
        propositions.map((k, i) => (
          <CardPropositions key={i} {...k} sender={k.user.profile} block="receiving" receiver={user.profile} />
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
    let res = (await alaivoGet(`bibine/user/${user.id}/valid/purchases?offset=0`, null, false)) as any;
    console.log(res);
    setPropositions(res.data);
    setLoaded(true);
  };
  return { loaded, propositions };
};
export default Received;
