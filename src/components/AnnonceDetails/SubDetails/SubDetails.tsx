import { useState } from "react";
import useNav from "../../../hooks/useNav";
import CartIcon from "../../../assets/icons/CartIcon";
import FavoriIcon from "../../../assets/icons/FavoriIcon";
import MessageAnnonceIcon from "../../../assets/icons/MessageAnnonceIcon";
import UnderPriceIcon from "../../../assets/icons/UnderPriceIcon";
import PriceParser, { getNumberPrice } from "../../../utils/Format";
import ButtonCartoon from "../ButtonCartoon/ButtonCartoon";
import { URL_message } from "../../../utils/Alaivo";
import ValidationModal from "../../../utilsComponent/Modal/Validation/ValidationModal";
import { AnimatePresence } from "framer-motion";
import { AnnonceData } from "../../../data/Types";
import "./SubDetails.sass";
import { getUser } from "../../../data/storage";

const SubDetails = (props: AnnonceData) => {
  const { vendeur, stock, state, prix, favoris } = props;
  const user = getUser();
  const { to_forward } = useNav();

  return (
    <div className="sub_container">
      <div className="state_product">
        {state === 0 ? (
          <div className="state sold_out">Article non disponible </div>
        ) : (
          <div className="state in_stock">Article disponible </div>
        )}

        <div className="text">
          En stock : <span className="quantity"> {stock} </span>
        </div>
      </div>

      <div className="header">
        <div className="price_box">
          <div className="upper">
            <div className="price_text"> {PriceParser(prix)} </div>
            <div className="unit"> Ar </div>
          </div>
          <div className="under">
            <UnderPriceIcon />
          </div>
        </div>
        <div className="icon">
          <Message />
          <div className={`fav ico ${favoris?.includes(user.id) ? "fav_on" : ""}`}>
            <FavoriIcon />
          </div>
        </div>
      </div>
      <div className="content_sub">
        <ButtonCartoon
          icon={<CartIcon />}
          callback={() => {
            to_forward("/main/annonce/achat/" + vendeur?.idvendeur);
          }}
          text="Acheter"
        />
      </div>
    </div>
  );
};

interface MessageProps {
  idUser?: string;
  idSeller?: string;
  idAnnonce?: string;
}
const Message = (props: MessageProps) => {
  const [messageRedirectionOn, setMessageRedirection] = useState(false);

  const redirectMessage = () => {
    window.location.href = URL_message;
  };

  return (
    <>
      <AnimatePresence>
        {messageRedirectionOn && (
          <ValidationModal
            content="Vous allez être rediriger vers la page de conversation de vous et ce vendeur {} en continuant , êtes vous sur d'y aller ?"
            callBack={redirectMessage}
            closer={() => {
              setMessageRedirection(false);
            }}
            title="Contacter le vendeur"
          />
        )}
      </AnimatePresence>
      <div
        className="message ico"
        onClick={() => {
          setMessageRedirection(true);
        }}
      >
        <MessageAnnonceIcon />
      </div>
    </>
  );
};

export default SubDetails;
