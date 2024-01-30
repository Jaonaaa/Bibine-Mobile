import PageTemplate from "../PageTemplate/PageTemplate";
import NotifsBlock from "./NotifsBlock/NotifsBlock";
import { useEffect, useState } from "react";
import { getUser } from "../../data/storage";
import { alaivoGet } from "../../utils/Alaivo";
import "./NotificationsList.sass";
import { IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";

const NotificationsList: React.FC = () => {
  const { loaded, notifications, getAllNotifs } = useGetData();
  useEffect(() => {}, []);
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await getAllNotifs();

    event.detail.complete();
  };

  return (
    <PageTemplate
      tiltePage={"Notifications"}
      contentAllScreen={false}
      subtitle="Ici apparaitront les notifications que vous aviez recue."
    >
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <div className="notifications_container">
        <NotifsBlock title={"Récents"} notifs={notifications} loaded={loaded} />
      </div>
    </PageTemplate>
  );
};

const useGetData = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    getAllNotifs();
  }, []);

  const getAllNotifs = async () => {
    setloaded(false);
    let user = getUser();
    let res = (await alaivoGet(`notification/${user.email}`, null, false)) as any;
    console.log(res);
    setloaded(true);
    setNotifications(res);
  };

  return { notifications, loaded, getAllNotifs };
};

export default NotificationsList;
