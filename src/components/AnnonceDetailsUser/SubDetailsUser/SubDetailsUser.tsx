import UnderPriceIcon from "../../../assets/icons/UnderPriceIcon";
import { AnnonceData } from "../../../data/Types";
import PriceParser from "../../../utils/Format";

const SubDetailsUser = (props: AnnonceData) => {
  const { vendeur, stock, state, prix, favoris, loaded } = props;

  return (
    <div className="sub_container">
      <div className="state_product">
        {state === 0 ? (
          <div className="state sold_out">Article non disponible </div>
        ) : (
          <div className={`state in_stock ${loaded ? "" : "skeleton"}`}>Article disponible </div>
        )}

        <div className="text">
          En stock : <span className="quantity"> {loaded ? stock : 0} </span>
        </div>
      </div>

      <div className="header">
        <div className="price_box user_price_box">
          <div className="upper">
            <div className="price_text ">
              {loaded ? PriceParser(prix) : <span className="blank_price skeleton"> </span>}{" "}
            </div>
            <div className="unit"> Ar </div>
          </div>
          <div className="under">
            <UnderPriceIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDetailsUser;
