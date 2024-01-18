import React from "react";
import OfflineIcon from "../../assets/icons/OfflineIcon";
import "./OfflineIndicator.sass";

const OfflineIndicator = () => {
  return (
    <div id="offline_container">
      <div className="icon">
        <OfflineIcon />
      </div>
    </div>
  );
};

export default OfflineIndicator;
