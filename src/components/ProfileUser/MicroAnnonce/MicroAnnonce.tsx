import React from "react";
import Cat from "../../../assets/img/cat.jpg";
import useNav from "../../../hooks/useNav";
import { AnnonceData } from "../../../data/Types";
import "./MicroAnnonce.sass";
import { getUser } from "../../../data/storage";
import PriceParser from "../../../utils/Format";

const MicroAnnonce = (props: AnnonceData) => {
  const { to_forward } = useNav();
  let user = getUser();
  return (
    <div
      className="micro_annonce_box"
      onClick={() => {
        if (props.vendeur?.idvendeur === user.id) to_forward("/profile/annonce/" + props.id);
        else to_forward("/main/annonce/" + props.id);
      }}
    >
      <img src={props.pictures ? props.pictures[0] : Cat} alt="" />
      <div className="overlay"></div>
      <div className="about">
        <div className="name">
          {" "}
          {props.modele?.nom} {props.brand?.nom}{" "}
        </div>
        <div className="price">{PriceParser(props.prix)} Ar </div>
      </div>
    </div>
  );
};

export default MicroAnnonce;
