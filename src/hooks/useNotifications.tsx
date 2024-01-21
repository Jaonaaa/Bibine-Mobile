import { LocalNotifications } from "@capacitor/local-notifications";
import { getRandomNumber } from "../utils/Format";
import { Capacitor } from "@capacitor/core";
import useNav from "./useNav";
import { useEffect } from "react";

const useNotification = () => {
  const { to } = useNav();

  const schedule = async (seconde: number) => {
    try {
      // Request // check permissions
      let res = (await LocalNotifications.requestPermissions()).display;
      if (!res) return;
      //   configNotifAction();
      // Création d'une notification
      const notification = {
        title: "Quelqu'un vous a envoyer un message ",
        body: "DE AONAAAAA !!!!!",
        id: getRandomNumber(1, 100),
        actionTypeId: "openPage",
        schedule: { at: new Date(new Date().getTime() + seconde * 1000) },
      };
      // Clear old notifications in prep for refresh (OPTIONAL)
      // const pending = await LocalNotifications.getPending();
      // if (pending.notifications.length > 0) await LocalNotifications.cancel(pending);
      await LocalNotifications.schedule({
        notifications: [notification],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const scheduleNow = async (title: string, text: string, id: number | null, actionType: "first_time" | "openPage") => {
    try {
      let time = new Date(new Date().getTime());
      console.log("Current Time : ", time);

      let currentSeconds = time.getSeconds();
      time.setSeconds(currentSeconds + 1);
      console.log("Current Time advanced: ", time);

      const notification = {
        title: title,
        body: text,
        id: id ? id : getRandomNumber(1, 1000),
        actionTypeId: actionType,
        importance: 5,
        visibility: 1,
        schedule: { at: time },
        channelId: "my_message_channel",
        attachments: [
          {
            id: "image",
            url: "https://pusheen.com/wp-content/uploads/2020/09/Preview-Image.jpg",
            options: {},
          },
        ],
      };
      await LocalNotifications.schedule({
        notifications: [notification],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const askPermission = async (callBack: any) => {
    let res = (await LocalNotifications.requestPermissions()).display;
    if (!res) return false;
    else {
      setTimeout(() => {
        callBack();
      }, 500);
      return true;
    }
  };

  const configNotifAction = () => {
    if (Capacitor.getPlatform() !== "web") {
      // Create a notification channel
      LocalNotifications.createChannel({
        id: "my_message_channel",
        name: "Vos messages",
        importance: 5, // Importance level (0 to 5)
        description: "Vos messages de chez Bibine seront ici",
        sound: "tututu.wav",
      });

      LocalNotifications.registerActionTypes({
        types: [
          {
            id: "openPage",
            actions: [
              {
                id: "view",
                title: "Voir",
              },
            ],
          },
          {
            id: "first_time",
            actions: [
              {
                id: "give_a_hug",
                title: "Mercii （￣︶￣）↗ ❤️",
              },
            ],
          },
        ],
      });

      LocalNotifications.addListener("localNotificationActionPerformed", (event) => {
        if (event.actionId === "view") {
          // Redirection vers la page spécifique lors du clic sur l'action "Voir"
          to("/main/home");
        }
        if (event.actionId === "give_a_hug") {
        }
      });
    }
  };
  useEffect(() => {
    configNotifAction();
  }, []);

  return { schedule, scheduleNow, askPermission };
};

export default useNotification;
