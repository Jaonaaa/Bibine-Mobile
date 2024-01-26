import { IonAvatar } from "@ionic/react";
import { useEffect, useState } from "react";
import { getUser, storage } from "../../../data/storage";

const MyAvatar = () => {
  const [userPicture, setUserPicture] = useState<any>("https://media2.giphy.com/media/tN1YiOeZmIRKE/200_s.gif");

  useEffect(() => {
    let user = getUser();
    if (user) {
      if (user.profile) setUserPicture(user.profile);
    }
  }, []);
  return (
    <div className="my_avatar">
      <IonAvatar className="avatar">
        <img alt="Avatar" src={userPicture} />
      </IonAvatar>
    </div>
  );
};

export default MyAvatar;
