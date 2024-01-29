import { alaivoGet } from "../../../utils/Alaivo";

export const brands = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/brands", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, id: re.id, value: re }));
    resolve(res);
  });
};

export const modeles = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/models", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, id: re.id, value: re }));
    resolve(res);
  });
};
export const colors = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/colors", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, id: re.id, value: re }));
    resolve(res);
  });
};
export const types = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/types", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, id: re.id, value: re }));
    resolve(res);
  });
};
