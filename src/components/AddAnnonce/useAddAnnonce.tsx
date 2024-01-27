import React, { FormEvent, cloneElement, useEffect, useState } from "react";
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
  //

  const upLoaded = () => {
    setCountLoaded((count: number) => count + 1);
  };

  useEffect(() => {
    // console.log(formData);
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
    setSending(true);
    let data = { ...formData };
    data = await reformData(data);
    console.log(data);
    let user = getUser();
    let res = await alaivoPost("bibine/user/" + user.id + "/annonces", JSON.stringify(data), null, false);
    console.log(res);
    addNotifs("OK", "Annonce enregistré", 2000);
    setSending(false);
    setTimeout(() => {
      window.location.href = "/main/home";
    }, 500);
  };

  const reformData = async (data: any) => {
    let vendeur = { proprietaire: data["vendeur"] };
    data["vendeur"] = vendeur;

    let brand = { id: data["brand"] };
    data["brand"] = brand;

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

  return { formData, handleInput, next, loadedAll, upLoaded, back, removePicture, sending, notifs, percent, sendAll };
};

export default useAddAnnonce;
