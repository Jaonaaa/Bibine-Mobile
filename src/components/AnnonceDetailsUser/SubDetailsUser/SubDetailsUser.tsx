import UnderPriceIcon from "../../../assets/icons/UnderPriceIcon";

const SubDetailsUser = () => {
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
        <div className="price_box user_price_box">
          <div className="upper">
            <div className="price_text "> 25.000.000 </div>
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
