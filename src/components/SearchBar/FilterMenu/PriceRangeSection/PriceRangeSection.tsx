import React, { useState } from "react";
import Hider from "../../../Hider/Hider";
import { AnimatePresence } from "framer-motion";
import Filter from "./Filter/Filter";
import CrossIcon from "../../../../assets/icons/CrossIcon";
import ArrowSwipeRight from "../../../../assets/icons/ArrowSwipeRight";
import useMyNotifs from "../../../../utilsComponent/Notif/useNotifs";
import "./PriceRangeSection.sass";

// and max
interface PriceRangeSectionProps {
  min: number;
  max: number;
  unit: string;
  diff: number;
  callback: Function;
  name: string;
  clear: Function;
}
const PriceRangeSection = (props: PriceRangeSectionProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [minValue, maxValue] = [props.min, props.max];

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [empty, setEmpty] = useState(true);

  const handleMinMax = (min: number, max: number) => {
    setMin(min);
    setMax(max);
    setEmpty(false);
    props.callback({
      name: props.name,
      value: {
        min: min,
        max: max,
      },
    });
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const clearData = () => {
    props.clear(props.name);
    setEmpty(true);
    setMin(0);
    setMax(0);
  };
  return (
    <div className={"price_containers"}>
      {!empty && (
        <div className="clearer">
          <div className="round" onClick={clearData}>
            <CrossIcon />
          </div>
        </div>
      )}

      <div className="content_price">
        <div className="min">
          {min} {props.unit}
        </div>
        <div className="divider_price"> à </div>
        <div className="max">
          {max} {props.unit}
        </div>
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
              diff={props.diff}
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
  diff: number;
}
const PriceRanger = (props: PriceRangerProps) => {
  const [min, setMin] = useState(props.min);
  const [max, setMax] = useState(props.max);
  const { addNotifs, notifs } = useMyNotifs();

  const handleMinMax = (min: number, max: number) => {
    setMin(min);
    setMax(max);
  };

  const handleValidate = () => {
    console.log(min, max);
    if (+min >= +max) {
      addNotifs("error", "La valeur minimun devrait être inférieure au valeur maximun", 1500);
      //
    } else {
      if (props.callBack) props.callBack(min, max);
      props.closer();
    }
  };

  return (
    <>
      {notifs.map((notif) => notif)}
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
          diff={props.diff}
        />

        <button onClick={handleValidate}> Valider </button>
      </div>
    </>
  );
};

export default PriceRangeSection;
