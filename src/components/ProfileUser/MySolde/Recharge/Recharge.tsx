import { IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import "./Recharge.sass";
import ButtonCartoon from "../../../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import MoneyBagIcon from "../../../../assets/icons/MoneyBagIcon";
import MadaFlagIcon from "../../../../assets/icons/MadaFlagIcon";
import HelperText from "../../../AddAnnonce/HelperText/HelperText";
import Loader from "../../../Loader/Loader";
import Hider from "../../../Hider/Hider";
import { AnimatePresence } from "framer-motion";

interface RechargeProps {
  callBack: Function;
  errorCallback?: Function;
}
const Recharge = (props: RechargeProps) => {
  const [amount, setAmount] = useState(0);
  const modal = useRef<HTMLIonModalElement>(null);
  const inputPay = useRef<HTMLInputElement>(null);
  const [transactionOn, setTransactionOn] = useState(false);

  const handleAmount = (e: any) => {
    const value = Math.abs(+e.target.value);
    setAmount(value);
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    setTransactionOn(true);
    setTimeout(() => {
      setTransactionOn(false);
      // no error

      setTimeout(() => {
        if (amount > 0) {
          props.callBack(null, amount);
          modal.current?.dismiss();
        } else {
          if (props.errorCallback) props?.errorCallback();
        }
      }, 200);
    }, 2500);
  };
  useEffect(() => {}, []);

  const focusInput = () => {
    if (inputPay.current != null) inputPay.current?.focus();
  };

  return (
    <IonModal
      ref={modal}
      trigger="recharge_modal"
      className="modal_content_more auto_height_modal"
      initialBreakpoint={0.99}
      breakpoints={[0, 0.99]}
      onDidPresent={focusInput}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title_modal_content">Recharger mon compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form className="container_recharge" onSubmit={handleForm}>
          <div className="money_details">
            <div className="currency_box">
              <div className="top">
                <div className="devise"> MGA </div>
                <div className="flag">
                  <MadaFlagIcon />
                </div>
              </div>
              <div className="bottom">
                <div className="text">Devise </div>
              </div>
            </div>
            <div className="input_money">
              <input
                type="number"
                className="money_input"
                ref={inputPay}
                autoFocus
                placeholder="0.00"
                onChange={handleAmount}
                value={amount}
              />

              <div className="unit"> Ar </div>
            </div>
          </div>
          <HelperText textHelp={"Veuillez entrer la somme que vous souhaitez rechar ger sur votre compte."} />
          <AnimatePresence>{transactionOn && <Hider classCss="glassy" loader />}</AnimatePresence>
          <ButtonCartoon className="recharge_btn" callback={() => {}} icon={<MoneyBagIcon />} text="Recharger" />
        </form>
      </IonContent>
    </IonModal>
  );
};

export default Recharge;
