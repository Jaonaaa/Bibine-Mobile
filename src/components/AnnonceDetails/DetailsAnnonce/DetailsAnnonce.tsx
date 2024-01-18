import "./DetailsAnnonce.sass";
import InfoIcon from "../../../assets/icons/InfoIcon";
import PerfIcon from "../../../assets/icons/PerfIcon";
import List from "./List/List";
import SimpleAnnonceSlider from "../../SimpleAnnonceSlider/SimpleAnnonceSlider";

const DetailsAnnonce = () => {
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

      <div className="box">
        <div className="title">
          <div className="text">
            Annonces de <div className="user_seller"> Jean Mark</div>
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
