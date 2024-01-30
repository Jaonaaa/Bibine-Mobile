import { AnnonceData } from "../../data/Types";
import Rowsearch from "./RowSearch/Rowsearch";
import "./SearchResult.sass";

interface SearchResultProps {
  annonces: AnnonceData[] | any[];
}
const SearchResult = (props: SearchResultProps) => {
  const { annonces } = props;
  return (
    <div className="list_search_result">
      {annonces.map((annonce, index) => (
        <Rowsearch key={index} {...annonce} />
      ))}
    </div>
  );
};

export default SearchResult;
