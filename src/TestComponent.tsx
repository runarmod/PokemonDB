import { useQuery } from "@tanstack/react-query";
import { PokeAPI } from "pokeapi-types";
import { Requests } from "./api/Requests";
import "./Test.css";

export const TestComponent = ({
    limit,
    offset,
}: {
    limit: number;
    offset: number;
}) => {
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
        <div className="pokemonCollection">
            {data?.map((pokemon) => (
                <div key={pokemon.id}>
                    <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />
                </div>
            ))}
        </div>
    );
};
