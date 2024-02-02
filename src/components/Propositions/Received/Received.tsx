import React, { useEffect, useState } from "react";
import CardPropositions from "../CardPropositions/CardPropositions";
import Loader from "../../Loader/Loader";

const Received = () => {
  const { loaded, propositions } = useGetData();
  return (
    <div className="list_propostions">
      {loaded ? (
        [...Array(5).keys()].map((k, i) => <CardPropositions key={i} />)
      ) : (
        <div className="loader_propo">
          <Loader />
        </div>
      )}
    </div>
  );
};

const useGetData = () => {
  const [propositions, setPropositions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchPropo();
  }, []);

  const fetchPropo = () => {
    setLoaded(false);
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  };
  return { loaded, propositions };
};

export default Received;
