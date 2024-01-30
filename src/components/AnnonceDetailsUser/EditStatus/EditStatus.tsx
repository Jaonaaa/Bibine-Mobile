import React, { useState } from "react";
import EditIcon from "../../../assets/icons/EditIcon";
import ArrowRight from "../../../assets/icons/ArrowRight";
import Loader from "../../Loader/Loader";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";
import "./EditStatus.sass";

const EditStatus = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [changing, setChanging] = useState(false);
  const { addNotifs, notifs } = useMyNotifs();

  const handleOpen = () => {
    setShowOptions(!showOptions);
  };

  const updateStatus = () => {
    setChanging(true);
    setTimeout(() => {
      setChanging(false);
      addNotifs("succes", "Le status de l'annonce à été changer", 1500);
      setShowOptions(false);
    }, 2000);
  };
  return (
    <>
      {notifs.map((notif) => notif)}
      <div id="edit_btn" onClick={handleOpen}>
        {showOptions && (
          <div
            className={`block_flottant ${changing ? "centered" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStatus();
            }}
          >
            {changing ? (
              <Loader white size="1.5rem" />
            ) : (
              <>
                <div className="text">Changer son status </div>
                <div className="icon">
                  <ArrowRight />
                </div>
              </>
            )}
          </div>
        )}
        <EditIcon />
      </div>
    </>
  );
};

export default EditStatus;
