import SearchIcon from "../../assets/icons/SearchIcon";
import FilterIcon from "../../assets/icons/FilterIcon";
import CrossIcon from "../../assets/icons/CrossIcon";
import { useEffect, useRef, useState } from "react";
import usePosition from "../../hooks/usePosition";
import FilterMenu from "./FilterMenu/FilterMenu";
import { setUpFormData } from "./SearchFunc";
import { alaivoPost } from "../../utils/Alaivo";
import "./SearchBar.sass";
import useMyNotifs from "../../utilsComponent/Notif/useNotifs";

interface SearchBarProps {
  hideHeader: (state: boolean) => {};
  focusedHeader: boolean;
  setFetching: Function;
  addAnnonces: Function;
}
const SearchBar = (props: SearchBarProps) => {
  const { hideHeader, focusedHeader, setFetching, addAnnonces } = props;
  const [searchText, setSearchText] = useState("");
  const [filterOn, setFilterOn] = useState(false);
  const filterBox = useRef<HTMLDivElement>(null);
  const searchBar = useRef<HTMLInputElement>(null);
  const { addNotifs, notifs } = useMyNotifs();

  const { position, getPosition } = usePosition(filterBox);

  const handleInput = (e: any) => {
    hideFilter();
    setSearchText(e.target.value);
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();

    hideFilter();
    setFetching(true);
    let res = (await alaivoPost(
      "bibine/actu/annonces/search",
      JSON.stringify({ description: searchText }),
      null,
      true
    )) as any;
    setFetching(false);
    if (res.data.length === 0) addNotifs("info", "Aucun résultat pour votre recherche", 2000);
    addAnnonces(res.data);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const handleFilter = () => {
    getPosition();
    setFilterOn(!filterOn);
  };

  const searchFiltred = async (form: any) => {
    let newForm = setUpFormData(form);
    setFetching(true);
    let res = (await alaivoPost("bibine/actu/annonces/search", JSON.stringify(newForm), null, true)) as any;
    setFetching(false);
    if (res.data.length === 0) addNotifs("info", "Aucun résultat pour votre recherche", 2000);
    addAnnonces(res.data);
  };

  const hideFilter = () => {
    setFilterOn(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (searchBar.current != null) searchBar.current?.focus();
    }, 50);
  }, [window.location.pathname]);

  useEffect(() => {
    setFilterOn(false);
  }, [hideHeader]);

  return (
    <form className="search_bar_box" onSubmit={handleSearch}>
      {notifs.map((notif) => notif)}
      <button onClick={handleSearch}>
        <div className="icon_search center">
          <SearchIcon />
        </div>
      </button>
      <div className="input">
        <input
          ref={searchBar}
          onChange={handleInput}
          onFocus={() => {
            hideFilter();
            hideHeader(true);
          }}
          value={searchText}
          type="text"
          autoFocus
          placeholder="Que recherchez-vous ?"
        />
      </div>
      <div className={`filter center ${filterOn ? "filter_on" : ""}`} ref={filterBox} onClick={handleFilter}>
        <FilterIcon />
      </div>
      {filterOn ? (
        <FilterMenu
          cancel={handleFilter}
          apply={searchFiltred}
          right={position.right - position.left - 10}
          top={position.top_Bottom + 10}
        />
      ) : (
        ""
      )}
      <div className="clear center" onClick={clearSearch}>
        <CrossIcon />
      </div>
    </form>
  );
};

export default SearchBar;
