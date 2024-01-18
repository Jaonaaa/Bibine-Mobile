import React, { useEffect, useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import ParamRow from "./ParamRow/ParamRow";
import { IonToggle } from "@ionic/react";

import "./Parameter.sass";
import TagLineIcon from "../../assets/icons/TagLineIcon";
import Input from "../Input/Input";
import ButtonCartoon from "../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import useConnectServer from "../../utils/useConnectServer";
import { storage } from "../../data/storage";

const params = [
  {
    label: "Mode nuit",
    type: "toogler",
  },
  {
    label: "Nous contacter",
    type: "clickable",
  },

  {
    label: "TITP Corporation ",
    type: "clickable",
  },
];

const Parameter: React.FC = () => {
  return (
    <PageTemplate tiltePage="">
      <div className="container_params">
        {params.map((param, i) => (
          <ParamRow
            key={i}
            type={param.type as "toogler" | "clickable"}
            callback={() => {
              console.log("Clicked " + i);
            }}
            component={<IonToggle />}
            label={param.label}
          />
        ))}
        <div className="tagline">
          <TagLineIcon />
        </div>
        <BonusDev />
      </div>
    </PageTemplate>
  );
};

const BonusDev = () => {
  const { connect, sendPrivateMessage, stompClient, sendPrivateMessageIndicated } = useConnectServer();
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    connect();
  }, []);

  const sendToAll = () => {
    if (stompClient) {
      sendPrivateMessage(message);
    } else {
      alert("Stomp client is not available");
    }
  };

  const sendToSpecified = () => {
    if (stompClient) {
      sendPrivateMessageIndicated(message, target);
    } else {
      alert("Stomp client is not available");
    }
  };

  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };
  const handleTarget = (e: any) => {
    setTarget(e.target.value);
  };

  return (
    <>
      <Input title="Target" defaultValue={target} fullWidth onChange={handleTarget} name="target" />
      <Input title="Dev bonus XD" defaultValue={message} fullWidth onChange={handleMessage} name="message_all" />
      <br />
      <ButtonCartoon callback={sendToAll} text="Send to Thox" />
      <br />
      <ButtonCartoon callback={sendToSpecified} text="Send specified" />
    </>
  );
};

export default Parameter;
