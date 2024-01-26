import React from "react";
import { AnnonceData } from "../../../../data/Types";
import "./List.sass";

const List = (props: AnnonceData) => {
  return (
    <div className="list">
      {props.caracteristic?.map((carac, index) => (
        <div className="row" key={index}>
          <div className="label"> {carac.key.toUpperCase()} </div>
          <div className="value"> {carac.value}</div>
        </div>
      ))}
      <div className="row">
        <div className="label">CONSOMMATION</div>
        <div className="value"> {props.consommation} / km</div>
      </div>
      <div className="row">
        <div className="label">LOCALISATION</div>
        <div className="value"> {props.localisation ? props.localisation.nom + "" : ""} </div>
      </div>
    </div>
  );
};

export default List;
