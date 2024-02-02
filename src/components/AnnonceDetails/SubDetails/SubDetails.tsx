import { useEffect, useState } from "react";
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
import { getUser, storage } from "../../../data/storage";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";

import "./SubDetails.sass";
import Loader from "../../Loader/Loader";

const SubDetails = (props: AnnonceData) => {
  const { vendeur, stock, state, prix, favoris, loaded } = props;
  const { addNotifs, notifs } = useMyNotifs();
  const [fav, setFav] = useState(false);
  const user = getUser();
  const [loadFav, setLoadFav] = useState(false);
  const { to_forward } = useNav();

  const addToFavorites = async () => {
    if (user) {
      setLoadFav(true);
      let res = (await alaivoPost(`bibine/user/${user.id}/annonces_favoris/${props.id}`, null, true)) as any;
      setLoadFav(false);
      addNotifs("star", "Ajouté aux favoris", 1500);
      setFav(true);
    }
  };

  const removeFromFavorites = async () => {
    if (user) {
      setLoadFav(true);
      let res = (await alaivoDelete(`bibine/user/${user.id}/annonces_favoris/${props.id}`, null, true)) as any;
      setLoadFav(false);
      addNotifs("info", "Enlever des favoris", 1500);
      setFav(false);
    }
  };

  const checkFav = () => {
    if (user) {
      if (favoris?.includes(user.id)) {
        setFav(true);
      }
    }
  };

  const handleLoadFav = () => {
    setLoadFav(!loadFav);
  };

  useEffect(() => {
    checkFav();
  }, [loaded]);

  return (
    <div className="sub_container">
      {notifs.map((notif) => notif)}
      <div className="state_product">
        {state === 2 ? (
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
          <Message loaded={loaded} addNotifs={addNotifs} user={user} />
          <div
            className={`fav ico ${user ? (fav ? "fav_on" : "") : ""}`}
            onClick={() => {
              if (user && !loadFav) {
                if (fav) {
                  removeFromFavorites();
                } else {
                  addToFavorites();
                }
              }
              if (user === null) {
                addNotifs("info", "Vous devez être connecté avant de pouvoir faire cette action.", 1500);
              }
            }}
          >
            {loadFav ? <Loader size="1.2rem" /> : <FavoriIcon />}
          </div>
        </div>
      </div>
      <div className="content_sub">
        <ButtonCartoon
          icon={loaded ? <CartIcon /> : null}
          className={state === 2 ? "disabled" : ""}
          callback={() => {
            if (state === 2) {
              addNotifs("info", "L'article n'est plus disponible", 1500);
            } else if (user === null) {
              addNotifs("info", "Vous devez être connecté avant de pouvoir poursuivre vers l'achat de cette article.", 1500);
            } else if (loaded) {
              localStorage.setItem(storage.price_, "" + prix);
              to_forward("/main/annonce/achat/" + props.id);
            }
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
  addNotifs: (status: "OK" | "warning" | "info" | "error" | "succes" | "star", details: string, timer: number) => void;
  user: any;
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
          if (props.user === null)
            props.addNotifs("info", "Vous devez être connecté avant de pouvoir faire cette action.", 1500);
          else if (props.loaded) setMessageRedirection(true);
        }}
      >
        <MessageAnnonceIcon />
      </div>
    </>
  );
};

export default SubDetails;
