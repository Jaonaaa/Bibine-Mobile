import React, { useEffect, useState } from "react";
import CrossIcon from "../../../assets/icons/CrossIcon";
import Hider from "../../Hider/Hider";
import { IonCheckbox } from "@ionic/react";
import "./Selection.sass";

interface SelectionProps {
  callBack: Function;
  name: string;
  title: string;
  formData: any;
  type: string;
  options_src: Function;
}

interface Item {
  label: string;
  value: string;
}

const Selection = (props: SelectionProps) => {
  const { callBack, name, title, formData, type, options_src } = props;
  const [listForm, setListForm] = useState<any[]>([]);
  const [modalOn, setModalOn] = useState(false);

  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    if (options_src) {
      let res = await options_src();
      setMaintenances(res);
    }
  };

  const addList = (item: any, checked: boolean) => {
    if (checked) setListForm((items) => [...items, item]);
    else {
      let filtred = listForm.filter((item_in) => item_in.value !== item.value);
      setListForm(filtred);
    }
  };

  useEffect(() => {
    callBack({ target: { name: name, value: listForm, type: type } });
  }, [listForm]);

  const deleteItem = (index: number) => {
    console.log(index);
    const newListForm = listForm.filter((row, indice) => indice !== index);
    setListForm(newListForm);
    callBack({ target: { name: name, value: newListForm, type: type } });
  };

  return (
    <>
      <div className="details_container">
        <div className="label_title">{title}</div>
        <div className="container_details">
          <hr />
          {/* /// */}
          {formData[name] &&
            formData[name].map((row: Item, index: number) => {
              return (
                <div className="row" key={index}>
                  <div className="label"> {row.label} </div>
                  <div
                    className="delete_icon"
                    onClick={() => {
                      deleteItem(index);
                    }}
                  >
                    <CrossIcon />
                  </div>
                </div>
              );
            })}

          {/* /// */}
        </div>
        <div
          id="add_details_row"
          onClick={() => {
            setModalOn(true);
          }}
        >
          Ajouter les maintenances effectués
        </div>
        {modalOn && (
          <Hider classCss="glassy">
            <div className="container_form_add">
              <div className="title">Selectionner les maintenances effectuées</div>
              <div className="list">
                {maintenances.map((maintenance: any, index) => (
                  <div className="row_check_box" key={index}>
                    <div className="check_box">
                      <IonCheckbox
                        checked={listForm.includes(maintenance) ? true : false}
                        onClick={(e) => {
                          addList(maintenance, e.currentTarget.checked);
                        }}
                      />
                    </div>
                    <div className="label">{maintenance.label}</div>
                  </div>
                ))}
              </div>
              <div className="buttons">
                <div
                  className="add_btn_details"
                  onClick={() => {
                    setModalOn(false);
                  }}
                >
                  Ok
                </div>
              </div>
            </div>
          </Hider>
        )}
      </div>
    </>
  );
};

export default Selection;
