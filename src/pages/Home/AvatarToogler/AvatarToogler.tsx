import { IonMenuToggle } from "@ionic/react";
import MyAvatar from "../../../components/AvatarUser/MyAvatar/MyAvatar";
import "./AvatarToogler.sass";

const AvatarToogler = () => {
  return (
    <div className="avatar_toogler">
      <IonMenuToggle>
        <MyAvatar />
      </IonMenuToggle>
    </div>
  );
};

export default AvatarToogler;
