import { useState } from "react";
import RowInput from "../RowInput/RowInput";
import Divider from "../Divider/Divider";
import ButtonLogo from "../ButtonLogo/ButtonLogo";
import GoogleIcon from "../../../assets/svg/GoogleIcon";
import AppleIcon from "../../../assets/svg/AppleIcon";
import LogoBoxed from "../../../assets/icons/LogoBoxed";
import { IonPage } from "@ionic/react";
import useNav from "../../../hooks/useNav";
import { storage } from "../../../data/storage";
import "./FormSignIn.sass";

interface formSignIn {
  email: string;
  password: string;
}

const FormSignIn = () => {
  const [formData, setFormData] = useState<formSignIn>({ email: "", password: "" });
  const { to_forward } = useNav();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // base verfifcation
    // redirection
    // me
    localStorage.setItem(storage.user_name, formData.email);
    localStorage.setItem(storage.user_email, formData.email);
    localStorage.setItem(storage.user_connected, "true");
  };

  const handleInput = (e: any) => {
    setFormData((form: any) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <IonPage>
      <div id="login_container">
        <div className="sign_in_form">
          <div className="logo">
            <LogoBoxed />
          </div>
          <div className="title">Connexion</div>
          <div className="subtitle">Plongeons ensemble dans cet incroyable voyage.</div>
          <form action="" method="post" onSubmit={handleSubmit}>
            <RowInput title="Email" type="email" id="email" name="email" fullWidth onChange={handleInput} />
            <RowInput
              title="Mot de passe"
              type="password"
              id="password"
              name="password"
              fullWidth
              onChange={handleInput}
            />
            <div className="button">
              <button>Se connecter</button>
            </div>

            <div className="sign_up_link">
              <div className="text">Vous n'avez pas de compte ?</div>
              <div
                className="link"
                onClick={() => {
                  to_forward("/log/up");
                }}
              >
                Inscrivez vous.
              </div>
            </div>
          </form>
          {/* <Divider text={"OR"} className={"divider_form"} /> */}
          {/* <ButtonLogo icon={<GoogleIcon />} text={"Continuer avec Google"} /> */}
          {/* <ButtonLogo icon={<AppleIcon />} text={"Continue with Apple"} /> */}
        </div>
      </div>
    </IonPage>
  );
};

export default FormSignIn;
