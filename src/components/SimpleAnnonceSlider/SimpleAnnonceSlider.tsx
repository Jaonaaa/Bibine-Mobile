import React, { useEffect, useState } from "react";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import "./SimpleAnnonceSlider.sass";

interface SimpleAnnonceSliderProps {
  loadedContent?: boolean;
  id_user?: string;
}

const SimpleAnnonceSlider = (annonces: SimpleAnnonceSliderProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <div className="container_slider">
      <div className="annonce_slider_container">
        <div className="slider_content">
          {[...Array(5).keys()].map((v, i) => (
            <AnnonceBox
              key={i}
              loadedContent={annonces.loadedContent ? annonces.loadedContent : loaded}
              id_annonce={i + ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleAnnonceSlider;
