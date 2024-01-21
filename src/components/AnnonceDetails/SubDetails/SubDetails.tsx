import { useState } from "react";
import useNav from "../../../hooks/useNav";
import CartIcon from "../../../assets/icons/CartIcon";
import FavoriIcon from "../../../assets/icons/FavoriIcon";
import MessageAnnonceIcon from "../../../assets/icons/MessageAnnonceIcon";
import UnderPriceIcon from "../../../assets/icons/UnderPriceIcon";
import { getNumberPrice } from "../../../utils/Format";
import ButtonCartoon from "../ButtonCartoon/ButtonCartoon";
import "./SubDetails.sass";
import { URL_message } from "../../../utils/Alaivo";
import ValidationModal from "../../../utilsComponent/Modal/Validation/ValidationModal";
import { AnimatePresence } from "framer-motion";

interface SubDetailsProps {
  id: string; //id_annonce
}
const SubDetails = (props: SubDetailsProps) => {
  const { id } = props;
  const { to_forward } = useNav();

  return (
    <div className="sub_container">
      <div className="state_product">
        {/* <div className="state sold_out">Article non disponible </div> */}
        <div className="state in_stock">Article disponible </div>
        <div className="text">
          En stock : <span className="quantity"> 11 </span>
        </div>
      </div>

      <div className="header">
        <div className="price_box">
          <div className="upper">
            <div className="price_text"> {getNumberPrice(1500000, 50000000)} </div>
            <div className="unit"> Ar </div>
          </div>
          <div className="under">
            <UnderPriceIcon />
          </div>
        </div>
        <div className="icon">
          <Message />
          <div className="fav fav_on ico">
            <FavoriIcon />
          </div>
        </div>
      </div>
      <div className="content_sub">
        <ButtonCartoon
          icon={<CartIcon />}
          callback={() => {
            to_forward("/main/annonce/achat/" + id);
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
