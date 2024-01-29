import CheckSection from "./CheckSection/CheckSection";
import MenuSection from "./MenuSection/MenuSection";
import PriceRangeSection from "./PriceRangeSection/PriceRangeSection";
import SelectionSection from "./SelectionSection/SelectionSection";
import { useEffect, useState } from "react";
import DateSection from "./DateSection/DateSection";
import { brands, colors, modeles, types } from "./FilterSources";
import "./FilterMenu.sass";

interface FilterMenuProps {
  top?: number;
  right?: number;
  cancel?: () => void;
  apply: Function;
}

const FilterMenu = (props: FilterMenuProps) => {
  let [formData, setFormData] = useState<any>({});

  const handleForm = (data: any) => {
    setFormData((data_old: any) => ({ ...data_old, [data.name]: data.value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div
      className="filter_menu"
      style={{ top: props.top + "px", right: props.right + "px" }}
    >
      <div className="title">Spécifications</div>
      <hr />
      <MenuSection title="Marque">
        <SelectionSection
          callback={handleForm}
          name="marque"
          selection_origin={brands}
        />
      </MenuSection>
      <MenuSection title="Modèle">
        <SelectionSection
          callback={handleForm}
          name="modele"
          selection_origin={modeles}
        />
      </MenuSection>
      <MenuSection title="Types">
        <SelectionSection
          callback={handleForm}
          name="types"
          selection_origin={types}
        />
      </MenuSection>
      <MenuSection title="Couleurs">
        <SelectionSection
          callback={handleForm}
          name="couleurs"
          selection_origin={colors}
        />
      </MenuSection>

      <MenuSection title="Echelle des prix">
        <PriceRangeSection
          callback={handleForm}
          min={1000000}
          max={200000000}
          name="prices"
          unit="Ar"
          diff={100}
        />
      </MenuSection>

      <MenuSection title="Date de publication">
        <DateSection callback={handleForm} name="dates" />
      </MenuSection>

      <MenuSection title="Etat voiture">
        <PriceRangeSection
          callback={handleForm}
          min={0}
          max={10}
          unit=""
          name="etats"
          diff={1}
        />
      </MenuSection>
      <div className="handler">
        <div className="cancel item" onClick={props.cancel}>
          CANCEL
        </div>
        <div className="divider_handler "></div>
        <div
          className="apply item"
          onClick={() => {
            props.apply(formData);
          }}
        >
          APPLY{" "}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
