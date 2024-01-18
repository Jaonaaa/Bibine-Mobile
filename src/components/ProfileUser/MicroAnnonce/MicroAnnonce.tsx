import React from "react";
import Cat from "../../../assets/img/cat.jpg";
import "./MicroAnnonce.sass";
import useNav from "../../../hooks/useNav";

interface MicroAnnonceProps {
  pictureFirst?: string;
  id: number;
  name?: string;
  price?: string;
}
const MicroAnnonce = (props: MicroAnnonceProps) => {
  const { to_forward } = useNav();
  return (
    <div
      className="micro_annonce_box"
      onClick={() => {
        to_forward("/profile/annonce/" + props.id);
      }}
    >
      <img src={props.pictureFirst ? props.pictureFirst : Cat} alt="" />
      <div className="overlay"></div>
      <div className="about">
        <div className="name"> {props.name}</div>
        <div className="price">{props.price} Ar </div>
      </div>
    </div>
  );
};

export default MicroAnnonce;
