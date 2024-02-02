import React, { useState } from "react";
import EditIcon from "../../../assets/icons/EditIcon";
import ArrowRight from "../../../assets/icons/ArrowRight";
import Loader from "../../Loader/Loader";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";
import { AnnonceData } from "../../../data/Types";
import "./EditStatus.sass";
import { alaivoPost, alaivoPut } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";

interface EditStatusProps {
  annonce?: AnnonceData | null;
  setAnnonce: Function;
}

const EditStatus = (props: EditStatusProps) => {
  const { annonce, setAnnonce } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [changing, setChanging] = useState(false);
  const { addNotifs, notifs } = useMyNotifs();
  const user = getUser();

  const handleOpen = () => {
    setShowOptions(!showOptions);
  };

  const invalidateStatus = async () => {
    setChanging(true);
    await alaivoPut(`bibine/user/${user.id}/annonces/${annonce?.id}/unvalide`, null, null, false).catch(() => {
      setChanging(false);
      addNotifs("error", "Une erreur s'est passé.", 1500);
    });
    setAnnonce((annonce: any) => ({ ...annonce, validity: 1 }));
    setChanging(false);
    addNotifs("succes", "Le status de l'annonce à été changer", 1500);
    setShowOptions(false);
  };

  const validateStatus = async () => {
    setChanging(true);
    await alaivoPut(`bibine/user/${user.id}/annonces/${annonce?.id}/valide`, null, null, false).catch(() => {
      setChanging(false);
      addNotifs("error", "Une erreur s'est passé.", 1500);
    });
    setAnnonce((annonce: any) => ({ ...annonce, validity: 0 }));
    setChanging(false);
    addNotifs("succes", "Le status de l'annonce à été changer", 1500);
    setShowOptions(false);
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
              if (annonce?.validity === 0) invalidateStatus();
              else validateStatus();
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
