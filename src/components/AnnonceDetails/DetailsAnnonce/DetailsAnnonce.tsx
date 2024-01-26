import InfoIcon from "../../../assets/icons/InfoIcon";
import PerfIcon from "../../../assets/icons/PerfIcon";
import List from "./List/List";
import SimpleAnnonceSlider from "../../SimpleAnnonceSlider/SimpleAnnonceSlider";
import { AnnonceData } from "../../../data/Types";
import ListMaintenance from "./ListMaintenance/ListMaintenance";
import "./DetailsAnnonce.sass";

const DetailsAnnonce = (props: AnnonceData) => {
  const { description } = props;

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
        <div className="description" dangerouslySetInnerHTML={desc()}></div>
      </div>
      <div className="box">
        <div className="title">
          <div className="icon">
            <PerfIcon />
          </div>
          <div className="text">Details</div>
        </div>
        <List {...props} />
      </div>

      <div className="box">
        <div className="title">
          <div className="icon">
            <PerfIcon />
          </div>
          <div className="text">Maintenance</div>
        </div>
        <ListMaintenance {...props} />
      </div>

      <div className="box">
        <div className="title">
          <div className="text">
            Annonces de <div className="user_seller"> Jean Mark </div>
          </div>
        </div>
        <SimpleAnnonceSlider id_user="45" />
      </div>
      <div className="box">
        <div className="title">
          <div className="text">Autres annonces</div>
        </div>
        <SimpleAnnonceSlider id_user="*" />
      </div>
    </div>
  );
};

export default DetailsAnnonce;
