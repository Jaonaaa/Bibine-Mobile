import React, { useState } from "react";
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

const FormSignUp = () => {
  const { to_forward } = useNav();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (props: any) => {
    // console.log("FormSignUp");
    setSending(true);
    setTimeout(() => {
      setSending(false);
    }, 3500);
  };

  const myAsyncFunction = async (formData: any) => {
    return new Promise((resolve, reject) => {
      if (isValidEmail(formData["email"])) resolve(true);
      else resolve(false);
    });
  };

  const { backStep, formData, nextStep, moveStep, handleForm, handleInputForm, step } = UseHandleForm(3, [
    myAsyncFunction,
    async () => {
      return true;
    },
    handleSubmit,
  ]);

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <IonPage>
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
                  value={formData.username}
                  id="username"
                  name="username"
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
                <RowInput
                  title="Votre photo de profil (facultatif)"
                  type="file"
                  value={formData.picture && formData.picture.length > 0 ? formData.picture[0] : undefined}
                  id="picture"
                  name="picture"
                  fullWidth
                  onChange={handleInputForm}
                />
                <AnimatePresence>{sending && <Hider classCss="glassy" loader />}</AnimatePresence>

                <div className="button">
                  <button>Terminer</button>
                </div>
              </>
            ) : (
              ""
            )}

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
