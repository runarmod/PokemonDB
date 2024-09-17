import { pokemonTypeColors, sortingType, useAppContext } from "../utils";
import PokemonTypeLabel from "./PokemonTypeLabel";
import Star from "../assets/star_filled.png";
import "../styles/SortAndFilter.css";

export default function SortAndFilter() {
    const { sortingOrder, changeSortingOrder, updateFilters, filters } =
        useAppContext();

    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        changeSortingOrder(Number(event.target.value));
    }

    function handleCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
        updateFilters(event.target.value);
    }
    return (
        <div className="sortAndFilter">
            <h2>Sort by</h2>
            <ul className="sortList">
                <li className="sortListEntry">
                    <input
                        type="radio"
                        name="sorting"
                        id="rbtId"
                        value={sortingType.ID}
                        onChange={handleRadioChange}
                        checked={sortingOrder == sortingType.ID}
                    />
                    <label htmlFor="rbtId">#ID</label>
                </li>
                <li className="sortListEntry">
                    <input
                        type="radio"
                        name="sorting"
                        id="rbtName"
                        value={sortingType.NAME_ASC}
                        onChange={handleRadioChange}
                        checked={sortingOrder == sortingType.NAME_ASC}
                    />
                    <label htmlFor="rbtName">Name A-Z</label>
                </li>
                <li className="sortListEntry">
                    <input
                        type="radio"
                        name="sorting"
                        id="rbtNameReversed"
                        value={sortingType.NAME_DESC}
                        onChange={handleRadioChange}
                        checked={sortingOrder == sortingType.NAME_DESC}
                    />
                    <label htmlFor="rbtNameReversed">Name Z-A</label>
                </li>
            </ul>
            <h2>Filters</h2>
            <ul className="filterList">
                <li className="filterListEntry">
                    <input
                        type="checkbox"
                        id="checkFavorite"
                        value={"favorite"}
                        onChange={handleCheckChange}
                        checked={filters.includes("favorite")}
                    />
                    <label htmlFor="checkFavorite">
                        <img src={Star} alt="favorite icon" id="favoriteIcon" />
                    </label>
                </li>

                {Array.from(pokemonTypeColors.keys()).map((type: string) => (
                    <li key={type} className="filterListEntry">
                        <input
                            type="checkbox"
                            id={"check" + type}
                            value={type}
                            onChange={handleCheckChange}
                            checked={filters.includes(type)}
                        />
                        <label htmlFor={"check" + type}>
                            <PokemonTypeLabel type={type} />
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
