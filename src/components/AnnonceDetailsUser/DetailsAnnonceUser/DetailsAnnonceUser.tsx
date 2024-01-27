import React from "react";
import List from "../../AnnonceDetails/DetailsAnnonce/List/List";
import PerfIcon from "../../../assets/icons/PerfIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import { AnnonceData } from "../../../data/Types";
import MaintenanceIcon from "../../../assets/icons/MaintenanceIcon";
import ListMaintenance from "../../AnnonceDetails/DetailsAnnonce/ListMaintenance/ListMaintenance";

const DetailsAnnonceUser = (props: AnnonceData) => {
  const { description, loaded } = props;

  const desc = () => {
    return { __html: ("" + description?.replace(/\\n/g, "\n <br>")) as any };
  };

  return (
    <div id="details_annonnce_container">
      <div className="box">
        <div className="title">
          <div className="icon">
            <InfoIcon />
          </div>
          <div className="text">Description</div>
        </div>
        <div
          className={`description ${loaded ? "" : "skeleton blank_desc"}`}
          dangerouslySetInnerHTML={loaded ? desc() : { __html: "" }}
        ></div>
      </div>
      <div className="box">
        <div className="title">
          <div className="icon">
            <PerfIcon />
          </div>
          <div className="text">Details</div>
        </div>
        <List {...props} loaded={loaded} />
      </div>
      <div className="box">
        <div className="title">
          <div className="icon">
            <MaintenanceIcon />
          </div>
          <div className="text">Maintenance</div>
        </div>
        <ListMaintenance {...props} loaded={loaded} />
      </div>
    </div>
  );
};

export default DetailsAnnonceUser;
