import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hider from "../../../Hider/Hider";
import ArrowSwipeRight from "../../../../assets/icons/ArrowSwipeRight";
import { IonCheckbox } from "@ionic/react";
import CrossIcon from "../../../../assets/icons/CrossIcon";
import Loader from "../../../Loader/Loader";
import "./SelectionSection.sass";

interface Categorie {
  label: string;
  id: number;
  value: any;
}

// misy options all all

interface SelectionProps {
  name: string;
  selection_origin: Function;
  callback: Function;
}

const SelectionSection = (props: SelectionProps) => {
  const [element, setElement] = useState<Categorie[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [allElements, setAllElements] = useState<Categorie[]>([]);

  const getElements = async () => {
    setLoaded(false);
    let res = await props.selection_origin();
    setLoaded(true);
    setAllElements(res);
  };

  const removeCat = (cat_id: number) => {
    let filtred = element?.filter((cat) => cat.id != cat_id);
    setElement(filtred);
  };
  const addCat = (cat: Categorie) => {
    setElement((cats) => [...cats, cat]);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const removeAll = () => {
    setElement([]);
  };

  useEffect(() => {
    props.callback({ name: props.name, value: element });
  }, [element]);

  useEffect(() => {
    getElements();
  }, []);

  return (
    <div className={"categories_containers"}>
      <div className="content_cat">
        {element.length === 0 ? (
          <div className="categorie_item all" onClick={handleModal}>
            <div className="text"> Tous </div>
          </div>
        ) : (
          <>
            {element.map((cat: Categorie, index) => (
              <div className="categorie_item" key={index}>
                <div className="text">{cat.label}</div>
                <div
                  className="closer"
                  onClick={() => {
                    removeCat(cat.id);
                  }}
                >
                  <CrossSmallIcon />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="opener" onClick={handleModal}>
        <ArrowSwipeRight />
      </div>

      <AnimatePresence>
        {openModal && (
          <Hider animate="showUp" classCss="glassy">
            <SelectPaper
              loaded={loaded}
              clearSelectedCategory={removeAll}
              allCategory={allElements}
              removeCat={removeCat}
              addCat={addCat}
              selectedCategory={element}
              closer={handleModal}
              name={props.name}
            />
          </Hider>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SelectPaperProps {
  allCategory: Categorie[];
  selectedCategory: Categorie[];
  removeCat: (id: number) => void;
  addCat: (cat: Categorie) => void;
  closer: () => void;
  clearSelectedCategory: () => void;
  name: string;
  loaded: boolean;
}

const SelectPaper = (props: SelectPaperProps) => {
  const isIn = (cat: Categorie) => {
    let isIn = props.selectedCategory.filter((catOne) => catOne.id === cat.id).length === 1;
    return isIn;
  };

  return (
    <>
      <div className="select_category">
        <div className="closer" onClick={props.closer}>
          <CrossIcon />
        </div>
        <div className="title">{props.name}</div>
        <div className="fixed_item item ">
          <div className="icon">
            <IonCheckbox checked={props.selectedCategory.length === 0} onClick={props.clearSelectedCategory} />
          </div>
          <div className="label"> Tous </div>
        </div>
        <hr />
        {props.loaded ? (
          <div className="list">
            {props.allCategory.map((category: Categorie) => {
              let inCat = isIn(category);
              return (
                <div className="row_item" key={category.id}>
                  <div className="icon">
                    <IonCheckbox
                      checked={inCat}
                      onClick={(e) => {
                        if (e.currentTarget.checked) props.addCat(category);
                        else props.removeCat(category.id);
                      }}
                    />
                  </div>
                  <div className="label">{category.label}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

const CrossSmallIcon = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="8.763" height="8.763" viewBox="0 0 8.763 8.763">
        <g id="Groupe_175" data-name="Groupe 175" transform="translate(-70.651 -158.651)">
          <line
            id="Ligne_14"
            data-name="Ligne 14"
            x2="7.066"
            y2="7.066"
            transform="translate(71.5 159.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth="1.2"
          />
          <line
            id="Ligne_15"
            data-name="Ligne 15"
            x1="7.066"
            y2="7.066"
            transform="translate(71.5 159.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </>
  );
};

export default SelectionSection;
