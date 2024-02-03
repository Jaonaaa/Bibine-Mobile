import React, { useState } from "react";
import ArrowRight from "../../../assets/icons/ArrowRight";
import Cat from "../../../assets/img/cat.jpg";
import { getUser } from "../../../data/storage";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import PriceParser from "../../../utils/Format";
import { AnnonceData } from "../../../data/Types";
import "./CardPropositions.sass";
import { alaivoPost, alaivoPut } from "../../../utils/Alaivo";
import Loader from "../../Loader/Loader";

export interface CardPropositionsProps {
  body: AnnonceData;
  date: string;
  id: string;
  sender?: string;
  receiver?: string;
  montant: number;
  state: number;
  user: any;
  block: "receiving" | "sending";
  addNotifs: (status: "OK" | "warning" | "info" | "error" | "succes" | "star", details: string, timer: number) => void;
}
const CardPropositions = (props: CardPropositionsProps) => {
  const { body, date, id, receiver, sender, montant, state, block, addNotifs } = props;
  let [sending, setSending] = useState(false);
  const [hidden, setHidden] = useState(false);
  let user = getUser();
  const [hiddenClass, setHiddenClass] = useState(false);

  const formatDate = () => {
    let dateTab = date.split("-");
    return dateTab[2] + "/" + dateTab[1] + "/" + dateTab[0];
  };

  const validateProposition = async () => {
    if (sending) return false;
    setSending(true);
    let res = (await alaivoPut("bibine/accept/purchases/" + id, null, null, false)) as any;
    console.log(res);
    if (res.status.status === "error") addNotifs("error", res.status.details, 1500);
    else {
      disapearMe();
      addNotifs("OK", "Proposition validé ", 2000);
    }

    setSending(false);
  };

  const validateTransaction = async () => {
    if (sending) return false;
    setSending(true);
    let res = (await alaivoPost("bibine/achat", JSON.stringify({ id: props.id }), null, false)) as any;
    if (res.status.status === "error") addNotifs("error", res.status.details, 1500);
    else {
      addNotifs("OK", "Félicitation !! L'annonce a bien été acheté :) . Merci de faire confiance a Bibine <3", 2000);
      disapearMe();
    }
    setSending(false);
  };

  const disapearMe = () => {
    setHiddenClass(true);
    setTimeout(() => {
      setHidden(true);
    }, 550);
  };

  return (
    <>
      {!hidden && (
        <div className={`card_proposition ${hiddenClass ? "hidden_card" : ""}`}>
          <div className="head">
            <div className="title">
              {body.modele?.nom} {body.brand?.nom}
            </div>
            <div className="pics">
              <div className="pic sender">
                <img src={sender} alt="" />
              </div>
              <div className="pic receiver">
                <img src={receiver} alt="" />
              </div>
              <div className="pic annonce-car">
                <img src={body.pictures ? body.pictures[0] + "" : ""} alt="" />
              </div>
            </div>
          </div>
          <div className="under_head">
            <div className="date">
              <div className="icon">
                <CalendarIcon />
              </div>
              <div className="text">{formatDate()}</div>
            </div>
          </div>
          <div className="price">
            <div className="pres"> Prix de vente : </div>

            <div className="text">{PriceParser(body.prix)}</div>
            <div className="unit">Ar</div>
          </div>
          <div className="price">
            <div className="pres"> Prix proposer : </div>
            <div className="text">{PriceParser(montant)}</div>
            <div className="unit">Ar</div>
          </div>

          <div className="bottom">
            <div className="status">
              {+state === 1 && block === "sending" && (
                <div className="stat_block waiting">
                  <span>En attente de validation...</span>
                </div>
              )}
              {+state === 2 && block === "receiving" && (
                <div className="stat_block transaction">
                  <span>En attente de transaction...</span>
                </div>
              )}
            </div>
            <div className="buttons">
              {+state === 1 && block === "receiving" && (
                <div className="btn" onClick={validateProposition}>
                  {sending ? (
                    <Loader white size="1.05rem" weigth="0.8rem" />
                  ) : (
                    <>
                      <div className="text">Valider</div>
                      <div className="icon">
                        <ArrowRight />
                      </div>
                    </>
                  )}
                </div>
              )}
              {+state === 2 && block === "sending" && (
                <div className="btn" onClick={validateTransaction}>
                  {sending ? (
                    <Loader white size="1.05rem" weigth="0.8rem" />
                  ) : (
                    <>
                      <div className="text">Entamer la transaction</div>
                      <div className="icon">
                        <ArrowRight />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
/// mpivarotra

/// mpividy

// bibine/achat
// POST le purchase entity

export default CardPropositions;
