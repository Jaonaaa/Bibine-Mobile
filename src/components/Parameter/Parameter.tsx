import React, { MouseEventHandler, useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import ParamRow from "./ParamRow/ParamRow";
import { IonToggle } from "@ionic/react";
import TagLineIcon from "../../assets/icons/TagLineIcon";
import useNav from "../../hooks/useNav";
import "./Parameter.sass";
import { getCurrentThemeName, switchTheme } from "../../theme/Theme";

const Parameter: React.FC = () => {
  const { to_forward } = useNav();

  const params = [
    {
      label: "Mode nuit",
      type: "toogler",
      default: getCurrentThemeName() === "dark" ? true : false,
      callback: () => {
        if (getCurrentThemeName() === "dark") switchTheme("light");
        else switchTheme("dark");
      },
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
            component={<Toogler callback={param.callback} checked={param.default} />}
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

interface TooglerProps {
  checked?: boolean;
  callback: Function;
}
const Toogler = (props: TooglerProps) => {
  const { checked, callback } = props;
  const [isChecked, setChecked] = useState(checked);

  return (
    <>
      <IonToggle
        checked={isChecked}
        onClick={() => {
          callback();
          setChecked(!isChecked);
        }}
      />
    </>
  );
};

export default Parameter;
