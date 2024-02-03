import React from "react";
import { AnnonceData } from "../../../../data/Types";
import "./List.sass";

const List = (props: AnnonceData) => {
  const { loaded } = props;
  return (
    <div className="list__l">
      {loaded ? (
        <>
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
          <div className="row">
            <div className="label">COULEUR</div>
            <div className="value"> {props.couleur ? props.couleur.nom + "" : ""} </div>
          </div>
          <div className="row">
            <div className="label">KILOMETRAGE</div>
            <div className="value"> {props.kilometre ? props.kilometre + "" : ""} </div>
          </div>
          <div className="row">
            <div className="label">ETAT</div>
            <div className="value"> {props.etat ? props.etat + " / 10" : ""} </div>
          </div>
        </>
      ) : (
        [...Array(2).keys()].map((key, index) => (
          <div className="row loading" key={index}>
            <div className="label skeleton"> </div>
            <div className="value skeleton"> </div>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
