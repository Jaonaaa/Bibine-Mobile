export const setUpFormData = (formData: any) => {
  const newFormData = { ...formData };
  const res = {} as any;
  ///
  if (newFormData["etats"]) {
    res["infEtat"] = newFormData["etats"]["min"];
    res["supEtat"] = newFormData["etats"]["max"];
  }
  if (newFormData["prices"]) {
    res["infMontant"] = newFormData["prices"]["min"];
    res["supMontant"] = newFormData["prices"]["max"];
  }
  if (newFormData["dates"]) {
    res["dateInf"] = newFormData["dates"]["min"] + "T00:00:00.0";
    res["dateSup"] = newFormData["dates"]["max"] + "T00:00:00.0";
  }
  ////
  if (newFormData["marque"]) {
    res["brands"] = newFormData["marque"].map((row: any) => row.value);
    res["brands"] = emptyToNull(res["brands"]);
  }
  if (newFormData["types"]) {
    res["types"] = newFormData["types"].map((row: any) => row.value);
    res["types"] = emptyToNull(res["types"]);
  }
  if (newFormData["couleurs"]) {
    res["couleurs"] = newFormData["couleurs"].map((row: any) => row.value);
    res["couleurs"] = emptyToNull(res["couleurs"]);
  }
  if (newFormData["modele"]) {
    res["modeles"] = newFormData["modele"].map((row: any) => row.value);
    res["modeles"] = emptyToNull(res["modeles"]);
  }

  return res;
};

const emptyToNull = (array: []) => {
  if (array.length == 0) return null;
  else return array;
};
