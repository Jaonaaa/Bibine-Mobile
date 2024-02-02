interface BrandData {
  id: string;
  nom: string;
  state: number;
}
interface TypeData {
  id: string;
  nom: string;
  state: number;
}
interface ModeleData {
  id: string;
  nom: string;
  places: number;
  doors: number;
  state: number;
  date: string;
  brand: BrandData;
  type: TypeData;
}
interface CaracteristicData {
  key: string;
  value: string;
}
interface MaintenanceData {
  id: string;
  nom: string;
  state: number;
}
interface LocalisationData {
  id: string;
  nom: string;
  state: number;
}
interface VendeurData {
  idvendeur: number;
  proprietaire: number;
  profile: string;
  nom: string;
}
interface MotorData {
  id: string;
  nom: string;
  state: number;
}
interface CouleurData {
  id: string;
  nom: string;
  state: number;
}

export interface AnnonceData {
  loadedContent?: boolean;
  id_annonce?: string;
  callback?: Function;
  loaded?: boolean;
  ///
  id?: string;
  brand?: BrandData;
  modele?: ModeleData;
  caracteristic?: CaracteristicData[];
  prix?: number;
  year?: string;
  kilometre?: number;
  consommation?: number;
  maintenance?: MaintenanceData[];
  localisation?: LocalisationData;
  stock?: number;
  vendeur?: VendeurData;
  commision?: number;
  pictures?: string[];
  motor?: MotorData;
  etat?: number;
  state?: number;
  favoris?: string[];
  date?: string;
  description?: string;
  validity?: number;
  couleur?: CouleurData;
}
