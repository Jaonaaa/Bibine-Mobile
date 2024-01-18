import React, { useState } from "react";

import "./PriceRangeSection.sass";
import Hider from "../../../Hider/Hider";
import { AnimatePresence } from "framer-motion";
import AnnonceBox from "../../../AnnonceBox/AnnonceBox";
import Filter from "./Filter/Filter";
import CrossIcon from "../../../../assets/icons/CrossIcon";
import ArrowSwipeRight from "../../../../assets/icons/ArrowSwipeRight";

// and max
const PriceRangeSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [minValue, maxValue] = [0, 10000];

  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);

  const handleMinMax = (min: number, max: number) => {
    setMin(min);
    setMax(max);
  };
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className={"price_containers"}>
      <div className="content_price">
        <div className="min"> {min} Ar </div>
        <div className="divider_price"> à </div>
        <div className="max"> {max} Ar</div>
      </div>
      <div className="opener" onClick={handleModal}>
        <ArrowSwipeRight />
      </div>
      <AnimatePresence>
        {openModal && (
          <Hider animate="showUp" classCss="glassy">
            <PriceRanger
              closer={handleModal}
              callBack={handleMinMax}
              min_fixed={minValue}
              max_fixed={maxValue}
              min={min}
              max={max}
            />
          </Hider>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PriceRangerProps {
  closer: () => void;
  callBack?: Function;
  min: number;
  max: number;
  min_fixed: number;
  max_fixed: number;
}
const PriceRanger = (props: PriceRangerProps) => {
  const [min, setMin] = useState(props.min);
  const [max, setMax] = useState(props.max);

  const handleMinMax = (min: number, max: number) => {
    setMin(min);
    setMax(max);
  };

  const handleValidate = () => {
    if (props.callBack) props.callBack(min, max);
    props.closer();
  };

  return (
    <>
      <div className="modal_price_ranger">
        <div className="closer" onClick={props.closer}>
          <CrossIcon />
        </div>
        <Filter
          callBack={handleMinMax}
          current_min={props.min}
          current_max={props.max}
          max={props.max_fixed}
          min={props.min_fixed}
        />

        <button onClick={handleValidate}> Valider </button>
      </div>
    </>
  );
};

export default PriceRangeSection;
