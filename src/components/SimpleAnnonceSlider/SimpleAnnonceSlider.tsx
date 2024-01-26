import React, { useEffect, useState } from "react";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import "./SimpleAnnonceSlider.sass";
import { AnnonceData } from "../../data/Types";
import { alaivoGet } from "../../utils/Alaivo";

interface SimpleAnnonceSliderProps {
  id_user?: string;
}

const SimpleAnnonceSlider = (props: SimpleAnnonceSliderProps) => {
  const [loaded, setLoaded] = useState(false);
  const { annonces, getAnnonces, load } = useGetData();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

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

const useGetData = () => {
  const [annonces, setAnnonces] = useState<AnnonceData[]>([]);
  const [load, setLoaded] = useState(false);

  useEffect(() => {
    getAnnonces();
  }, []);

  const getAnnonces = async () => {
    setLoaded(false);
    let res = (await alaivoGet("bibine/actu/annonces", null, true)) as any;
    setLoaded(true);
    let annocs = res.data as AnnonceData[];
    setAnnonces(annocs);
  };

  return { annonces, load, getAnnonces };
};

export default SimpleAnnonceSlider;
