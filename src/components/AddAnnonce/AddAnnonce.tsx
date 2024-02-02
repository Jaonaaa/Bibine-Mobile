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
import { AnimatePresence } from "framer-motion";
import "./AddAnnonce.sass";
import ValidationModal from "../../utilsComponent/Modal/Validation/ValidationModal";

const AddAnnonce: React.FC = () => {
  const {
    back,
    formData,
    handleInput,
    next,
    loadedAll,
    upLoaded,
    notifs,
    removePicture,
    setLoadedAll,
    sending,
    percent,
    sendAll,
    finished,
    handleSecondForm,
    handleFifthForm,
    handleSeventhForm,
    handleEighthForm,
    handleNineth,
  } = useAddAnnonce();

  const finishedContent =
    "Votre annonce a bien été enregistrer et est maintenant em attente de validation par les admins de Bibine. ";

  return (
    <PageTemplate
      tiltePage={"Faire une annonce"}
      subtitle="Veuillez remplir ce qui est demander pour valider et publier votre annonce"
    >
      <AnimatePresence>
        {!loadedAll && (
          <Hider classCss="white" loader animate="showUp">
            <div className="text_hider">Veuillez patienter...</div>
          </Hider>
        )}
      </AnimatePresence>

      {notifs.map((notif) => notif)}
      {sending && <Hider classCss="glassy" loader />}
      {finished && (
        <ValidationModal
          content={finishedContent}
          cancelOn={false}
          callBack={() => {
            window.location.href = "/main/home";
          }}
          validationText="Revenir à la page d'acceuil"
          title="Annonce enregistré !!"
        />
      )}
      <div className="container_add_annonce_all">
        <FormAnnonce
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsFirst}
          index={0}
          percent={percent}
        />
        <FormAnnonce
          setLoading={setLoadedAll}
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={handleSecondForm}
          inputs={inputsSecond}
          index={1}
          percent={percent}
        />
        <FormAnnonce
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsThird}
          index={2}
          percent={percent}
        />

        <FormAnnonce
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsFourth}
          index={3}
          percent={percent}
        />
        <FormAnnonce
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={handleFifthForm}
          inputs={inputsFifth}
          index={4}
          percent={percent}
        />
        <FormAnnonce
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={next}
          inputs={inputsSixth}
          index={5}
          percent={percent}
        />

        <FormAnnonce
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={handleSeventhForm}
          inputs={inputsSeventh}
          index={6}
          percent={percent}
          removePicture={removePicture}
          helper={
            <HelperText
              textHelp={
                <>
                  Vos photos devraient être d'un <span> ratio [ 3 / 2.4 ] </span> pour avoir une meilleur aperçue lors de
                  leur exposition dans l'annonce.
                </>
              }
            />
          }
        />

        <FormAnnonce
          uploaded={upLoaded}
          callBack={handleInput}
          formData={formData}
          back={back}
          next={handleEighthForm}
          inputs={inputsEighth}
          index={7}
          percent={percent}
        />

        <FormAnnonce
          uploaded={upLoaded}
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
