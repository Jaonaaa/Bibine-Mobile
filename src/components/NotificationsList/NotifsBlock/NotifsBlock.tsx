import NotifItem, { Notif } from "../NotifItem/NotifItem";
import "./NotifsBlock.sass";

interface NotifsBlockProps {
  title: string;
  notifs?: Notif[];
  loaded: boolean;
}
const NotifsBlock = (props: NotifsBlockProps) => {
  const { notifs, title, loaded } = props;
  return (
    <div className="block_notifs">
      <div className="title">{title}</div>
      <div className="list_notif">
        {loaded
          ? notifs?.map((notif: Notif) => {
              return <NotifItem data={notif} read={false} key={notif.id} />;
            })
          : [...Array(5).keys()].map((notif, i) => <NotifItem key={i} template read={i % 2 === 0 ? false : true} />)}
      </div>
    </div>
  );
};

export default NotifsBlock;
