import { useState } from "react";
import { PokeAPI } from "pokeapi-types";
import "../styles/List.css";
import { Requests } from "../api/Requests";
import { useQuery } from "@tanstack/react-query";
import PokemonCard from "./PokemonCard";

const List = ({ limit, offset }: { limit: number; offset: number }) => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleItemClick = (index: number) => {
        setSelectedIndex(index);
        if (window.innerWidth <= 800) {
            toggleMenu();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function fetchData(): Promise<PokeAPI.Pokemon[]> {
        return Requests.getPokemonSliceAllData(limit, offset);
    }

    function capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["pokemon", "allData", limit, offset],
        queryFn: fetchData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching Pokémon data</div>;

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
                {data?.map((pokemon) => (
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
            {<PokemonCard id={selectedIndex} />}
        </>
    );
};

export default List;
