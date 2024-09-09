import { useQuery } from "@tanstack/react-query";
import { PokeAPI } from "pokeapi-types";
import { Requests } from "../api/Requests";
import React, { useState } from "react";
import "../styles/List.css";

interface ListProps {
    limit: number;
    offset: number;
}

const List: React.FC<ListProps> = ({ limit, offset }) => {
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
