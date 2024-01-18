import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { URL, alaivoGet, alaivoPost } from "./Alaivo";
import Stomp from "webstomp-client";
import { messageStruct, storage } from "../data/storage";
import useNotification from "../hooks/useNotifications";
import { getRandomNumber } from "./Format";

export const useConnectServer = () => {
  const { scheduleNow } = useNotification();
  const [stompClient, setStompClient] = useState<any>(null);

  const connect = () => {
    if (localStorage.getItem(storage.user_email) == null) return;
    const sock = SockJS(URL + "websocket?id_user_socket=" + localStorage.getItem(storage.user_email));
    sock.onopen = handleOpen;
    sock.onclose = handleClose;
    sock.onmessage = handleMessage;
    let stompClient = Stomp.over(sock);
    stompClient.debug = function () {}; //do nothing

    stompClient.connect({}, function (frame) {
      //setSocket(sock);
      setStompClient(stompClient);
      console.log("Connected");
      stompClient.subscribe("/user/topic/private-messages", (message: any) => {
        console.log("Private message ___ ");
        console.log(JSON.parse(message.body));

        let data = JSON.parse(message.body) as messageStruct;
        console.log(data);
        scheduleNow(data.sender.username, data.content, getRandomNumber(8, 40), "openPage");
        alert(message.body);
      });
    });
  };

  const handleOpen = (socket: any) => {
    console.log("SockJS connection opened");
    // Additional logic on open
  };

  const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);
    // Handle incoming messages
  };

  const handleClose = () => {
    alert("SockJS connection closed");
    // Additional logic on close
  };

  const sendPrivateMessage = (message: string) => {
    if (stompClient) {
      let messageToSent = { messageContent: message };
      alaivoPost("send-private-message/thox", JSON.stringify(messageToSent), null, true);
    } else alert("Connection not etablished");
  };
  const sendPrivateMessageIndicated = (message: string, receiver: string | null) => {
    if (stompClient) {
      let messageToSent = {
        messageContent: message,
        sender: {
          id: "",
          username: localStorage.getItem(storage.user_name),
          picturePath: "",
        },
      };
      /////
      alaivoPost("send-private-message/" + receiver, JSON.stringify(messageToSent), null, true);
    } else alert("Connection not etablished");
  };

  return { connect, stompClient, sendPrivateMessage, sendPrivateMessageIndicated };
};

export default useConnectServer;
