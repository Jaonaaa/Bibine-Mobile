import React, { useState } from "react";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import "./AnnonceInfinity.sass";
import ButtonCartoon from "../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import AddIcon from "../../assets/icons/AddIcon";

interface AnnonceBox {
  loadedContent?: boolean;
}

const AnnonceInfinity = (props: AnnonceBox) => {
  const [count, setCount] = useState(4);

  const addNewAnnonce = () => {
    setTimeout(() => {
      setCount((countInitial) => countInitial + 2);
    }, 400);
  };
  return (
    <div className="annonce_infinity_container">
      {[...Array(count).keys()].map((k, index) => (
        <AnnonceBox loadedContent={props.loadedContent} key={index} />
      ))}
      <div className="add_new_annonce">
        <ButtonCartoon callback={addNewAnnonce} text="Afficher plus" icon={<AddIcon />} />
      </div>
    </div>
  );
};

export default AnnonceInfinity;
