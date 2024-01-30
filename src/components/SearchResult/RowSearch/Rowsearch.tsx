import React from "react";
import { AnnonceData } from "../../../data/Types";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { getUser } from "../../../data/storage";
import useNav from "../../../hooks/useNav";
import Cat from "../../../assets/img/cat.jpg";

import "./RowSearch.sass";
import PriceParser from "../../../utils/Format";

const detailsPage = "/main/annonce/";
const profilePage = "/profile/annonce/";

const Rowsearch = (props: AnnonceData) => {
  const { to_forward } = useNav();
  const user = getUser();

  const year = () => {
    if (props)
      if (props.year) {
        let yearTab = props.year.split("-");
        return yearTab[1] + "/" + yearTab[0];
      } else return "XX/XXXX";
  };

  return (
    <div
      className="search_item"
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
      <div className="left">
        <div className="picture skeleton">
          <img src={props.pictures ? props.pictures[0] : Cat} alt="" />
        </div>
      </div>
      <div className="right">
        <div className="text">
          <div className="title">
            {`${props.brand?.nom} | ${props.modele?.type.nom} | ${props.motor?.nom} `}
            {/* {`Kazuki Ini | Dsds ds ds `} */}
          </div>
          <div className="subtitle">
            <div className="price">
              <div className="value"> {PriceParser(props.prix)} </div>
              <div className="unit">Ar</div>
            </div>
          </div>
        </div>
        <div className="icon">
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Rowsearch;
