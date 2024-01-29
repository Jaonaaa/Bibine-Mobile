import { useState } from "react";
import useNav from "../../../hooks/useNav";
import CartIcon from "../../../assets/icons/CartIcon";
import FavoriIcon from "../../../assets/icons/FavoriIcon";
import MessageAnnonceIcon from "../../../assets/icons/MessageAnnonceIcon";
import UnderPriceIcon from "../../../assets/icons/UnderPriceIcon";
import PriceParser, { getNumberPrice } from "../../../utils/Format";
import ButtonCartoon from "../ButtonCartoon/ButtonCartoon";
import { URL_message, alaivoDelete, alaivoPost } from "../../../utils/Alaivo";
import ValidationModal from "../../../utilsComponent/Modal/Validation/ValidationModal";
import { AnimatePresence } from "framer-motion";
import { AnnonceData } from "../../../data/Types";
import { getUser } from "../../../data/storage";
import "./SubDetails.sass";

const SubDetails = (props: AnnonceData) => {
  const { vendeur, stock, state, prix, favoris, loaded } = props;
  const user = getUser();
  const { to_forward } = useNav();

  const addToFavorites = async () => {
    if (user) {
      let res = (await alaivoPost(`bibine/user/${user.id}/annonces_favoris/${props.id}`, null, true)) as any;
      console.log(res);
    }
  };

  const removeFromFavorites = async () => {
    if (user) {
      let res = (await alaivoDelete(`bibine/user/${user.id}/annonces_favoris/${props.id}`, null, true)) as any;
      console.log(res);
    }
  };

  return (
    <div className="sub_container">
      <div className="state_product">
        {state === 0 ? (
          <div className="state sold_out">Article non disponible </div>
        ) : (
          <div className={`state in_stock ${loaded ? "" : "skeleton"}`}>Article disponible </div>
        )}

        {/* <div className="text">
          En stock : <span className="quantity"> {loaded ? stock : 0} </span>
        </div> */}
      </div>

      <div className="header">
        <div className="price_box">
          <div className="upper">
            <div className="price_text">{loaded ? PriceParser(prix) : <span className="blank_price skeleton"> </span>} </div>
            <div className="unit"> Ar </div>
          </div>
          <div className="under">
            <UnderPriceIcon />
          </div>
        </div>
        <div className="icon">
          <Message loaded={loaded} />
          <div
            className={`fav ico ${user ? (favoris?.includes(user.id) ? "fav_on" : "") : ""}`}
            onClick={() => {
              if (user) {
                if (favoris?.includes(user.id)) {
                  //
                  removeFromFavorites();
                } else addToFavorites();
              }
            }}
          >
            <FavoriIcon />
          </div>
        </div>
      </div>
      <div className="content_sub">
        <ButtonCartoon
          icon={loaded ? <CartIcon /> : null}
          callback={() => {
            if (loaded) to_forward("/main/annonce/achat/" + vendeur?.idvendeur);
          }}
          text={loaded ? "Acheter" : "(* ￣︿￣)"}
        />
      </div>
    </div>
  );
};

interface MessageProps {
  idUser?: string;
  idSeller?: string;
  idAnnonce?: string;
  loaded?: boolean;
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
          if (props.loaded) setMessageRedirection(true);
        }}
      >
        <MessageAnnonceIcon />
      </div>
    </>
  );
};

export default SubDetails;
