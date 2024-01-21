import React from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import AnnonceBox from "../AnnonceBox/AnnonceBox";
import { useParams } from "react-router-dom";

interface AchatAnnonce {
  id: string; //idAnnonce alaiana avy am path erry ambony
}
const AchatAnnonce = () => {
  const { id } = useParams<AchatAnnonce>();

  return (
    <PageTemplate tiltePage="Achat 💲" subtitle="Article : Audi T9 AZ-REIM ">
      <AnnonceBox />
      {id}
    </PageTemplate>
  );
};

export default AchatAnnonce;
