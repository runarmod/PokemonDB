import pokemonTypeColors from "../pokemonTypeColors";
import PokemonTypeLabel from "./PokemonTypeLabel";
import "../styles/SortAndFilter.css";
import StarIcon from "@mui/icons-material/Star";

export default function SortAndFilter() {
    return (
        <div className="sortAndFilter">
            <h2>Sort by</h2>
            <ul className="sortList">
                <li className="sortListEntry">
                    <input type="radio" name="sorting" id="rbtName" />
                    <label htmlFor="rbtName">Name A-Z</label>
                </li>
                <li className="sortListEntry">
                    <input type="radio" name="sorting" id="rbtNameReversed" />
                    <label htmlFor="rbtNameReversed">Name Z-A</label>
                </li>
                <li className="sortListEntry">
                    <input type="radio" name="sorting" id="rbtId" />
                    <label htmlFor="rbtId">#ID</label>
                </li>
            </ul>
            <h2>Filters</h2>
            <ul className="filterList">
                <li className="filterListEntry">
                    <label htmlFor="checkFavorite"></label>
                    <input type="checkbox" id="checkFavorite" />
                    <StarIcon sx={{ fontSize: 30 }} className="starIcon" />
                </li>

                {Array.from(pokemonTypeColors.keys()).map((type) => (
                    <li key={type} className="filterListEntry">
                        <label htmlFor={"check" + type}></label>
                        <input type="checkbox" id={"check" + type}></input>
                        <PokemonTypeLabel type={type} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
