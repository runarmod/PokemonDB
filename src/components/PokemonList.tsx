import { useState } from "react";
import { PokeAPI } from "pokeapi-types";
import "../styles/PokemonList.css";
import { Requests } from "../api/Requests";
import { useInfiniteQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "../utils";

const PokemonList = ({
    limit,
    onPokemonSelect,
}: {
    limit: number;
    onPokemonSelect: (id: number) => void;
}) => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [offset, setOffset] = useState(0);

    const handleItemClick = (index: number) => {
        setSelectedIndex(index);
        onPokemonSelect(index);
        if (window.innerWidth <= 900) {
            toggleMenu();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function fetchPage(pageNr: number): Promise<PokeAPI.Pokemon[]> {
        setOffset(pageNr * limit);
        return Requests.getPokemonSliceAllData(limit, offset);
    }

    const { data, fetchNextPage, isFetchingNextPage, error, isLoading } =
        useInfiniteQuery({
            queryKey: ["pokemon", "allData"],
            queryFn: ({ pageParam }) => fetchPage(pageParam),
            initialPageParam: 1,
            getNextPageParam: (_lastPage, allPages) => {
                return allPages.length + 1;
            },
        });

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
                {data?.pages
                    .flatMap((page) => page)
                    .map((pokemon) => (
                        <li
                            key={pokemon.id}
                            className={
                                selectedIndex == pokemon.id ? "selected" : ""
                            }
                            onClick={() => handleItemClick(pokemon.id)}
                            role="button"
                            aria-pressed={selectedIndex == pokemon.id}
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
                    {isFetchingNextPage ? "Loading more..." : "Load More"}
                </li>
            </ul>
        </>
    );
};

export default PokemonList;
