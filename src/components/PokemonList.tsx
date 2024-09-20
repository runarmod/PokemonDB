import { useInfiniteQuery } from "@tanstack/react-query";
import { PokeAPI } from "pokeapi-types";
import { useEffect, useRef, useState } from "react";
import { Requests } from "../api/Requests";
import "../styles/PokemonList.css";
import RefreshIcon from "../assets/refresh.png";
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
        favorites,
        currentPokemonList,
        setCurrentPokemonList,
    } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const lastInterestingPokemonId = 1025;
    const pokemonRefs = useRef<{ [key: number]: HTMLLIElement | null }>({});

    const handleItemClick = (index: number) => {
        changeSelectedPokemonId(index);
        if (window.innerWidth <= 945) {
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
                sortingOrder,
                favorites
            );
            setCurrentPokemonList(sortedAndFilteredPokemon);
            if (sortedAndFilteredPokemon.length) {
                changeSelectedPokemonId(sortedAndFilteredPokemon[0].id);
            } else {
                changeSelectedPokemonId(0);
            }
        }

        // We want this useEffect() to be called every time the 'sortingOrder' or 'filters' change.
        // This is because we want to reset the 'currentPokemonList' to correctly reflect the new sorting and filtering.
        // We also want to have control over which pokemon is selected when the 'currentPokemonList' is updated.
        // The other dependencies are handled in their own useEffect()s.
        // Because of this we disable the eslint warning on this line.

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortingOrder, filters]);

    useEffect(() => {
        if (data !== undefined) {
            const sortedAndFilteredPokemon = filterAndSortPokemon(
                data.pages.flat(),
                filters,
                sortingOrder,
                favorites
            );
            setCurrentPokemonList(sortedAndFilteredPokemon);
        }

        // We want this useEffect() to be called every time the 'data' change.
        // We do not want it to be called every time 'favorites', 'filters', 'setCurrentPokemonList' or 'sortingOrder' is changed.
        // Because of this we disable the eslint warning on this line.

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (data !== undefined) {
            if (!filters.includes("favorite")) {
                return;
            }

            const sortedAndFilteredPokemon = filterAndSortPokemon(
                data.pages.flat(),
                filters,
                sortingOrder,
                favorites
            );
            setCurrentPokemonList(sortedAndFilteredPokemon);
        }

        // This useEffect() should only be called when the 'favorites' change.
        // And we are only interested in updating the 'currentPokemonList' when the 'favorite' filter is active.
        // Because of this we disable the eslint warning on this line.

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorites]);

    useEffect(() => {
        const selectedPokemonElement = pokemonRefs.current[selectedPokemonId];
        if (selectedPokemonElement) {
            selectedPokemonElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [selectedPokemonId]);

    if (isLoading) return <div>Loading...</div>;
    if (error || data == undefined)
        return <div>Error fetching Pokémon data</div>;

    return (
        <div id="PokemonListWrapper">
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
                {currentPokemonList.map((pokemon) => (
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
                        ref={(el) => (pokemonRefs.current[pokemon.id] = el)}
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
                            src={RefreshIcon}
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
        </div>
    );
};

export default PokemonList;
