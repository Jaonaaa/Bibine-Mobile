import PageTemplate from "../PageTemplate/PageTemplate";
import FormAnnonce from "./FormAnnonce/FormAnnonce";
import {
  inputsFirst,
  inputsSecond,
  inputsThird,
  inputsFifth,
  inputsFourth,
  inputsSeventh,
  inputsEighth,
  inputsSixth,
  inputsNineth,
} from "./InputsData";
import HelperText from "./HelperText/HelperText";
import useAddAnnonce from "./useAddAnnonce";
import Hider from "../Hider/Hider";
import "./AddAnnonce.sass";

const AddAnnonce: React.FC = () => {
  const { back, formData, handleInput, next, notifs, removePicture, sending, percent, sendAll } = useAddAnnonce();

  return (
    <PageTemplate
      tiltePage={"Faire une annonce"}
      subtitle="Veuillez remplir ce qui est demander pour valider et publier votre annonce"
    >
      {notifs.map((notif) => notif)}
      {sending && <Hider classCss="glassy" loader />}
      <div className="container_add_annonce_all">
        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsFirst}
          index={0}
          percent={percent}
        />
        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsSecond}
          index={1}
          percent={percent}
        />
        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsThird}
          index={2}
          percent={percent}
        />

        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsFourth}
          index={3}
          percent={percent}
        />
        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsFifth}
          index={4}
          percent={percent}
        />
        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsSixth}
          index={5}
          percent={percent}
        />

        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsSeventh}
          index={6}
          percent={percent}
          removePicture={removePicture}
          helper={
            <HelperText
              textHelp={
                <>
                  Vos photos devraient être d'un <span> ratio [ 3 / 2.4 ] </span> pour avoir une meilleur aperçue lors
                  de leur exposition dans l'annonce.
                </>
              }
            />
          }
        />

        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsEighth}
          index={7}
          percent={percent}
        />

        <FormAnnonce
          callBack={handleInput}
          formData={formData}
          back={back}
          next={sendAll}
          inputs={inputsNineth}
          index={-1}
          percent={percent}
        />
      </div>
    </PageTemplate>
  );
};

export default AddAnnonce;
