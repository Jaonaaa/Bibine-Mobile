import React, { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import "./style/style.sass";
import { motion } from "framer-motion";

interface ModalProps {
  children?: React.ReactNode;
  closer?: MouseEventHandler<any>;
}
const Modal = (props: ModalProps) => {
  return ReactDOM.createPortal(
    <>
      <div id="hider" onClick={props.closer}></div>
      <motion.div
        initial={{ y: "0%", x: "-50%", scale: 0.8 }}
        animate={{ y: "-50%", x: "-50%", scale: 1 }}
        exit={{ y: "105%", x: "-50%", scale: 0.8, opacity: 0 }}
        id="content_modal"
      >
        {props.children}
      </motion.div>
    </>,
    document.getElementById("modal_container") as Element | DocumentFragment
  );
};

export default Modal;
