import React, { useEffect, useState } from "react";
import Hider from "../../Hider/Hider";
import CrossIcon from "../../../assets/icons/CrossIcon";
import EditPencilIcon from "../../../assets/icons/EditPencilIcon";
import "./Details.sass";

interface DetailsProps {
  callBack: Function;
  name: string;
  title: string;
  formData: any;
  type: string;
}

interface Item {
  label: string;
  value: string;
}

function OnInput(this: HTMLTextAreaElement) {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

const handleTextAreaSize = () => {
  const tx = document.querySelectorAll(".textarea_resizable");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }
};

const Details = (props: DetailsProps) => {
  const { callBack, name, title, formData, type } = props;
  const [listForm, setListForm] = useState<any[]>([]);
  const [modalOn, setModalOn] = useState(false);
  const [itemLabel, setItemLabel] = useState<any>({ label: "", details_text: "" });
  const [indexModif, setIndexModif] = useState<any>(null);

  const addList = (item: Item) => {
    setListForm((items) => [...items, item]);
  };

  useEffect(() => {
    if (modalOn) handleTextAreaSize();
  }, [modalOn]);

  useEffect(() => {
    callBack({ target: { name: name, value: listForm, type: type } });
  }, [listForm]);

  const handleItemLabel = (e: any) => {
    setItemLabel((before: any) => ({ ...before, [e.target.name]: e.target.value }));
  };

  const deleteItem = (index: number) => {
    console.log(index);
    const newListForm = listForm.filter((row, indice) => indice !== index);
    setListForm(newListForm);
    callBack({ target: { name: name, value: newListForm, type: type } });
  };

  const clearItemLabel = () => {
    setItemLabel({ label: "", details_text: "" });
  };
  const clearIndex = () => {
    setIndexModif(null);
  };

  const modifyItem = () => {
    listForm[indexModif] = { label: itemLabel.label, value: itemLabel.details_text };
    callBack({ target: { name: name, value: listForm, type: type } });
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
                  <div className="value"> {row.value} </div>
                  <div
                    className="delete_icon"
                    onClick={() => {
                      setIndexModif(index);
                      deleteItem(index);
                    }}
                  >
                    <CrossIcon />
                  </div>

                  <div
                    className="modify_icon"
                    onClick={() => {
                      setIndexModif(index);
                      setItemLabel({ label: row.label, details_text: row.value });
                      setModalOn(true);
                    }}
                  >
                    <EditPencilIcon />
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
          Ajouter un detail
        </div>
        {modalOn && (
          <Hider classCss="glassy">
            <div className="container_form_add">
              <div className="title">Ajouter un détail concernant votre annonce</div>
              <div className="row_input_textarea">
                <textarea
                  name="label"
                  id="label"
                  placeholder="Titre du détail"
                  className="textarea_resizable label_details"
                  autoFocus
                  defaultValue={itemLabel.label}
                  onChange={handleItemLabel}
                ></textarea>
              </div>
              <div className="row_input_textarea">
                <textarea
                  name="details_text"
                  id="details_text"
                  placeholder="Propriété concernant le détail"
                  className="textarea_resizable"
                  defaultValue={itemLabel.details_text}
                  onChange={handleItemLabel}
                ></textarea>
              </div>
              <div className="buttons">
                <div
                  className="close_btn_details"
                  onClick={() => {
                    setModalOn(false);
                    setIndexModif(null);
                    if (indexModif !== null) {
                      clearItemLabel();
                    }
                    clearIndex();
                  }}
                >
                  Annuler
                </div>
                <div
                  className="add_btn_details"
                  onClick={() => {
                    if (indexModif === null) {
                      addList({ label: itemLabel.label, value: itemLabel.details_text });
                    } else modifyItem();
                    setModalOn(false);
                    clearItemLabel();
                    clearIndex();
                  }}
                >
                  Enregistrer
                </div>
              </div>
            </div>
          </Hider>
        )}
      </div>
    </>
  );
};

export default Details;
