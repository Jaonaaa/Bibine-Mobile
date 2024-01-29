import React, { useEffect, useState } from "react";
import ArrowSwipeRight from "../../../../assets/icons/ArrowSwipeRight";
import { AnimatePresence } from "framer-motion";
import Hider from "../../../Hider/Hider";
import CrossIcon from "../../../../assets/icons/CrossIcon";
import Input from "../../../Input/Input";
import "./DateSection.sass";
import useMyNotifs from "../../../../utilsComponent/Notif/useNotifs";

interface DateSectionProps {
  callback: Function;
  name: string;
}

const DateSection = (props: DateSectionProps) => {
  const [openModal, setOpenModal] = useState(false);

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleMinMax = (min: string, max: string) => {
    setMin(min);
    setMax(max);
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
  useEffect(() => {
    let date = new Date();
    // month date now
    setMax(date.toISOString().slice(0, 10));
    // min
    date.setFullYear(date.getFullYear() - 2);
    setMin(date.toISOString().slice(0, 10));
  }, []);

  return (
    <div className={"price_containers"}>
      <div className="content_price">
        <div className="min"> {min} </div>
        <div className="divider_price"> à </div>
        <div className="max"> {max} </div>
      </div>
      <div className="opener" onClick={handleModal}>
        <ArrowSwipeRight />
      </div>
      <AnimatePresence>
        {openModal && (
          <Hider animate="showUp" classCss="glassy">
            <DateRange
              closer={handleModal}
              callBack={handleMinMax}
              min={min}
              max={max}
            />
          </Hider>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DateIntervalProps {
  closer: () => void;
  callBack?: Function;
  min: string;
  max: string;
}
const DateRange = (props: DateIntervalProps) => {
  const [min, setMin] = useState(props.min);
  const [max, setMax] = useState(props.max);
  const { addNotifs, notifs } = useMyNotifs();

  const handleMin = (min: any) => {
    setMin(min.target.value);
  };
  const handleMax = (max: any) => {
    setMax(max.target.value);
  };

  const handleValidate = () => {
    let debut = new Date(min);
    let fin = new Date(max);
    if (debut >= fin) {
      //
      addNotifs(
        "error",
        "La date de début doit être supérieure au date de fin",
        1500
      );
      //
    } else {
      if (props.callBack) props.callBack(min, max);
      props.closer();
    }
  };

  return (
    <>
      {notifs.map((notif) => notif)}
      <div className="modal_price_ranger  modal_dates">
        <div className="closer" onClick={props.closer}>
          <CrossIcon />
        </div>

        <div className="date_ranger_section">
          <Input
            title="Date Debut"
            fullWidth
            name="date_debut"
            type="date"
            onChange={handleMin}
            defaultValue={min}
          />
          <Input
            title="Date Fin"
            fullWidth
            defaultValue={max}
            name="date_fin"
            type="date"
            onChange={handleMax}
          />
        </div>

        <button onClick={handleValidate}> Valider </button>
      </div>
    </>
  );
};

export default DateSection;
