import { useState } from "react";
import SockJS from "sockjs-client";
import { URL, alaivoPost } from "./Alaivo";
import Stomp from "webstomp-client";
import { getUser, messageStruct, storage } from "../data/storage";
import useNotification from "../hooks/useNotifications";
import { getRandomNumber } from "./Format";
import useBubbleNotif from "../hooks/useBubbleNotif";

export const useConnectServer = () => {
  const [socket, setSocket] = useState<any>(null);
  const { scheduleNow } = useNotification();
  const [stompClient, setStompClient] = useState<any>(null);
  const { showBubbleMessage } = useBubbleNotif();

  const connect = () => {
    if (localStorage.getItem(storage.user) == null) return;
    let user = getUser() as any;
    const sock = SockJS(URL + "websocket?id_user_socket=" + user.email);

    sock.onopen = handleOpen;
    sock.onclose = handleClose;
    sock.onmessage = handleMessage;
    let stompClient = Stomp.over(sock);
    stompClient.debug = function () {}; //do nothing
    stompClient.connect({}, function () {
      setSocket(sock);
      setStompClient(stompClient);
      //  console.log("Connected");
      stompClient.subscribe("/user/topic/private-messages", (message: any) => {
        console.log("Private message ___");
        let data = JSON.parse(message.body) as messageStruct;
        showBubbleMessage();
        scheduleNow(data.senderName, data.content, getRandomNumber(8, 2000), "openPage");
      });
    });
  };

  const disconnect = () => {
    if (stompClient !== null && socket !== null) {
      socket.close();
      stompClient.disconnect();
      setSocket(null);
      setStompClient(null);
    }
  };

  const connectSpecicifed = async (URL: string) => {
    let user = getUser();
    if (user == null) return;
    const sock = SockJS("https://" + URL + "/websocket?id_user_socket=" + user.email);
    sock.onopen = handleOpen;
    sock.onclose = handleClose;
    sock.onmessage = handleMessage;
    let stompClient = Stomp.over(sock);
    stompClient.debug = function () {}; //do nothing
    return new Promise((resolve, reject) => {
      stompClient.connect(
        {},
        function (frame) {
          setSocket(sock);
          setStompClient(stompClient);
          console.log("Connected specified");
          stompClient.subscribe("/user/topic/private-messages", (message: any) => {
            console.log(JSON.parse(message.body));
            let data = JSON.parse(message.body) as messageStruct;
            ///
            scheduleNow(data.senderName, data.content, getRandomNumber(8, 2000), "openPage");
          });
          resolve(true);
        },
        (e) => {
          setStompClient(null);
          reject(e);
        }
      );
    });
  };

  const handleOpen = (socket: any) => {
    console.log("SockJS connection opened");
  };

  const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);
  };

  const handleClose = () => {
    alert("SockJS connection closed");
  };

  const sendPrivateMessage = (message: string, receiver: string | null, URL: string) => {
    if (stompClient) {
      let user = getUser();
      let messageToSent = {
        content: message,
        senderId: user.id,
        senderName: localStorage.getItem(storage.user_name),
        picturePath: user.profile,
        receiverEmail: receiver,
      };
      /////
      alaivoPost(`new_url${URL}send-message`, JSON.stringify(messageToSent), null, false);
    } else alert("Connection au serveur non établie ￣へ￣ ");
  };

  return { connect, stompClient, sendPrivateMessage, socket, connectSpecicifed, setStompClient, disconnect };
};

export default useConnectServer;
