import CategorySection from "./CategorySection/CategorySection";
import CheckSection from "./CheckSection/CheckSection";
import "./FilterMenu.sass";
import MenuSection from "./MenuSection/MenuSection";
import PriceRangeSection from "./PriceRangeSection/PriceRangeSection";

interface FilterMenuProps {
  top?: number;
  right?: number;
  cancel?: () => void;
  apply?: () => void;
}
const FilterMenu = (props: FilterMenuProps) => {
  return (
    <div className="filter_menu" style={{ top: props.top + "px", right: props.right + "px" }}>
      <div className="title">Spécifications</div>
      <hr />
      <MenuSection title="Category">
        <CategorySection />
      </MenuSection>
      <MenuSection title="Shipping">
        <CheckSection />
      </MenuSection>
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
