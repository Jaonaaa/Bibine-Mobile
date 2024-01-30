import React, { useState } from "react";
import EditIcon from "../../../assets/icons/EditIcon";
import ArrowRight from "../../../assets/icons/ArrowRight";
import "./EditStatus.sass";

const EditStatus = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOpen = () => {
    setShowOptions(!showOptions);
  };
  return (
    <>
      <div id="edit_btn" onClick={handleOpen}>
        {showOptions && (
          <div
            className="block_flottant"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="text">Changer son status </div>
            <div className="icon">
              <ArrowRight />
            </div>
          </div>
        )}
        <EditIcon />
      </div>
    </>
  );
};

export default EditStatus;
