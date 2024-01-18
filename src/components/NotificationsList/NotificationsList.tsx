import PageTemplate from "../PageTemplate/PageTemplate";
import NotifsBlock from "./NotifsBlock/NotifsBlock";
import { useEffect } from "react";
import useNotification from "../../hooks/useNotifications";
import "./NotificationsList.sass";

const NotificationsList: React.FC = () => {
  const { scheduleNow } = useNotification();
  useEffect(() => {
    scheduleNow(
      "Quelqu'un vous a envoyer un message",
      `Salama oo!! Otrin kay ny tena fara vidiny anleh Starex-GT année 2015 anareo io kay azafady fa mi intéresser anah 😊.
      `,
      55,
      "openPage"
    );
  }, []);
  return (
    <PageTemplate
      tiltePage={"Notifications"}
      contentAllScreen={false}
      subtitle="Ici apparaitront les notifications que vous aviez recue."
    >
      <div className="notifications_container">
        <NotifsBlock title={"Nouveau"} />
        <NotifsBlock title={"Plus tôt"} />
      </div>
    </PageTemplate>
  );
};

export default NotificationsList;
