import { PokeAPI } from "pokeapi-types";

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortByNameAsc(p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon): number {
    return p1.name.localeCompare(p2.name);
}

function sortByNameDesc(p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon): number {
    return p2.name.localeCompare(p1.name);
}

export const sortingMap: Map<string, (p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon) => number> = new Map<string, (p1: PokeAPI.Pokemon, p2: PokeAPI.Pokemon) => number>([
    ["name_asc", sortByNameAsc],
    ["name_desc", sortByNameDesc]
]);