import React from "react";
import ArrowRight from "../../../assets/icons/ArrowRight";
import "./CardPropositions.sass";

const CardPropositions = () => {
  return (
    <div className="card_proposition">
      <div className="head">
        <div className="title"> Audi | Audi 43 GT </div>
        <div className="pics">
          <div className="pic sender"></div>
          <div className="pic receiver"></div>
          <div className="pic annonce-car"></div>
        </div>
      </div>
      <div className="under_head">
        <div className="date">
          <div className="icon"></div>
          <div className="text">04/04/2020</div>
        </div>
      </div>

      <div className="bottom">
        <div className="status">
          <div className="stat_block waiting">
            <span>En attente...</span>
          </div>
        </div>
        <div className="buttons">
          <div className="btn">
            <div className="text">Valider</div>
            <div className="icon">
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPropositions;
