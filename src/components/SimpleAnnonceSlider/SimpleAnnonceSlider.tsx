import React, { useEffect, useState } from "react";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import "./SimpleAnnonceSlider.sass";
import { AnnonceData } from "../../data/Types";
import { alaivoGet } from "../../utils/Alaivo";

interface SimpleAnnonceSliderProps {
  id_user: string;
}

const SimpleAnnonceSlider = (props: SimpleAnnonceSliderProps) => {
  const { annonces, getAnnonces, load } = useGetData(props.id_user);

  useEffect(() => {
    console.log(props);
  }, [props.id_user]);

  return (
    <div className="container_slider">
      <div className="annonce_slider_container">
        <div className="slider_content">
          {!load
            ? [...Array(5).keys()].map((k, index) => (
                <div key={index}>
                  <AnnonceBox callback={close} key={index} loadedContent={load} id_annonce={index + ""} />
                  <hr />
                </div>
              ))
            : annonces.map((k, index) => (
                <div key={index}>
                  <AnnonceBox {...k} key={index} loadedContent={load} />
                  <hr />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const useGetData = (vendeur_id: string) => {
  const [annonces, setAnnonces] = useState<AnnonceData[]>([]);
  const [load, setLoaded] = useState(false);

  useEffect(() => {
    getAnnonces();
  }, []);

  const getAnnonces = async () => {
    setLoaded(false);
    let res = "" as any;
    if (vendeur_id !== "*") res = (await alaivoGet("bibine/user/" + vendeur_id + "/own_annonces", null, false)) as any;
    else res = (await alaivoGet("bibine/actu/annonces", null, true)) as any;
    setLoaded(true);
    console.log(res.data);
    let annocs = res.data as AnnonceData[];
    setAnnonces(annocs);
  };

  return { annonces, load, getAnnonces };
};

export default SimpleAnnonceSlider;
