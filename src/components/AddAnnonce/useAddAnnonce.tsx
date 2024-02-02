import React, { FormEvent, useEffect, useState } from "react";
import { inputsSeventh } from "./InputsData";
import { resizeFile } from "../../utils/Files";
import { alaivoPost } from "../../utils/Alaivo";
import useMyNotifs from "../../utilsComponent/Notif/useNotifs";
import { getUser } from "../../data/storage";

const useAddAnnonce = () => {
  const { addNotifs, notifs } = useMyNotifs();
  const [formData, setFormData] = useState<any>({});
  const [percent, setPercent] = useState(0);
  const [sending, setSending] = useState(false);
  //
  const targetLoadContent = 5;
  const [loadedAll, setLoadedAll] = useState(false);
  const [count_loaded, setCountLoaded] = useState(0);
  const [finished, setFinished] = useState(false);
  //

  const upLoaded = () => {
    setCountLoaded((count: number) => count + 1);
  };

  useEffect(() => {
    if (count_loaded === targetLoadContent) setLoadedAll(true);
  }, [count_loaded]);

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

  const uploadForm = async () => {
    return new Promise(async (resolve, reject) => {
      let files = [];
      for (let i = 0; i < formData[inputsSeventh[0].name].length; i++) {
        let base64 = await resizeFile(formData[inputsSeventh[0].name][i]);
        files.push(base64);
      }
      resolve(files);
    });
  };

  const handleSecondForm = (e: FormEvent) => {
    e.preventDefault();
    if (formData["year"] === null || formData["year"] === "")
      addNotifs("error", "Veuiller fournir l'année de sortie de la voiture", 2000);
    else {
      let date = new Date(formData["year"]);
      const currentDate = new Date(); // current date
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      if (date > firstDayOfMonth) addNotifs("error", "L'année de sortie ne peut pas être supérieur a aujourd'hui", 2000);
      else {
        setPercent((percent) => percent + 100);
      }
    }
  };

  const handleFifthForm = (e: FormEvent) => {
    e.preventDefault();
    if (formData["kilometre"] === null || formData["kilometre"] === "")
      addNotifs("error", "Veuiller fournir un kilometrage", 2000);
    else if (formData["consommation"] === null || formData["consommation"] === "") {
      addNotifs("error", "Veuiller fournir une consommation", 2000);
    } else if (+formData["consommation"] < 0 || +formData["kilometre"] < 0) {
      addNotifs("error", "Les valeurs ne peuvent pas être négatives", 2000);
    } else if (+formData["consommation"] === 0) {
      addNotifs("error", "Consommation invalide", 2000);
    } else setPercent((percent) => percent + 100);
  };

  const handleSeventhForm = (e: FormEvent) => {
    e.preventDefault();
    if (formData["pictures"] === null || formData["pictures"] === "") {
      addNotifs("error", "Veuiller entrer au moins 1 image", 2000);
    } else if (formData["pictures"].length === 0) addNotifs("error", "Veuiller entrer au moins 1 image", 2000);
    else setPercent((percent) => percent + 100);
  };

  const handleNineth = () => {
    if (formData["prix"] === null || formData["prix"] === "") {
      addNotifs("error", "Veuiller entrer un prix", 2000);
    } else if (+formData["prix"] <= 0) addNotifs("error", "Le prix doit être supérieure a 0", 2000);
    else return true;
  };

  const handleEighthForm = (e: FormEvent) => {
    e.preventDefault();
    if (formData["vendeur"] === null || formData["vendeur"] === "")
      addNotifs("error", "Veuiller préciser que vous êtes le propriétaire N°? de cette voiture ", 2000);
    else if (formData["etat"] === null || formData["etat"] === "") {
      addNotifs("error", "Veuiller donner l'état de cette voiture sur 10", 2000);
    } else if (+formData["vendeur"] < 0 || +formData["etat"] < 0) {
      addNotifs("error", "Les valeurs ne peuvent pas être négatives", 2000);
    } else if (+formData["etat"] === 0) {
      addNotifs("error", "L'etat de cette voiture est trop bas :(", 2000);
    } else if (+formData["vendeur"] === 0) {
      //
      addNotifs("error", "Veuillez entrer le nombre 1 si vous êtes le premier propriétaire de cette voiture  ", 2000);
    } else setPercent((percent) => percent + 100);
  };

  const back = (e: FormEvent) => {
    e.preventDefault();
    setPercent((percent) => percent - 100);
  };

  const removePicture = (indexPicture: any) => {
    let filtredPicture = formData[inputsSeventh[0].extra].filter((pic: any, index: number) => index !== indexPicture);
    setFormData((form: any) => ({ ...form, [inputsSeventh[0].extra]: filtredPicture }));
  };

  //
  const sendAll = async (e: FormEvent) => {
    e.preventDefault();
    if (handleNineth()) {
      setSending(true);
      let data = { ...formData };
      data = await reformData(data);
      let user = getUser();
      await alaivoPost("bibine/user/" + user.id + "/annonces", JSON.stringify(data), null, false);
      addNotifs("OK", "Annonce enregistré", 2000);
      setSending(false);
      setFinished(true);
    }
  };

  const reformData = async (data: any) => {
    let vendeur = { proprietaire: data["vendeur"] };
    data["vendeur"] = vendeur;

    let brand = { id: data["brand"] };
    data["brand"] = brand;

    let colors = { id: data["couleur"] };
    data["couleur"] = colors;

    let motor = { id: data["motor"] };
    data["motor"] = motor;

    let localisation = { id: data["localisation"] };
    data["localisation"] = localisation;

    let modele = { id: data["modele"] };
    data["modele"] = modele;

    data["pictures"] = await uploadForm();

    let maintenance = data["maintenance"].map((m: any) => ({ id: m["value"] }));
    data["maintenance"] = maintenance;

    let caracteristic = data["caracteristic"].map((m: any) => ({ key: m["label"], value: m["value"] }));
    data["caracteristic"] = caracteristic;

    return data;
  };

  return {
    handleSecondForm,
    handleFifthForm,
    handleSeventhForm,
    handleEighthForm,
    handleNineth,
    formData,
    handleInput,
    next,
    loadedAll,
    upLoaded,
    back,
    removePicture,
    sending,
    notifs,
    percent,
    sendAll,
    setLoadedAll,
    finished,
  };
};

export default useAddAnnonce;
