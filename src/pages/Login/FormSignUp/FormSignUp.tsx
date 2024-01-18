import React from "react";
import LogoDefault from "../../../assets/svg/LogoDefault";
import RowInput from "../RowInput/RowInput";
import "./FormSignUp.sass";
import UseHandleForm from "./UseHandleForm";
import Logo from "../../../assets/icons/Logo";
import LogoBoxed from "../../../assets/icons/LogoBoxed";
import { IonPage } from "@ionic/react";
import useNav from "../../../hooks/useNav";

const FormSignUp = () => {
  const { to_forward } = useNav();

  const handleSubmit = async (props: any) => {
    // console.log("FormSignUp");
  };

  const { backStep, formData, nextStep, moveStep, handleForm, handleInputForm, step } = UseHandleForm(3, [
    async () => {},
    async () => {},
    handleSubmit,
  ]);

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
                  title="Hzllo world"
                  type="text"
                  value={formData.hello}
                  id="hello"
                  name="hello"
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
