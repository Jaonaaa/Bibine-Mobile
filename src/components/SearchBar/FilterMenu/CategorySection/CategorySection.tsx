import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hider from "../../../Hider/Hider";
import ArrowSwipeRight from "../../../../assets/icons/ArrowSwipeRight";
import { IonCheckbox } from "@ionic/react";
import CrossIcon from "../../../../assets/icons/CrossIcon";
import "./CategorySection.sass";

interface Categorie {
  label: string;
  id: number;
}

// misy options all all
const cats = [
  { id: 1, label: "Sport" },
  { id: 2, label: "Plaisir" },
  { id: 3, label: "Electronics" },
  { id: 4, label: "Luxe" },
];

const CategorySection = () => {
  const [catSelected, setCatSelected] = useState<Categorie[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const removeCat = (cat_id: number) => {
    let filtred = catSelected?.filter((cat) => cat.id != cat_id);
    setCatSelected(filtred);
  };
  const addCat = (cat: Categorie) => {
    setCatSelected((cats) => [...cats, cat]);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const removeAll = () => {
    setCatSelected([]);
  };

  return (
    <div className={"categories_containers"}>
      <div className="content_cat">
        {catSelected.length === 0 ? (
          <div className="categorie_item all" onClick={handleModal}>
            <div className="text"> Tous </div>
          </div>
        ) : (
          <>
            {catSelected.map((cat: Categorie, index) => (
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
            <SelectCategory
              clearSelectedCategory={removeAll}
              allCategory={cats}
              removeCat={removeCat}
              addCat={addCat}
              selectedCategory={catSelected}
              closer={handleModal}
            />
          </Hider>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SelectCategoryProps {
  allCategory: Categorie[];
  selectedCategory: Categorie[];
  removeCat: (id: number) => void;
  addCat: (cat: Categorie) => void;
  closer: () => void;
  clearSelectedCategory: () => void;
}

const SelectCategory = (props: SelectCategoryProps) => {
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
        <div className="title">Category</div>
        <div className="fixed_item item ">
          <div className="icon">
            <IonCheckbox checked={props.selectedCategory.length === 0} onClick={props.clearSelectedCategory} />
          </div>
          <div className="label"> Tous </div>
        </div>
        <hr />
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

export default CategorySection;
