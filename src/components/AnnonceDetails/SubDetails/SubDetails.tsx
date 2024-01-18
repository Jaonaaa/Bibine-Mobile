import CartIcon from "../../../assets/icons/CartIcon";
import FavoriIcon from "../../../assets/icons/FavoriIcon";
import MessageAnnonceIcon from "../../../assets/icons/MessageAnnonceIcon";
import UnderPriceIcon from "../../../assets/icons/UnderPriceIcon";
import { getNumberPrice } from "../../../utils/Format";
import ButtonCartoon from "../ButtonCartoon/ButtonCartoon";
import "./SubDetails.sass";

const SubDetails = () => {
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
          <div className="message ico">
            <MessageAnnonceIcon />
          </div>
          <div className="fav fav_on ico">
            <FavoriIcon />
          </div>
        </div>
      </div>
      <div className="content_sub">
        <ButtonCartoon icon={<CartIcon />} callback={() => {}} text="Acheter" />
      </div>
    </div>
  );
};

export default SubDetails;
