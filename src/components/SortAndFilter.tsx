import pokemonTypeColors from "../utils";
import PokemonTypeLabel from "./PokemonTypeLabel";
import "../styles/SortAndFilter.css";
import StarIcon from "@mui/icons-material/Star";
import React, { useContext } from "react";
import { Context } from "./ContextProvider";

export default function SortAndFilter() {
    const { sortingOrder, changeSortingOrder, updateFilters, filters } =
        useContext(Context);

    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        changeSortingOrder(event.target.value);
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
                        value="id"
                        onChange={handleRadioChange}
                        checked={sortingOrder == "id"}
                    />
                    <label htmlFor="rbtId">#ID</label>
                </li>
                <li className="sortListEntry">
                    <input
                        type="radio"
                        name="sorting"
                        id="rbtName"
                        value="name_asc"
                        onChange={handleRadioChange}
                        checked={sortingOrder == "name_asc"}
                    />
                    <label htmlFor="rbtName">Name A-Z</label>
                </li>
                <li className="sortListEntry">
                    <input
                        type="radio"
                        name="sorting"
                        id="rbtNameReversed"
                        value="name_desc"
                        onChange={handleRadioChange}
                        checked={sortingOrder == "name_desc"}
                    />
                    <label htmlFor="rbtNameReversed">Name Z-A</label>
                </li>
            </ul>
            <h2>Filters</h2>
            <ul className="filterList">
                <li className="filterListEntry">
                    <label htmlFor="checkFavorite"></label>
                    <input
                        type="checkbox"
                        id="checkFavorite"
                        value={"favorite"}
                        onChange={handleCheckChange}
                        checked={filters.includes("favorite")}
                    />
                    <StarIcon sx={{ fontSize: 30 }} className="starIcon" />
                </li>

                {Array.from(pokemonTypeColors.keys()).map((type: string) => (
                    <li key={type} className="filterListEntry">
                        <label htmlFor={"check" + type}></label>
                        <input
                            type="checkbox"
                            id={"check" + type}
                            value={type}
                            onChange={handleCheckChange}
                            checked={filters.includes(type)}
                        />
                        <PokemonTypeLabel type={type} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
