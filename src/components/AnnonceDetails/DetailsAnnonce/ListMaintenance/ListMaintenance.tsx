import React from "react";
import { AnnonceData } from "../../../../data/Types";

const ListMaintenance = (props: AnnonceData) => {
  const { loaded } = props;
  return (
    <div className="list">
      {loaded
        ? props.maintenance?.map((mana, index) => (
            <div className="row centered_row" key={index}>
              <div className="label"> {mana.nom} </div>
            </div>
          ))
        : [...Array(2).keys()].map((key, index) => (
            <div className="row loading centered_row" key={index}>
              <div className="label skeleton"> </div>
            </div>
          ))}
      {}
    </div>
  );
};

export default ListMaintenance;
