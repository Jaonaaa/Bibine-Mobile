import React from "react";
import CardPropositions from "../CardPropositions/CardPropositions";
import "./Sended.sass";

const Sended = () => {
  return (
    <div className="list_propostions">
      {[...Array(5).keys()].map((k, i) => (
        <CardPropositions key={i} />
      ))}
    </div>
  );
};

export default Sended;
