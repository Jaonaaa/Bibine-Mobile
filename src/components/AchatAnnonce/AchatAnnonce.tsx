import React, { useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import { useParams } from "react-router-dom";
import PriceParser, { getNumberPrice, getRandomNumber } from "../../utils/Format";
import "./AchatAnnonce.sass";
import Input from "../Input/Input";
import HelperText from "../AddAnnonce/HelperText/HelperText";
import ButtonCartoon from "../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import Hider from "../Hider/Hider";
import { AnimatePresence } from "framer-motion";
import MyPropositions from "./MyPropositions/MyPropositions";

interface AchatAnnonce {
  id: string; //idAnnonce alaiana avy am path erry ambony
}
const AchatAnnonce = () => {
  const { id } = useParams<AchatAnnonce>();
  const [transactionOn, setTransactionOn] = useState(false);

  const price_article = getRandomNumber(10000, 500000);

  const buy = () => {
    setTransactionOn(true);
    setTimeout(() => {
      setTransactionOn(false);
    }, 2000);
  };

  return (
    <PageTemplate tiltePage="Paiement" subtitle="Article : Audi T9 AZ-REIM ">
      <div className="row_annonce">
        <div className="label">Mon solde </div>
        <div className="value">
          <div className="price">{getNumberPrice(150000, 250000)}</div>
          <div className="unit">Ar</div>
        </div>
      </div>
      <div className="row_annonce">
        <div className="label">Prix de l'article </div>
        <div className="value">
          <div className="price">{PriceParser(price_article)}</div>
          <div className="unit">Ar</div>
        </div>
      </div>
      <Input
        defaultValue={"" + price_article}
        type="number"
        title="Votre prix"
        fullWidth
        name="my_price"
        onChange={() => {}}
      />
      <HelperText textHelp="Le vendeur sera notifié de votre proposition d'achat et le montant entré sera automtiquement déduit de votre compte en cas de validation de votre offre d'achat par le vendeur" />
      <ButtonCartoon callback={buy} text="Valider" className="btn_validation_achat" />
      <div className="proposition">
        <div className="label" id="my_propositions">
          Vos propositions <span className="number"> 3 </span>
        </div>
      </div>
      <AnimatePresence>{transactionOn && <Hider classCss="white" loader></Hider>}</AnimatePresence>
      <MyPropositions />
    </PageTemplate>
  );
};

export default AchatAnnonce;
