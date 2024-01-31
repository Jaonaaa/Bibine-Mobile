import React, { useEffect, useState } from "react";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import ButtonCartoon from "../AnnonceDetails/ButtonCartoon/ButtonCartoon";
import AddIcon from "../../assets/icons/AddIcon";
import { alaivoGet } from "../../utils/Alaivo";
import { AnnonceData } from "../../data/Types";
import "./AnnonceInfinity.sass";
import Loader from "../Loader/Loader";
import EmptyIcon from "../../assets/icons/EmptyIcon";

interface AnnonceBox {
  category?: string;
}

const AnnonceInfinity = (props: AnnonceBox) => {
  const { annonces, load, noResult, btnAddOn, getAnnonces, getAnnoncesSupp, annoncesSupp, loadSupp, resetPlus } = useGetData(
    props.category
  );
  const addNewAnnonce = () => {
    getAnnoncesSupp();
  };
  useEffect(() => {
    resetPlus();
    getAnnonces();
  }, [props.category]);

  return (
    <div className="annonce_infinity_container">
      {!load
        ? [...Array(5).keys()].map((k, index) => <AnnonceBox key={index} loadedContent={load} />)
        : annonces.map((k, index) => <AnnonceBox {...k} key={index} loadedContent={load} />)}

      {annoncesSupp.map((k, index) => (
        <AnnonceBox {...k} key={index} loadedContent={true} />
      ))}
      {load && noResult ? (
        <div className="no_result_container">
          <div className="icon">
            <EmptyIcon />
          </div>
          <div className="text">Aucun résultat trouvé !</div>
        </div>
      ) : (
        ""
      )}

      {!loadSupp ? (
        <div className="loader_supp_container">
          <Loader />
        </div>
      ) : !noResult && btnAddOn ? (
        <div className="add_new_annonce">
          <ButtonCartoon callback={addNewAnnonce} text="Afficher plus" icon={<AddIcon />} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const useGetData = (props: any) => {
  const [annonces, setAnnonces] = useState<AnnonceData[]>([]);
  const [load, setLoaded] = useState(false);
  const [annoncesSupp, setAnnoncesSupp] = useState<AnnonceData[]>([]);
  const [offset, setOffset] = useState([0, 5]);
  const [countPages, setCountPages] = useState(999);
  const [loadSupp, setLoadedSupp] = useState(true);
  const [btnAddOn, setBtnAddOn] = useState(true);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    getPagesCount();
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
    setNoResult(false);
    setLoaded(false);
    let res = null;
    if (props.id === "*")
      res = (await alaivoGet(`bibine/actu/annonces?offset=${offset[0]}&limit=${offset[1]}`, null, true)) as any;
    else res = (await alaivoGet(`bibine/actu/type/${props.id}/annonces`, null, true)) as any;
    setLoaded(true);
    let annocs = res.data as AnnonceData[];
    if (annocs.length === 0) setNoResult(true);
    else setNoResult(false);
    setAnnonces(annocs);
  };

  const getAnnoncesSupp = () => {
    setOffset((old) => [old[0] + 1, old[1]]);
    if (offset[0] + 2 >= countPages) {
      setBtnAddOn(false);
    }
  };

  const resetPlus = () => {
    setOffset([0, 5]);
    setAnnoncesSupp([]);
    setBtnAddOn(true);
  };

  const getAnnoncesSuppLoad = async () => {
    setLoadedSupp(false);
    let res = (await alaivoGet(`bibine/actu/pagination/annonces?offset=${offset[0]}&limit=${offset[1]}`, null, true)) as any;
    // ampio anleh pagination par type eto /: condition or * sa typer
    setLoadedSupp(true);
    let annocs = res.data as AnnonceData[];
    setAnnoncesSupp((ans) => [...ans, ...annocs]);
  };

  return { annonces, annoncesSupp, load, noResult, getAnnonces, getAnnoncesSupp, loadSupp, resetPlus, offset, btnAddOn };
};

export default AnnonceInfinity;
