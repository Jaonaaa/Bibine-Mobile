import React, { useEffect, useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { useParams } from "react-router-dom";
import PriceParser, { getNumberPrice } from "../../utils/Format";
import Input from "../Input/Input";
import HelperText from "../AddAnnonce/HelperText/HelperText";
import ButtonCartoon from "../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import Hider from "../Hider/Hider";
import { AnimatePresence } from "framer-motion";
import MyPropositions from "./MyPropositions/MyPropositions";
import { getUser, storage } from "../../data/storage";
import { alaivoGet, alaivoPost } from "../../utils/Alaivo";
import useMyNotifs from "../../utilsComponent/Notif/useNotifs";
import "./AchatAnnonce.sass";
import Loader from "../Loader/Loader";

interface AchatAnnonce {
  id: string; //idAnnonce alaiana avy am path erry ambony
}
const AchatAnnonce = () => {
  const { id } = useParams<AchatAnnonce>();
  const [transactionOn, setTransactionOn] = useState(false);
  const { addNotifs, amount, onSend, notifs } = useGetData();
  const [amountEntered, setAmountEntered] = useState(0);
  const price_article = localStorage.getItem(storage.price_);
  const user = getUser();
  const buy = async () => {
    if (checkAmountValide()) {
      setTransactionOn(true);

      let data = {
        annonce: id,
        montant: amountEntered,
      };

      let res = await alaivoPost(`bibine/user/${user.id}/purchases`, JSON.stringify(data), null, false);
      console.log(res);
      addNotifs("OK", "Votre proposition à bien été envoyé ", 1750);
      setTransactionOn(false);
    }
  };

  const checkAmountValide = () => {
    if (price_article)
      if (+amountEntered > 0) {
        return true;
      } else {
        addNotifs("error", "La somme entrer doit etre positive ou superieur a 0", 1750);
        return false;
      }
  };

  const getOut = () => {
    let price_annonce = localStorage.getItem(storage.price_);
    if (price_annonce === null) {
      window.history.back();
    }
  };

  useEffect(() => {
    setAmountEntered(amount);
  }, [onSend]);

  const handleAmount = (e: any) => {
    setAmountEntered(e.target.value);
  };

  getOut();

  return (
    <PageTemplate tiltePage="Paiement" subtitle="Article : Audi T9 AZ-REIM ">
      {notifs.map((notif) => notif)}
      <div className="row_annonce">
        <div className="label">Mon solde </div>
        <div className="value">
          <div className="price">{onSend ? <Loader size="1.6rem" /> : PriceParser(amount)}</div>
          <div className="unit">Ar</div>
        </div>
      </div>
      <div className="row_annonce">
        <div className="label">Prix de l'article </div>
        <div className="value">
          <div className="price">
            {onSend ? <Loader size="1.6rem" /> : PriceParser(price_article !== null ? (+price_article as any) : 0)}
          </div>
          <div className="unit">Ar</div>
        </div>
      </div>
      <Input
        defaultValue={"" + amountEntered}
        type="number"
        title="Votre prix"
        fullWidth
        name="my_price"
        onChange={handleAmount}
      />
      <HelperText textHelp="Le vendeur sera notifié de votre proposition d'achat et le montant entré sera automtiquement déduit de votre compte en cas de validation de votre offre d'achat par le vendeur" />
      <ButtonCartoon callback={buy} text="Valider" className="btn_validation_achat" />
      <div className="proposition">
        {/* <div className="label" id="my_propositions">
          Vos propositions <span className="number"> 3 </span>
        </div> */}
      </div>
      <AnimatePresence>
        {transactionOn && (
          <Hider classCss="white" loader>
            <div className="text_hider">Vérification et envoie de la proposition en cours...</div>
          </Hider>
        )}
      </AnimatePresence>
      {/* <MyPropositions /> */}
    </PageTemplate>
  );
};

const useGetData = () => {
  const { addNotifs, notifs } = useMyNotifs();
  const [amount, setAmount] = useState(0);
  const [onSend, setOnSend] = useState(false);
  const user = getUser();

  const getAmout = async () => {
    setOnSend(true);
    let res = (await alaivoGet(`bibine/user/${user.id}/solde`, null, false)) as any;
    setOnSend(false);
    setAmount(res.data);
  };

  useEffect(() => {
    getAmout();
  }, []);
  return { amount, onSend, notifs, addNotifs };
};
export default AchatAnnonce;
