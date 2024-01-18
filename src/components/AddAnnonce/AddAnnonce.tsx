import { FormEvent, useEffect, useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";

import FormAnnonce from "./FormAnnonce/FormAnnonce";
import { inputsFirst, inputsSecond, inputsThird, inputsFifth, inputsFourth } from "./InputsData";
import "./AddAnnonce.sass";
import { alaivoPost } from "../../utils/Alaivo";
import { getBase64, resizeFile } from "../../utils/Files";
import HelperText from "./HelperText/HelperText";

const AddAnnonce: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [percent, setPercent] = useState(0);

  const handleInput = (e: any) => {
    if (e.target.type === "file") {
      let currentFile = formData[e.target.name];
      if (currentFile === "") setFormData((form: any) => ({ ...form, [e.target.name]: [...e.target.value] }));
      else {
        if (e.target.value[0] === undefined) return;
        let data = [...currentFile, ...e.target.value];
        setFormData((form: any) => ({ ...form, [e.target.name]: data }));
      }
    } else setFormData((form: any) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const next = (e: FormEvent) => {
    e.preventDefault();
    setPercent((percent) => percent + 100);
  };

  const upload = async (e: FormEvent) => {
    e.preventDefault();
    let files = [];

    for (let i = 0; i < formData[inputsThird[0].name].length; i++) {
      let base64 = await resizeFile(formData[inputsThird[0].name][i]);
      files.push(base64);
    }
    const fileData = JSON.stringify({
      files: files,
    });
    try {
      alaivoPost("upload/file", fileData, null, true)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert(error);
    }
  };

  const back = (e: FormEvent) => {
    e.preventDefault();
    setPercent((percent) => percent - 100);
  };

  const removePicture = (indexPicture: any) => {
    let filtredPicture = formData[inputsFifth[0].extra].filter((pic: any, index: number) => index !== indexPicture);
    setFormData((form: any) => ({ ...form, [inputsFifth[0].extra]: filtredPicture }));
  };

  return (
    <PageTemplate
      tiltePage={"Faire une annonce"}
      subtitle="Veuillez remplir ce qui est demander pour valider et publier votre annonce"
    >
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
          next={upload}
          inputs={inputsFifth}
          index={-1}
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
      </div>
    </PageTemplate>
  );
};

export default AddAnnonce;
