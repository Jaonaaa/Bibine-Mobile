import React, { useState } from "react";
import Cat from "../../assets/img/cat.jpg";
import useNav from "../../hooks/useNav";
import PriceParser, { getNumberPrice } from "../../utils/Format";
import { AnnonceData } from "../../data/Types";
import { getUser } from "../../data/storage";
import "./AnnonceBox.sass";

const detailsPage = "/main/annonce/";
const profilePage = "/profile/annonce/";

const AnnonceBox = (props: AnnonceData) => {
  const { to_forward } = useNav();
  const [loadedPicture, setLoadedPicture] = useState(false);
  const user = getUser();

  const year = () => {
    if (props.year) {
      let yearTab = props.year.split("-");
      return yearTab[1] + "/" + yearTab[0];
    } else return "XX/XXXX";
  };

  return (
    <div
      className={`box_annonce ${props.loadedContent ? "" : "skeleton_container"}`}
      onClick={() => {
        if (props.id)
          if (+props.id !== -1) {
            if (props.callback) props.callback();
            if (user) {
              if (props.vendeur?.idvendeur + "" === user.id + "") {
                to_forward(profilePage + props.id);
              } else to_forward(detailsPage + (props.id ? props.id : "-1"));
            } else to_forward(detailsPage + (props.id ? props.id : "-1"));
          }
      }}
    >
      <div className="overlay"></div>
      <div className="picture_box">
        {props.loadedContent ? (
          <img
            onLoad={() => {
              setLoadedPicture(true);
            }}
            className={loadedPicture ? "" : "skeleton"}
            src={props.pictures ? props.pictures[0] : Cat}
            alt=""
          />
        ) : (
          ""
        )}
      </div>
      <div className="details">
        <div className="details_content">
          {props.loadedContent ? (
            <>
              {/* //AUDI T9 AZ-REIM */}
              <div className="title">
                {props.modele?.nom} {props.brand?.nom}
              </div>
              <div className="subtitle">
                {year()} | {props.motor?.nom} | {props.modele?.type.nom}
              </div>
              <div className="price">
                <div className="text">{props.prix ? PriceParser(props.prix) : getNumberPrice(10000, 500000)}</div>

                <div className="unit"> Ar </div>
              </div>
              <div className="marchand">
                <div className="avatar">
                  <img
                    src={
                      props.vendeur
                        ? props.vendeur.profile
                        : "https://ih1.redbubble.net/image.3319898950.8330/raf,360x360,075,t,fafafa:ca443f4786.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="name">{props.vendeur?.nom}</div>
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
