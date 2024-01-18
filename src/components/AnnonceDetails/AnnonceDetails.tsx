import React from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import PictureSwaper from "./PictureSwaper/PictureSwaper";
import DetailsAnnonce from "./DetailsAnnonce/DetailsAnnonce";
import ArrowDownBoxIcon from "../../assets/icons/ArrowDownBoxIcon";
import SubDetails from "./SubDetails/SubDetails";

import Picture from "../../assets/img/cat.jpg";

import "./AnnonceDetails.sass";

const AnnonceDetails = () => {
  const scrollToDetails = () => {
    let details = document.getElementById("details_annonnce_container");
    let container = document.querySelector(".details_content_page");
    if (details && container) {
      container.scrollTo(0, details.offsetTop - 5);
    }
  };

  return (
    <PageTemplate tiltePage=" AUDI T9 AZ-REIM " subtitle=" 12/2010 | Essence |SUV ">
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
        <PictureSwaper pictures={["", ""]} />
        <hr />
        <SubDetails />
        <DetailsAnnonce />
      </div>
    </PageTemplate>
  );
};

export default AnnonceDetails;
