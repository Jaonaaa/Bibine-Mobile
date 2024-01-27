import { alaivoGet } from "../../utils/Alaivo";

//
let brands = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/brands", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, value: re.id }));
    resolve(res);
  });
};

let modele = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/brand/MKE1/models", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, value: re.id }));
    resolve(res);
  });
};

let motor = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/motors", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, value: re.id }));
    resolve(res);
  });
};

let localisations = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/countries", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, value: re.id }));
    resolve(res);
  });
};

let maintenance = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/maintains", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, value: re.id }));
    resolve(res);
  });
};

export const inputsFirst = [
  {
    title: "Marque",
    type: "dropdown",
    name: "brand",
    options_src: brands,
  },
];

export const inputsSecond = [
  {
    title: "Modèle",
    type: "dropdown",
    name: "modele",
    options_src: modele,
  },
  {
    title: "Année de sortie",
    type: "month",
    name: "year",
  },
  {
    title: "Type de moteur",
    type: "dropdown",
    name: "motor",
    options_src: motor,
  },
];
export const inputsThird = [
  {
    title: "Description",
    type: "textarea",
    name: "description",
  },
];

export const inputsFourth = [
  {
    title: "Localisation",
    type: "dropdown",
    name: "localisation",
    options_src: localisations,
  },
  {
    title: "Détails",
    type: "list",
    name: "caracteristic",
  },
];

export const inputsFifth = [
  {
    title: "Quantité en stock",
    type: "number",
    name: "stock",
  },
  {
    title: "Kilometrage",
    type: "number",
    name: "kilometre",
  },
  {
    title: "Consommation par km",
    type: "number",
    name: "consommation",
  },
];

export const inputsSixth = [
  {
    title: "Maintenance",
    type: "selection",
    name: "maintenance",
    options_src: maintenance,
  },
];

export const inputsSeventh = [
  {
    title: "Photos",
    type: "file",
    name: "pictures",
    extra: "pictures",
  },
];

export const inputsEighth = [
  {
    title: "Main ( Ex :  1ère , 2ème , ...etc )",
    type: "number",
    name: "vendeur",
    constraint: (val: number) => {
      if (val >= 0) return true;
      else return false;
    },
  },
  {
    title: "Noter son état / 10",
    type: "number",
    name: "etat",
    constraint: (val: number) => {
      if (val <= 10 && val >= 0) return true;
      else return false;
    },
  },
];

export const inputsNineth = [
  {
    title: "Prix de base",
    type: "number",
    name: "prix",
    constraint: (val: number) => {
      if (val >= 0) return true;
      else return false;
    },
  },
];
