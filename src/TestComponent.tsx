import { useQuery } from "@tanstack/react-query";
import { Requests } from "./api/Requests";
import { PokeAPI } from "pokeapi-types";


export const TestComponent = ({ pokemonId }: { pokemonId: number }) => {

    function fetchData(): Promise<PokeAPI.Pokemon> {
        return Requests.getPokemonById(pokemonId)
    };

    const { data, error, isLoading } = useQuery({queryKey: ['pokemon'], queryFn: fetchData});
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching Pokémon data</div>;
  
    return (
      <div>
        <h1>Pokémon Name: {data != undefined ? data.name : "undefined"}</h1>
      </div>
    );
  };