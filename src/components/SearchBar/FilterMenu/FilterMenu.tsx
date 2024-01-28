import CheckSection from "./CheckSection/CheckSection";
import MenuSection from "./MenuSection/MenuSection";
import PriceRangeSection from "./PriceRangeSection/PriceRangeSection";
import SelectionSection from "./SelectionSection/SelectionSection";
import { alaivoGet } from "../../../utils/Alaivo";
import { useState } from "react";
import "./FilterMenu.sass";

interface FilterMenuProps {
  top?: number;
  right?: number;
  cancel?: () => void;
  apply?: () => void;
}

let brands = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/brands", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, id: re.id, value: re }));
    resolve(res);
  });
};

let modeles = async () => {
  return new Promise(async (resolve, reject) => {
    let res = (await alaivoGet("bibine/actu/brand/MKE1/models", null, true)) as any;
    res = res.data.map((re: any) => ({ label: re.nom, id: re.id, value: re }));
    resolve(res);
  });
};

const FilterMenu = (props: FilterMenuProps) => {
  let [formData, setFormData] = useState<any>({});

  const handleForm = (data: any) => {
    setFormData((data_old: any) => ({ ...data_old, [data.name]: data.value }));
  };

  return (
    <div className="filter_menu" style={{ top: props.top + "px", right: props.right + "px" }}>
      <div className="title">Spécifications</div>
      <hr />
      <MenuSection title="Marque">
        <SelectionSection callback={handleForm} name="Marque" selection_origin={brands} />
      </MenuSection>
      <MenuSection title="Modèle">
        <SelectionSection callback={handleForm} name="Modèle" selection_origin={modeles} />
      </MenuSection>
      {/* <MenuSection title="Shipping">
        <CheckSection />
      </MenuSection> */}
      <MenuSection title="Echelle des prix">
        <PriceRangeSection />
      </MenuSection>
      <div className="handler">
        <div className="cancel item" onClick={props.cancel}>
          CANCEL
        </div>
        <div className="divider_handler "></div>
        <div className="apply item" onClick={props.apply}>
          APPLY{" "}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
