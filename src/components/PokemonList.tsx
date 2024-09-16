import { useInfiniteQuery } from "@tanstack/react-query";
import { PokeAPI } from "pokeapi-types";
import { useEffect, useState } from "react";
import { Requests } from "../api/Requests";
import "../styles/PokemonList.css";
import {
    capitalizeFirstLetter,
    filterAndSortPokemon,
    useAppContext,
} from "../utils";

const PokemonList = ({ limit }: { limit: number }) => {
    const {
        selectedPokemonId,
        changeSelectedPokemonId,
        sortingOrder,
        filters,
    } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const lastInterestingPokemonId = 1025;

    const handleItemClick = (index: number) => {
        changeSelectedPokemonId(index);
        if (window.innerWidth <= 900) {
            toggleMenu();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function getNextPage(): Promise<PokeAPI.Pokemon[]> {
        setOffset(offset + limit);
        return Requests.getPokemonSliceAllData(
            limit,
            offset,
            lastInterestingPokemonId + 1
        );
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["pokemon", "allData"],
        queryFn: getNextPage,
        initialPageParam: 1,
        getNextPageParam: (_lastPage, allPages) => {
            return offset >= lastInterestingPokemonId
                ? undefined
                : allPages.length + 1;
        },
    });

    useEffect(() => {
        if (data !== undefined) {
            const sortedAndFilteredPokemon = filterAndSortPokemon(
                data.pages.flat(),
                filters,
                sortingOrder
            );
            if (sortedAndFilteredPokemon.length) {
                changeSelectedPokemonId(sortedAndFilteredPokemon[0].id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortingOrder, filters]);

    if (isLoading) return <div>Loading...</div>;
    if (error || data == undefined)
        return <div>Error fetching Pokémon data</div>;

    return (
        <>
            <button
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                aria-label="Toggle Menu"
                onClick={toggleMenu}
            >
                <div className="hamburgerLine"></div>
                <div className="hamburgerLine"></div>
                <div className="hamburgerLine"></div>
            </button>

            <ul className={`list ${isMenuOpen ? "active" : ""}`}>
                {filterAndSortPokemon(
                    data.pages.flat(),
                    filters,
                    sortingOrder
                ).map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className={
                            selectedPokemonId == pokemon.id ? "selected" : ""
                        }
                        onClick={() => handleItemClick(pokemon.id)}
                        role="button"
                        aria-pressed={selectedPokemonId == pokemon.id}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key == "Enter" || e.key == " ") {
                                handleItemClick(pokemon.id);
                            }
                        }}
                    >
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`${capitalizeFirstLetter(pokemon.name)} image`}
                        />
                        {capitalizeFirstLetter(pokemon.name)}
                    </li>
                ))}
                {hasNextPage && (
                    <li
                        onClick={() => fetchNextPage()}
                        role="button"
                        aria-pressed={isFetchingNextPage}
                        onKeyDown={(e) => {
                            if (e.key == "Enter" || e.key == " ") {
                                fetchNextPage();
                            }
                        }}
                    >
                        <img
                            src="src/assets/refresh.png"
                            alt="Refresh icon"
                            className={
                                isFetchingNextPage
                                    ? "loading refresh"
                                    : "refresh"
                            }
                        />
                        {isFetchingNextPage ? "Loading more..." : "Load More"}
                    </li>
                )}
            </ul>
        </>
    );
};

export default PokemonList;
