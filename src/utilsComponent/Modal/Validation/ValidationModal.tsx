import React, { MouseEventHandler } from "react";
import Modal from "../Modal";
import Box from "../../Box/Box";

import "./ValidationModal.sass";

interface ValidationModalProps {
  content: React.ReactNode | string;
  closer?: MouseEventHandler<HTMLButtonElement>;
  callBack?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  icon?: React.ReactNode | string;
  cancelOn?: boolean;
  validationText?: string;
}

const ValidationModal = (props: ValidationModalProps) => {
  return (
    <>
      <Modal closer={props.closer}>
        <Box>
          <div className="validation-container">
            {props.icon != null ? (
              <div className="status_container">
                <div className="icon"></div>
              </div>
            ) : (
              ""
            )}

            <div className="details_container">
              <div className="title"> {props.title} </div>
              <div className="content">{props.content}</div>
              <div className="buttons">
                {props.cancelOn !== false ? (
                  <button onClick={props.closer} className="cancel">
                    Annuler
                  </button>
                ) : (
                  ""
                )}
                <button onClick={props.callBack} className="confirm">
                  {props.validationText ? props.validationText : "Valider"}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ValidationModal;
