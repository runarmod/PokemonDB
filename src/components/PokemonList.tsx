import { useState } from "react";
import { PokeAPI } from "pokeapi-types";
import "../styles/PokemonList.css";
import { Requests } from "../api/Requests";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "../utils";

const PokemonList = ({
    limit,
    offset,
    onPokemonSelect,
}: {
    limit: number;
    offset: number;
    onPokemonSelect: (id: number) => void;
}) => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    function fetchData(): Promise<PokeAPI.Pokemon[]> {
        return Requests.getPokemonSliceAllData(limit, offset);
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["pokemon", "allData", limit, offset],
        queryFn: fetchData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error || data == undefined)
        return <div>Error fetching Pokémon data</div>;

    return (
        <>
            <section
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
            >
                <div></div>
                <div></div>
                <div></div>
            </section>

            <ul className={`list ${isMenuOpen ? "active" : ""}`}>
                {data.map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className={
                            selectedIndex == pokemon.id ? "selected" : ""
                        }
                        onClick={() => handleItemClick(pokemon.id)}
                    >
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`${capitalizeFirstLetter(pokemon.name)} image`}
                        />
                        {capitalizeFirstLetter(pokemon.name)}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PokemonList;
