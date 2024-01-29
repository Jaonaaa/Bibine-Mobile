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
  const { annonces, load, offset, getAnnonces, getAnnoncesSupp, annoncesSupp, loadSupp } = useGetData(props.category);
  const addNewAnnonce = () => {
    getAnnoncesSupp();
  };
  useEffect(() => {
    getAnnonces();
  }, [props.category]);
  return (
    <div className="annonce_infinity_container">
      {!load
        ? [...Array(5).keys()].map((k, index) => <AnnonceBox key={index} loadedContent={load} />)
        : annonces.map((k, index) => <AnnonceBox {...k} key={index} loadedContent={load} />)}

      {offset[0] > 0 && !loadSupp
        ? [...Array(3).keys()].map((k, index) => <AnnonceBox key={index} loadedContent={loadSupp} />)
        : annoncesSupp.map((k, index) => <AnnonceBox {...k} key={index} loadedContent={loadSupp} />)}

      <div className="add_new_annonce">
        <ButtonCartoon callback={addNewAnnonce} text="Afficher plus" icon={<AddIcon />} />
      </div>
    </div>
  );
};

const useGetData = (props: any) => {
  const [annonces, setAnnonces] = useState<AnnonceData[]>([]);
  const [load, setLoaded] = useState(false);
  const [annoncesSupp, setAnnoncesSupp] = useState<AnnonceData[]>([]);
  const [offset, setOffset] = useState([0, 5]);
  const [countPages, setCountPages] = useState(1);
  const [loadSupp, setLoadedSupp] = useState(false);

  useEffect(() => {
    //   getPagesCount();
    getAnnonces();
  }, []);

  useEffect(() => {
    if (offset[0] !== 0) getAnnoncesSuppLoad();
  }, [offset]);

  const getPagesCount = async () => {
    let res = (await alaivoGet("bibine/actu/valid_annonces/pagination?limit=5", null, true)) as any;
    setCountPages(res.data);
  };

  const getAnnonces = async () => {
    setLoaded(false);
    let res = null;
    if (props.id === "*")
      res = (await alaivoGet(`bibine/actu/annonces?offset=${offset[0]}&limit=${offset[1]}`, null, true)) as any;
    else res = (await alaivoGet(`bibine/actu/type/${props.id}/annonces`, null, true)) as any;
    setLoaded(true);
    let annocs = res.data as AnnonceData[];
    setAnnonces(annocs);
  };

  const getAnnoncesSupp = () => {
    setOffset((old) => [old[0] + 1, old[1]]);
  };

  const resetPlus = () => {
    setOffset([0, 5]);
  };

  const getAnnoncesSuppLoad = async () => {
    setLoadedSupp(false);
    let res = (await alaivoGet(`bibine/actu/pagination/annonces?offset=${offset[0]}&limit=${offset[1]}`, null, true)) as any;
    setLoadedSupp(true);
    let annocs = res.data as AnnonceData[];
    setAnnoncesSupp((ans) => [...ans, ...annocs]);
  };

  return { annonces, annoncesSupp, load, getAnnonces, getAnnoncesSupp, loadSupp, resetPlus, offset };
};

export default AnnonceInfinity;
