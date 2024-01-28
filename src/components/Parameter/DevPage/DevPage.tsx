import React, { useEffect, useState } from "react";
import PageTemplate from "../../PageTemplate/PageTemplate";
import Input from "../../Input/Input";
import ButtonCartoon from "../../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import useConnectServer from "../../../utils/useConnectServer";
import { storage } from "../../../data/storage";

import "./DevPage.sass";
import LogBtn from "../../../assets/icons/LogBtn";
import CheckIcon from "../../../assets/icons/CheckIcon";
import CrossDevIcon from "../../../assets/icons/CrossDevIcon";
import Hider from "../../Hider/Hider";
import { AnimatePresence } from "framer-motion";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";

const DevPage = () => {
  return (
    <PageTemplate
      tiltePage="Devs 🔥🔥"
      subtitle="Communiquer avec qui vous voulez ici en leur envoyer des notifications"
    >
      <BonusDev />
    </PageTemplate>
  );
};

const BonusDev = () => {
  const { connectSpecicifed, sendPrivateMessage, stompClient, disconnect } = useConnectServer();
  const [formData, setFormData] = useState({ URL: "car-production-005c.up.railway.app", target: "", message: "" });
  const [hiderOn, setHiderOn] = useState(false);
  const { notifs, addNotifs } = useMyNotifs();
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const sendToSpecified = () => {
    if (stompClient) {
      let message = formData.message.replace(/\\n/g, "\n");
      sendPrivateMessage(message, formData.target, "https://" + formData.URL + "/");
    } else {
      addNotifs("error", "Stomp client is not available", 2000);
    }
  };

  const handleInput = (e: any) => {
    setFormData((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {notifs.map((notif) => notif)}
      <div className="connection_state">
        <AnimatePresence>{hiderOn && <Hider classCss="glassy" loader />}</AnimatePresence>
        <div
          className="btn_connect"
          onClick={async () => {
            if (stompClient === null) {
              setHiderOn(true);
              let result = await connectSpecicifed(formData.URL).catch((e) => {
                addNotifs("error", "La connection au serveur à echoué...", 2000);
              });
              if (result === true) addNotifs("OK", "Connecté au serveur", 1500);
              setHiderOn(false);
            } else {
              disconnect();
            }
          }}
        >
          <LogBtn />
        </div>
        <div className="status">
          <div className={`icon ${stompClient ? "green" : "red"}`}>
            {stompClient ? <CheckIcon /> : <CrossDevIcon />}
          </div>
        </div>
      </div>
      <Input title="URL (host & port)" defaultValue={formData.URL} fullWidth onChange={handleInput} name="URL" />
      <Input title="Target ID" defaultValue={formData.target} fullWidth onChange={handleInput} name="target" />
      <Input
        title="Message"
        defaultValue={formData.message}
        fullWidth
        onChange={handleInput}
        type="textarea"
        name="message"
      />
      <br />
      <br />
      <ButtonCartoon callback={sendToSpecified} text="Send" />
    </>
  );
};

export default DevPage;
