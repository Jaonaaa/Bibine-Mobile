import InfoIcon from "../../../assets/icons/InfoIcon";
import PerfIcon from "../../../assets/icons/PerfIcon";
import List from "./List/List";
import SimpleAnnonceSlider from "../../SimpleAnnonceSlider/SimpleAnnonceSlider";
import { AnnonceData } from "../../../data/Types";
import ListMaintenance from "./ListMaintenance/ListMaintenance";
import "./DetailsAnnonce.sass";
import MaintenanceIcon from "../../../assets/icons/MaintenanceIcon";

const DetailsAnnonce = (props: AnnonceData) => {
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

      <div className="box">
        <div className="title">
          <div className="text">
            Annonces de <div className="user_seller"> {props.vendeur?.nom} </div>
          </div>
        </div>
        {loaded ? <SimpleAnnonceSlider id_user={props.vendeur?.idvendeur + ""} /> : ""}
      </div>
      <div className="box">
        <div className="title">
          <div className="text">Autres annonces</div>
        </div>
        {loaded ? <SimpleAnnonceSlider id_user="*" /> : ""}
      </div>
    </div>
  );
};

export default DetailsAnnonce;
