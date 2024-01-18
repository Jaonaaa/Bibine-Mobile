import React, { useEffect, useState } from "react";
import Cat from "../../assets/img/cat.jpg";
import useNav from "../../hooks/useNav";
import "./AnnonceBox.sass";
import { getNumberPrice } from "../../utils/Format";

const detailsPage = "/main/annonce/";

interface AnnonceBoxProps {
  loadedContent?: boolean;
  id_annonce?: string;
  callback?: Function;
}
const AnnonceBox = (props: AnnonceBoxProps) => {
  const { to_forward } = useNav();

  return (
    <div
      className={`box_annonce ${props.loadedContent ? "" : "skeleton_container"}`}
      onClick={() => {
        if (props.callback) props.callback();
        to_forward(detailsPage + (props.id_annonce ? props.id_annonce : "-1"));
      }}
    >
      <div className="overlay"></div>
      <div className="picture_box">{props.loadedContent ? <img src={Cat} alt="" /> : ""}</div>
      <div className="details">
        <div className="details_content">
          {props.loadedContent ? (
            <>
              <div className="title"> AUDI T9 AZ-REIM </div>
              <div className="subtitle">12/2010 | Essence | Plaisir </div>
              <div className="price">
                {" "}
                {getNumberPrice(10000, 500000)} <div className="unit"> Ar </div>
              </div>{" "}
              <div className="marchand">
                <div className="avatar">
                  <img
                    src="https://ih1.redbubble.net/image.3319898950.8330/raf,360x360,075,t,fafafa:ca443f4786.jpg"
                    alt=""
                  />
                </div>
                <div className="name">Anderson Albert</div>
              </div>
            </>
          ) : (
            <>
              {/* ///SKELETON  */}
              <div className="skeleton_title skeleton"> </div>
              <div className="skeleton_subtitle skeleton"> </div>
              <div className="skeleton_price skeleton"> </div>
              <div className="skeleton_avatar skeleton"> </div>
              <div className="skeleton_marchand skeleton"> </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnonceBox;
