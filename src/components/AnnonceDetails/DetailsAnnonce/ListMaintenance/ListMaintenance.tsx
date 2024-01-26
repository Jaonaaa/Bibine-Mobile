import React from "react";
import { AnnonceData } from "../../../../data/Types";

const ListMaintenance = (props: AnnonceData) => {
  return (
    <div className="list">
      {props.maintenance?.map((mana, index) => (
        <div className="row centered" key={index}>
          <div className="label"> {mana.nom} </div>
        </div>
      ))}
    </div>
  );
};

export default ListMaintenance;
