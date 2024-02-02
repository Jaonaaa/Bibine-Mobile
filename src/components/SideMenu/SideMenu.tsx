import { IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonMenuToggle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import MyAvatar from "../AvatarUser/MyAvatar/MyAvatar";
import "./SideMenu.sass";
import AddAnnonceIcon from "../../assets/icons/AddAnnonceIcon";
import useViewPort from "../../hooks/useViewPort";
import useNav from "../../hooks/useNav";
import { getUser, storage } from "../../data/storage";

interface SideMenuProps {
  path: string;
  page?: string;
  iconOutline?: string;
  iconFilled?: string;
  component?: React.FC<{}>;
  forced?: boolean;
  icon?: React.ReactNode;
  iconReversed?: React.ReactNode;
  external?: boolean;
  size?: string;
  connected?: boolean;
}

interface SideMenuTabProps {
  paths: SideMenuProps[];
}

const SideMenu = (paths: SideMenuTabProps) => {
  const { md } = useViewPort();
  const { to_forward } = useNav();
  const isTabSelected = (tab: string) => {
    return window.location.pathname === tab;
  };
  const [username, setUsername] = useState<string>("Unknown");

  let user = getUser();

  useEffect(() => {
    let user = getUser();
    if (user) {
      setUsername(user.name);
    }
  }, []);

  const handleDeconnect = (path: any) => {
    if (path === "/log" && localStorage.getItem(storage.user_connected) !== null) {
      localStorage.removeItem(storage.user_connected);
      localStorage.removeItem(storage.token);
      localStorage.removeItem(storage.user_name);
      localStorage.removeItem(storage.user);
      localStorage.removeItem(storage.refresh_token);
      localStorage.removeItem(storage.details_user);
      localStorage.removeItem(storage.price_);

      window.location.href = "/main/home";
      return true;
    } else return false;
  };

  return (
    <>
      <div className="side_menu">
        <IonHeader className="header_side">
          <IonToolbar>
            <IonMenuToggle>
              <IonItem
                className="profile_box"
                onClick={() => {
                  if (user) to_forward("/profile");
                }}
              >
                <MyAvatar />
                <IonLabel className="title_avatar">
                  <div className="name_user"> {username}</div>
                  <div className="action_title">{user ? "Voir le profile" : ""}</div>
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonToolbar>
        </IonHeader>
        <hr />
        <IonContent className="content_side" fullscreen>
          <IonMenuToggle>
            {paths.paths.map((path: SideMenuProps, index) => {
              if (path.connected && !user) return;
              let mdShow = path.size === "md" && md;

              return mdShow || path.size === undefined ? (
                <IonItem
                  lines="none"
                  key={index}
                  routerLink={path.path}
                  routerDirection="forward"
                  className={isTabSelected(path.path) ? "selected_tab" : ""}
                  onClick={(e) => {
                    if (path.forced) {
                      e.preventDefault();
                      if (!handleDeconnect(path.path)) window.location.href = path.path;
                    } else if (path.external) {
                      e.preventDefault();
                      window.location.href = path.path;
                    }
                  }}
                >
                  <div className="link_item">
                    <div className="icon">{path.icon ? path.icon : <div></div>}</div>
                    <div className="label">{path.page}</div>
                    {path.iconReversed ? <div className="icon_reversed">{path.iconReversed}</div> : ""}
                  </div>
                </IonItem>
              ) : (
                ""
              );
            })}
          </IonMenuToggle>
          <div className="blank"></div>
        </IonContent>
      </div>
    </>
  );
};

export default SideMenu;
