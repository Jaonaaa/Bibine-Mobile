import React, { useEffect, useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import PictureSwaper from "./PictureSwaper/PictureSwaper";
import DetailsAnnonce from "./DetailsAnnonce/DetailsAnnonce";
import ArrowDownBoxIcon from "../../assets/icons/ArrowDownBoxIcon";
import SubDetails from "./SubDetails/SubDetails";

import Picture from "../../assets/img/cat.jpg";
import { useParams } from "react-router-dom";

import "./AnnonceDetails.sass";
import { AnnonceData } from "../../data/Types";
import { alaivoGet } from "../../utils/Alaivo";

interface AnnonceDetailsProps {
  id: string;
}
const AnnonceDetails = () => {
  const { id } = useParams<AnnonceDetailsProps>();
  const { annonce, getAnnonce } = useGetData(id);

  const scrollToDetails = () => {
    let details = document.getElementById("details_annonnce_container");
    let container = document.querySelector(".details_content_page");
    if (details && container) {
      container.scrollTo(0, details.offsetTop - 5);
    }
  };

  const year = () => {
    if (annonce)
      if (annonce.year) {
        let yearTab = annonce.year.split("-");
        return yearTab[1] + "/" + yearTab[0];
      } else return "XX/XXXX";
  };

  return (
    <PageTemplate
      tiltePage={annonce !== null ? annonce.modele?.nom + " " + annonce.brand?.nom : ""}
      subtitle={annonce !== null ? `${year()} | ${annonce.motor?.nom}  ${annonce.modele?.type.nom}` : ""}
    >
      <div className="details_content_page">
        <div className="annonce_user">
          <div className="profile">
            <div className="avatar">
              <img src={Picture} />
            </div>
            <div className="user_data">
              <div className="name"> Jean Mark</div>
            </div>
          </div>
          <div className="see_details" onClick={scrollToDetails}>
            <div className="text"> Voir les details </div>
            <ArrowDownBoxIcon />
          </div>
        </div>
        <PictureSwaper pictures={annonce?.pictures ? annonce?.pictures : [""]} />
        <hr />
        <SubDetails {...annonce} />
        <DetailsAnnonce {...annonce} />
      </div>
    </PageTemplate>
  );
};

const useGetData = (id: any) => {
  const [annonce, setAnnonce] = useState<AnnonceData | null>(null);
  const [load, setLoaded] = useState(false);

  useEffect(() => {
    getAnnonce();
  }, []);

  const getAnnonce = async () => {
    setLoaded(false);
    let res = (await alaivoGet("bibine/actu/annonces/" + id, null, true)) as any;
    setLoaded(true);
    let annoc = res.data as AnnonceData;
    console.log(annoc);
    setAnnonce(annoc);
  };

  return { annonce, load, getAnnonce };
};

export default AnnonceDetails;
