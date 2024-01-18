import NotifItem from "../NotifItem/NotifItem";
import "./NotifsBlock.sass";

interface NotifsBlockProps {
  title: string;
  notifs?: any[];
}
const NotifsBlock = (props: NotifsBlockProps) => {
  const { notifs, title } = props;
  return (
    <div className="block_notifs">
      <div className="title">{title}</div>
      <div className="list_notif">
        <NotifItem />
        {[...Array(5).keys()].map((notif, i) => (
          <NotifItem key={i} read={i % 2 === 0 ? false : true} />
        ))}
      </div>
    </div>
  );
};

export default NotifsBlock;
