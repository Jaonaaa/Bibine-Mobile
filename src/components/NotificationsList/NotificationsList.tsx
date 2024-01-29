import PageTemplate from "../PageTemplate/PageTemplate";
import NotifsBlock from "./NotifsBlock/NotifsBlock";
import { useEffect, useState } from "react";
import useNotification from "../../hooks/useNotifications";
import { getUser } from "../../data/storage";
import { alaivoPost } from "../../utils/Alaivo";
import "./NotificationsList.sass";

const NotificationsList: React.FC = () => {
  const { scheduleNow } = useNotification();
  const {} = useGetData();
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

const useGetData = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    getAllTypes();
  }, []);

  const getAllTypes = async () => {
    setloaded(false);
    let user = getUser();
    let res = (await alaivoPost(`notification`, JSON.stringify({ receiverEmail: user.email }), null, false)) as any;
    setloaded(true);
    setNotifications(res);
  };
  return { notifications, loaded };
};

export default NotificationsList;
