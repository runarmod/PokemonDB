import React, { useState } from "react";
import { PokeAPI } from "pokeapi-types";
import "../styles/List.css";

interface ListProps {
    pokemonData: PokeAPI.Pokemon[] | undefined;
}

const List: React.FC<ListProps> = ({ pokemonData }) => {
    function capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul className={`list ${isMenuOpen ? "active" : ""}`}>
                {pokemonData?.map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className={
                            selectedIndex === pokemon.id ? "selected" : ""
                        }
                        onClick={() => handleItemClick(pokemon.id)}
                    >
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                        />
                        {capitalizeFirstLetter(pokemon.name)}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default List;
