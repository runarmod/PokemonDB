import { PokeAPI } from "pokeapi-types";
import {
    capitalizeFirstLetter,
    filterAndSortPokemon,
    SortingType,
} from "../utils";
import mockBulbasaur from "./mocks/mockBulbasaur.json";
import mockCharmander from "./mocks/mockCharmander.json";
import mockSquirtle from "./mocks/mockSquirtle.json";

describe("capitalizeFirstLetter", () => {
    test("capitalize first letter when not capitalized", () => {
        expect(capitalizeFirstLetter("bulbasaur")).toBe("Bulbasaur");
    });

    test("capitalize first letter when already capitalized", () => {
        expect(capitalizeFirstLetter("Bulbasaur")).toBe("Bulbasaur");
    });
});

describe("Sorting and filtering", () => {
    let l: PokeAPI.Pokemon[] = [];
    beforeEach(() => {
        l = [
            JSON.parse(JSON.stringify(mockBulbasaur)),
            JSON.parse(JSON.stringify(mockCharmander)),
            JSON.parse(JSON.stringify(mockSquirtle)),
        ];
    });

    test("sort by id", () => {
        expect(filterAndSortPokemon(l, [], SortingType.ID, [])).toStrictEqual(
            Array.from(l)
        );
    });

    test("sort by name asc", () => {
        expect(
            filterAndSortPokemon(l, [], SortingType.NAME_ASC, [])
        ).toStrictEqual(Array.from(l));
    });

    test("sort by name desc", () => {
        expect(
            filterAndSortPokemon(l, [], SortingType.NAME_DESC, [])
        ).toStrictEqual(l.reverse());
    });

    test("filter on 'fire' type", () => {
        expect(
            filterAndSortPokemon(l, ["fire"], SortingType.ID, [])
        ).toStrictEqual([l[1]]);
    });

    test("filter on favorites", () => {
        expect(
            filterAndSortPokemon(l, ["favorite"], SortingType.ID, [1, 4])
        ).toStrictEqual([l[0], l[1]]);
    });
});
