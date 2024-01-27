import AddAnnonceIcon from "../../../assets/icons/AddAnnonceIcon";
import MessageIcon from "../../../assets/icons/MessageIcon";
import BellIcon from "../../../assets/icons/BellIcon";
import ParameterIcon from "../../../assets/icons/ParameterIcon";
import ArrowLongRight from "../../../assets/icons/ArrowLongRight";
import AddAnnonce from "../../../components/AddAnnonce/AddAnnonce";
import NotificationsList from "../../../components/NotificationsList/NotificationsList";
import HomePageIcon from "../../../assets/icons/HomePageIcon";
import { searchOutline, search } from "ionicons/icons";
import HomeFilled from "../../../assets/icons/HomeFilled.svg";
import HomeOulined from "../../../assets/icons/HomeOutlined.svg";
import Home from "../Home/Home";
import SearchPageIcon from "../../../assets/icons/SearchPageIcon";
import Search from "../Search/Search";
import Parameter from "../../../components/Parameter/Parameter";
import { storage } from "../../../data/storage";
import { URL_message } from "../../../utils/Alaivo";

export const paths = [
  {
    path: "/main/home",
    page: "Acceuil",
    iconOutline: HomeOulined,
    iconFilled: HomeFilled,
    component: Home,
  },
  {
    path: "/main/search",
    page: "Recherche",
    iconOutline: searchOutline,
    iconFilled: search,
    component: Search,
  },
];

export const pathsSideMenu = [
  {
    path: "/main/home",
    page: "Acceuil",
    component: Home,
    pageIn: true,
    icon: <HomePageIcon />,
    size: "md",
    connected: false,
  },
  {
    path: "/main/search",
    page: "Recherche",
    component: Search,
    pageIn: true,
    icon: <SearchPageIcon />,
    size: "md",
    connected: false,
  },
  {
    path: "/main/addAnnonce",
    page: "Faire une annonce",
    component: AddAnnonce,
    pageIn: true,
    icon: <AddAnnonceIcon />,
    connected: true,
  },
  {
    path: URL_message,
    page: "Messages",
    pageIn: false,
    component: Search,
    icon: <MessageIcon />,
    external: true,
    connected: true,
  },
  {
    path: "/main/notifs",
    page: "Notifications",
    pageIn: true,
    component: NotificationsList,
    icon: <BellIcon />,
    connected: true,
  },

  {
    path: "/log",
    page: localStorage.getItem(storage.user_connected) ? "  Se déconnecter" : "  Se connecter",
    pageIn: false,
    forced: true,
    icon: <ArrowLongRight />,
    connected: false,
  },
  {
    path: "/main/parameter",
    page: "Paramètre",
    pageIn: true,
    component: Parameter,
    icon: <ParameterIcon />,
    connected: false,
  },
];
