import { PokeAPI } from "pokeapi-types";
import { useContext } from "react";
import { AppContext } from "./components/ContextProvider";

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortByNameAsc(p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon): number {
    return p1.name.localeCompare(p2.name);
}

function sortByNameDesc(p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon): number {
    return p2.name.localeCompare(p1.name);
}

function sortById(p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon): number {
    return p1.id - p2.id;
}

export enum sortingType {
    NAME_ASC,
    NAME_DESC,
    ID,
}

export const sortingMap: Map<
    sortingType,
    (p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon) => number
> = new Map<sortingType, (p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon) => number>([
    [sortingType.NAME_ASC, sortByNameAsc],
    [sortingType.NAME_DESC, sortByNameDesc],
    [sortingType.ID, sortById],
]);

export const pokemonTypeColors: Map<string, string> = new Map<string, string>([
    ["normal", "#9FA19F"],
    ["fire", "#E62829"],
    ["water", "#2980EF"],
    ["electric", "#FAC000"],
    ["grass", "#3FA129"],
    ["ice", "#3DCEF3"],
    ["fighting", "#FF8000"],
    ["poison", "#9141CB"],
    ["ground", "#915121"],
    ["flying", "#81B9EF"],
    ["psychic", "#EF4179"],
    ["bug", "#91A119"],
    ["ghost", "#704170"],
    ["dragon", "#5060E1"],
    ["dark", "#624D4E"],
    ["steel", "#60A1B8"],
    ["fairy", "#EF70EF"],
]);

export function filterAndSortPokemon(
    pokemon: PokeAPI.Pokemon[],
    filters: string[],
    sortingOrder: sortingType,
    favorites: number[]
): PokeAPI.Pokemon[] {
    return pokemon
        .filter((p: PokeAPI.Pokemon) => {
            if (filters.length == 0) {
                return true;
            }
            const types: string[] = p.types.map((t) => t.type.name);
            for (let i = 0; i < filters.length; i++) {
                if (types.includes(filters[i])) {
                    return true;
                }
                if (filters[i] == "favorite" && favorites.includes(p.id)) {
                    return true;
                }
            }
            return false;
        })
        .sort(sortingMap.get(sortingOrder));
}

//helper function to check if AppContext is null, that means it is used outside a Provider
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a Provider");
    }
    return context;
};
