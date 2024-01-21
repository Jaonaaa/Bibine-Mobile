import React from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import ParamRow from "./ParamRow/ParamRow";
import { IonToggle } from "@ionic/react";
import TagLineIcon from "../../assets/icons/TagLineIcon";
import useNav from "../../hooks/useNav";
import "./Parameter.sass";

const Parameter: React.FC = () => {
  const { to_forward } = useNav();

  const params = [
    {
      label: "Mode nuit",
      type: "toogler",
    },
    {
      label: "Nous contacter",
      type: "clickable",
      callback: () => {},
    },

    {
      label: "TITP Corporation ",
      type: "clickable",
      callback: () => {
        to_forward("/main/parameter/devs");
      },
    },
  ];

  return (
    <PageTemplate tiltePage="">
      <div className="container_params">
        {params.map((param, i) => (
          <ParamRow
            key={i}
            type={param.type as "toogler" | "clickable"}
            callback={param.callback}
            component={<IonToggle />}
            label={param.label}
          />
        ))}
        <div className="tagline">
          <TagLineIcon />
        </div>
      </div>
    </PageTemplate>
  );
};

export default Parameter;
