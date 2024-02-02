import { useEffect, useState } from "react";
import MicroAnnonce from "../MicroAnnonce/MicroAnnonce";
import { alaivoGet } from "../../../utils/Alaivo";
import Loader from "../../Loader/Loader";
import { getUser } from "../../../data/storage";
import Empty from "../Empty/Empty";

import "./MyAnnonces.sass";

const MyAnnonces = () => {
  const { annonces, loaded } = useGetData();
  return (
    <>
      {loaded ? (
        annonces.length === 0 ? (
          <Empty remark="Vous n'avez pas encore publier d'annonce " />
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
    getAllTypes();
  }, []);

  const getAllTypes = async () => {
    setloaded(false);
    let user = getUser();
    let res = (await alaivoGet("bibine/actu/user/" + user.id + "/own_annonces?limit=10", null, true)) as any;
    setloaded(true);
    setAnnonces(res.data);
  };
  return { annonces, loaded };
};

export default MyAnnonces;
