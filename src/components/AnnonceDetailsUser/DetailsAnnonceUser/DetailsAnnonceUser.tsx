import React from "react";
import List from "../../AnnonceDetails/DetailsAnnonce/List/List";
import PerfIcon from "../../../assets/icons/PerfIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";

const DetailsAnnonceUser = () => {
  return (
    <div id="details_annonnce_container">
      <div className="box">
        <div className="title">
          <div className="icon">
            <InfoIcon />
          </div>
          <div className="text">Description</div>
        </div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita autem eius quisquam voluptates laborum esse
          explicabo consequuntur eum commodi enim quam accusantium, iusto veritatis, incidunt eos, rem perspiciatis ut.
          Ullam.
        </div>
      </div>
      <div className="box">
        <div className="title">
          <div className="icon">
            <PerfIcon />
          </div>
          <div className="text">Details</div>
        </div>
        <List />
      </div>
    </div>
  );
};

export default DetailsAnnonceUser;
