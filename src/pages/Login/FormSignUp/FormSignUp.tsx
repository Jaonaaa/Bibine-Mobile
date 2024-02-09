import React, { useEffect, useState } from "react";
import LogoDefault from "../../../assets/svg/LogoDefault";
import RowInput from "../RowInput/RowInput";
import "./FormSignUp.sass";
import UseHandleForm from "./UseHandleForm";
import Logo from "../../../assets/icons/Logo";
import LogoBoxed from "../../../assets/icons/LogoBoxed";
import { IonPage } from "@ionic/react";
import useNav from "../../../hooks/useNav";
import Hider from "../../../components/Hider/Hider";
import { AnimatePresence } from "framer-motion";
import Select from "../../../components/Select/Select";
import { alaivoGet, alaivoPost } from "../../../utils/Alaivo";
import { resizeFile } from "../../../utils/Files";
import useMyNotifs from "../../../utilsComponent/Notif/useNotifs";
import useIdentity from "../../../hooks/useIdentity";
import useUserConnectivity from "../../../hooks/useUserConnectivity";

const FormSignUp = () => {
  const { to_forward } = useNav();
  const { addNotifs, notifs } = useMyNotifs();
  const { setUpStorageConnect } = useIdentity(addNotifs);
  const { connected } = useUserConnectivity(false);

  const [loading, setLoading] = useState(true);
  const [genders, setGenders] = useState([
    { label: "Homme", value: 0 },
    { label: "Femme", value: 1 },
  ]);

  const [localisations, setLocalisations] = useState<any>([]);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    if (!checkConnected()) {
      setLoading(false);
    } else {
      let data = { ...formData };
      let base64 = null;
      if (data["profile"]) {
        if (data["profile"].length > 0) {
          base64 = await resizeFile(data["profile"][0]);
        }
        data["profile"] = base64;
      }
      let res = (await alaivoPost("auth/register", JSON.stringify(data), null, true).catch((err) => {
        console.log(err);
      })) as any;
      console.log(res);
      if (res.status) {
        if (res.status.status === "error") {
          addNotifs("error", res.status.details, 1500);
        }
      } else {
        setUpStorageConnect(res);
        setTimeout(() => {
          window.location.href = "/main/home";
        }, 80);
      }
      setLoading(false);
    }
  };

  const checkEmail = async (formData: any) => {
    setLoading(true);

    return new Promise(async (resolve, reject) => {
      if (!checkConnected()) {
        setLoading(false);
        resolve(false);
      } else {
        if (!checkPassword(formData["password"])) {
          setLoading(false);
          resolve(false);
        } else {
          if (isValidEmail(formData["email"])) {
            let res = await alaivoPost("auth/check?email=" + formData["email"], null, null, true);
            setLoading(false);

            if (res) resolve(true);
            else {
              addNotifs("error", "Cette email est déja utilisé par un autre, veuiller entrer un autre", 2200);
              resolve(false);
            }
          } else {
            addNotifs("error", "Veuiller entrer un email valide", 2200);
            setLoading(false);
            resolve(false);
          }
        }
      }
    });
  };

  const checkConnected = () => {
    if (connected) return true;
    else {
      addNotifs("error", "Connecter vous à internet pour continuer", 4000);
      return false;
    }
  };

  const checkPassword = (password: any) => {
    if (password !== null && password) {
      if (password.length < 5) {
        addNotifs("error", "Veuiller entrer un mot de passe plus long > 5 ", 2200);
        return false;
      } else return true;
    } else {
      addNotifs("error", "Veuiller entrer un mot de passe ", 2200);
      return false;
    }
  };

  const checkUsernameAndDtn = async (formData: any) => {
    return new Promise(async (resolve, reject) => {
      console.log(formData);
      if (formData["name"] !== "" && formData["name"] && formData["dtn"]) {
        if (!checkValidDtn(formData["dtn"])) resolve(false);
        else resolve(true);
      } else {
        addNotifs("error", "Veuiller remplir tous les champs", 2200);
        resolve(false);
      }
    });
  };

  const checkValidDtn = (dtn: any) => {
    const targetDate = new Date(dtn);
    const today = new Date();
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(today.getFullYear() - 18);
    if (targetDate < fiveYearsAgo) {
      return true;
    } else {
      addNotifs("error", "Il faut être supérieur à au moins 18 ans pour s'inscrire chez Bibine ", 2200);
      return false;
    }
  };

  const checkCountryAndGender = async (formData: any) => {
    return new Promise(async (resolve, reject) => {
      if (formData["idcountry"] !== null && formData["gender"] !== null) {
        resolve(true);
      } else {
        addNotifs("error", "Veuiller bien selectionner ce qui est demandé", 2200);
        resolve(false);
      }
    });
  };

  const { backStep, formData, nextStep, moveStep, handleForm, handleInputForm, step } = UseHandleForm(4, [
    checkEmail,
    checkUsernameAndDtn,
    checkCountryAndGender,
    handleSubmit,
  ]);

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const getLocalisation = async () => {
    let locs = (await alaivoGet("bibine/actu/countries", null, true).catch(() => {
      setLoading(false);
    })) as any;
    setLoading(false);
    locs = locs.data.map((loc: any) => ({ label: loc.nom, value: loc.id }));
    setLocalisations(locs);
  };

  useEffect(() => {
    if (connected) getLocalisation();
    else addNotifs("error", "Connecter vous à internet pour continuer", 4000);
  }, [connected]);

  return (
    <IonPage>
      {notifs.map((notif) => notif)}
      <div id="login_container">
        <div className="sign_up_form">
          <div className="logo">
            <LogoBoxed />
          </div>
          <div className="title">Inscription</div>
          <div className="subtitle">Venez avec nous dans cette incroyable aventure.</div>
          <div className="slider">
            <div
              className={`slide ${step === 1 ? "slide_on" : ""}`}
              onClick={() => {
                moveStep(1);
              }}
            ></div>
            <div
              className={`slide ${step === 2 ? "slide_on" : ""}`}
              onClick={() => {
                moveStep(2);
              }}
            ></div>
            <div
              className={`slide ${step === 3 ? "slide_on" : ""}`}
              onClick={() => {
                moveStep(3);
              }}
            ></div>
            <div
              className={`slide ${step === 4 ? "slide_on" : ""}`}
              onClick={() => {
                moveStep(4);
              }}
            ></div>
          </div>
          <form action="" method="post" onSubmit={handleForm}>
            {step === 1 ? (
              <>
                {/* ///check if email valid */}
                <RowInput
                  title="Votre email"
                  type="email"
                  // required
                  value={formData.email}
                  id="email"
                  name="email"
                  fullWidth
                  onChange={handleInputForm}
                />
                <RowInput
                  title="Votre mot de passe"
                  type="password"
                  required
                  value={formData.password}
                  id="password"
                  name="password"
                  fullWidth
                  onChange={handleInputForm}
                />
                <div className="button">
                  <button>Suivant</button>
                </div>
              </>
            ) : (
              ""
            )}
            {step === 2 ? (
              <>
                <RowInput
                  title="Votre nom d'utilisateur"
                  type="text"
                  value={formData.name}
                  id="name"
                  name="name"
                  fullWidth
                  onChange={handleInputForm}
                />
                <RowInput
                  title="Votre date de naissance"
                  type="date"
                  value={formData.dtn}
                  id="dtn"
                  name="dtn"
                  fullWidth
                  onChange={handleInputForm}
                />
                <div className="button">
                  <button>Suivant</button>
                </div>
              </>
            ) : (
              ""
            )}
            {step === 3 ? (
              <>
                <Select title="Votre genre" optionsType={genders} name="gender" fullWidth onChange={handleInputForm} />
                <Select
                  title="Votre localisation"
                  optionsType={localisations}
                  name="idcountry"
                  fullWidth
                  onChange={handleInputForm}
                />
                <AnimatePresence>{loading && <Hider classCss="glassy" loader />}</AnimatePresence>

                <div className="button">
                  <button>Suivant</button>
                </div>
              </>
            ) : (
              ""
            )}
            {step === 4 ? (
              <>
                <RowInput
                  title="Votre photo de profil (facultatif)"
                  type="file"
                  value={formData.profile && formData.profile.length > 0 ? formData.profile[0] : undefined}
                  id="profile"
                  name="profile"
                  fullWidth
                  onChange={handleInputForm}
                />

                <div className="button">
                  <button>Terminer</button>
                </div>
              </>
            ) : (
              ""
            )}
            <AnimatePresence>{loading && <Hider classCss="glassy" loader />}</AnimatePresence>

            <div className="sign_up_link">
              <div className="text">Vous avez déja un compte ?</div>
              <div
                className="link"
                onClick={() => {
                  to_forward("/log/in");
                }}
              >
                Connectez-vous.
              </div>
            </div>
          </form>
        </div>
      </div>
    </IonPage>
  );
};

export default FormSignUp;
