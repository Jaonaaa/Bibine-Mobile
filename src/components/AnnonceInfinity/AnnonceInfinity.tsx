import React, { useEffect, useState } from "react";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import ButtonCartoon from "../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import AddIcon from "../../assets/icons/AddIcon";
import { alaivoGet } from "../../utils/Alaivo";
import { AnnonceData } from "../../data/Types";
import "./AnnonceInfinity.sass";

interface AnnonceBox {
  category?: string;
}

const AnnonceInfinity = (props: AnnonceBox) => {
  const [count, setCount] = useState(4);
  const { annonces, load, getAnnonces } = useGetData(props.category);
  const addNewAnnonce = () => {
    setTimeout(() => {
      setCount((countInitial) => countInitial + 2);
    }, 400);
  };
  useEffect(() => {
    getAnnonces();
  }, [props.category]);
  return (
    <div className="annonce_infinity_container">
      {!load
        ? [...Array(5).keys()].map((k, index) => <AnnonceBox key={index} loadedContent={load} />)
        : annonces.map((k, index) => <AnnonceBox {...k} key={index} loadedContent={load} />)}

      <div className="add_new_annonce">
        <ButtonCartoon callback={addNewAnnonce} text="Afficher plus" icon={<AddIcon />} />
      </div>
    </div>
  );
};

const useGetData = (props: any) => {
  const [annonces, setAnnonces] = useState<AnnonceData[]>([]);
  const [load, setLoaded] = useState(false);

  useEffect(() => {
    getAnnonces();
  }, []);

  const getAnnonces = async () => {
    setLoaded(false);
    let res = null;
    if (props.id === "*") res = (await alaivoGet("bibine/actu/annonces", null, true)) as any;
    else res = (await alaivoGet(`bibine/actu/type/${props.id}/annonces`, null, true)) as any;
    setLoaded(true);
    let annocs = res.data as AnnonceData[];
    setAnnonces(annocs);
  };
  return { annonces, load, getAnnonces };
};

export default AnnonceInfinity;
