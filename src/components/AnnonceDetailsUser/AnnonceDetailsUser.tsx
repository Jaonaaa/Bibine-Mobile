import PageTemplate from "../PageTemplate/PageTemplate";
import ArrowDownBoxIcon from "../../assets/icons/ArrowDownBoxIcon";
import PictureSwaper from "../AnnonceDetails/PictureSwaper/PictureSwaper";
import SubDetailsUser from "./SubDetailsUser/SubDetailsUser";
import Picture from "../../assets/img/cat.jpg";
import DetailsAnnonceUser from "./DetailsAnnonceUser/DetailsAnnonceUser";
import "./AnnonceDetailsUser.sass";
import EditIcon from "../../assets/icons/EditIcon";
import { useEffect, useState } from "react";
import { AnnonceData } from "../../data/Types";
import { alaivoGet } from "../../utils/Alaivo";
import { useParams } from "react-router";
interface AnnonceDetailsProps {
  id: string;
}
const AnnonceDetailsUser = () => {
  const { id } = useParams<AnnonceDetailsProps>();
  const { annonce, getAnnonce } = useGetData(id);

  const scrollToDetails = () => {
    let details = document.getElementById("details_annonnce_container");
    let container = document.querySelector(".details_content_page");
    if (details && container) {
      container.scrollTo(0, details.offsetTop - 5);
    }
  };

  const year = () => {
    if (annonce)
      if (annonce.year) {
        let yearTab = annonce.year.split("-");
        return yearTab[1] + "/" + yearTab[0];
      } else return "XX/XXXX";
  };

  return (
    <PageTemplate
      tiltePage={
        annonce !== null ? (
          annonce.modele?.nom + " " + annonce.brand?.nom
        ) : (
          <div className="skeleton full_bar_title"></div>
        )
      }
      subtitle={
        annonce !== null ? (
          `${year()} | ${annonce.motor?.nom} | ${annonce.modele?.type.nom}`
        ) : (
          <div className="skeleton full_bar_subtitle"></div>
        )
      }
    >
      <div className="details_content_page">
        <div className="annonce_user">
          <div className="profile">
            <div className="avatar">
              {annonce !== null ? (
                <img src={annonce.vendeur?.profile} />
              ) : (
                <div className="avatar_blank skeleton"></div>
              )}
            </div>
            <div className="user_data">
              <div className="name">
                {annonce !== null ? annonce.vendeur?.nom : <div className="name_blank skeleton"></div>}
              </div>
            </div>
          </div>
          <div className="see_details" onClick={scrollToDetails}>
            <div className="text"> Voir les details </div>
            <ArrowDownBoxIcon />
          </div>
        </div>
        <PictureSwaper loaded={annonce ? true : false} pictures={annonce?.pictures ? annonce?.pictures : [""]} />
        <hr />
        <SubDetailsUser loaded={annonce ? true : false} {...annonce} />
        <DetailsAnnonceUser loaded={annonce ? true : false} {...annonce} />
        <div id="edit_btn">
          <EditIcon />
        </div>
      </div>
    </PageTemplate>
  );
};

const useGetData = (id: any) => {
  const [annonce, setAnnonce] = useState<AnnonceData | null>(null);
  const [load, setLoaded] = useState(false);

  useEffect(() => {
    getAnnonce();
  }, []);

  const getAnnonce = async () => {
    setLoaded(false);
    let res = (await alaivoGet("bibine/actu/annonces/" + id, null, true)) as any;
    setLoaded(true);
    let annoc = res.data as AnnonceData;
    console.log(annoc);
    setAnnonce(annoc);
  };

  return { annonce, load, getAnnonce };
};

export default AnnonceDetailsUser;
