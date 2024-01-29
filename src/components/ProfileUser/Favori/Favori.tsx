import React, { useEffect, useState } from "react";
import Empty from "../Empty/Empty";
import { alaivoGet } from "../../../utils/Alaivo";
import { getUser } from "../../../data/storage";
import MicroAnnonce from "../MicroAnnonce/MicroAnnonce";
import Loader from "../../Loader/Loader";

const Favori = () => {
  const { annonces, loaded } = useGetData();

  return (
    <>
      {loaded ? (
        annonces.length === 0 ? (
          <Empty remark="Aucun favoris à afficher" />
        ) : (
          <div className="list_annonce">
            {annonces.map((annonce, index) => (
              <MicroAnnonce key={index} {...annonce} />
            ))}
          </div>
        )
      ) : (
        <div className="loader_container_in">
          <Loader size="4.5rem" />
        </div>
      )}
    </>
  );
};

const useGetData = () => {
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    getAllSelledAnnonce();
  }, []);

  const getAllSelledAnnonce = async () => {
    setloaded(false);
    let user = getUser();
    let res = (await alaivoGet("bibine/actu/annonces", null, true)) as any;
    setloaded(true);
    setAnnonces(res.data);
  };
  return { annonces, loaded };
};

export default Favori;
