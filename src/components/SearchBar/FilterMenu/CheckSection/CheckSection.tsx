import React, { useEffect, useState } from "react";
import "./CheckSection.sass";
import { IonCheckbox } from "@ionic/react";

interface Condition {
  label: string;
}
const conditions = [{ label: "International Shipping" }, { label: "Lafo" }, { label: "Mafatifaty XD" }];

const CheckSection = () => {
  // ato ny condition izay selectionner
  const [selectedCondition, setSelectedCondition] = useState<Condition[]>([]);

  const handleCondition = (condition: Condition, selected: boolean) => {
    if (selected) setSelectedCondition((conditions) => [...conditions, condition]);
    else {
      let filtred = selectedCondition.filter((conditionIn) => conditionIn.label !== condition.label);
      setSelectedCondition(filtred);
    }
  };

  return (
    <div className="check_container">
      {conditions.map((cond, index) => {
        return <CheckItem key={index} handleItem={handleCondition} condition={cond} />;
      })}
    </div>
  );
};

interface CheckItemProps {
  condition: Condition;
  handleItem: (condition: Condition, selected: boolean) => void;
}
const CheckItem = (props: CheckItemProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };
  return (
    <>
      <div className="row_check">
        <div className="checkbox">
          <IonCheckbox
            onClick={(e) => {
              props.handleItem(props.condition, e.currentTarget.checked);
            }}
          />
        </div>
        <div className="text" onClick={handleCheck}>
          {props.condition.label}
        </div>
      </div>
    </>
  );
};

export default CheckSection;
