import "../styles/PokemonCard.css";
import { Requests } from "../api/Requests";
import { PokeAPI } from "pokeapi-types";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "../utils";

const PokemonCard = ({ id }: { id: number }) => {
    function formatId(id: number): string {
        return `#${id.toString().padStart(4, "0")}`;
    }

    function removeDuplicateAbility(
        abilities: PokeAPI.PokemonAbility[]
    ): PokeAPI.PokemonAbility[] {
        return abilities.filter(
            (ability, index, self) =>
                self.map((a) => a.ability.name).indexOf(ability.ability.name) ==
                index
        );
    }

    function fetchData(): Promise<PokeAPI.Pokemon> {
        return Requests.getPokemonById(id);
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["pokemon", "id", id],
        queryFn: fetchData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error || data == undefined)
        return <div>Error fetching Pokémon data</div>;

    return (
        <article id="PokemonCardContainer">
            <figure id="ImageContainer">
                <img
                    src={data.sprites.front_default}
                    alt={`${capitalizeFirstLetter(data.name)} image`}
                />
            </figure>
            <div id="StatContainer">
                <section>
                    <h1>{capitalizeFirstLetter(data.name)}</h1>
                    <h2 style={{ opacity: 0.5 }}>{formatId(id)}</h2>
                </section>
                <div id="StatGrid">
                    <section>
                        <h3>Height</h3>
                        <p>{data.height * 10} cm</p>
                    </section>
                    <section>
                        <h3>Weight</h3>
                        <p>{data.weight / 10} kg</p>
                    </section>
                    <section>
                        <h3>Types</h3>
                        <ul>
                            {data.types.map((pokemonType) => (
                                <li key={pokemonType.type.name}>
                                    {capitalizeFirstLetter(
                                        pokemonType.type.name
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h3>Abilities</h3>
                        <ul>
                            {removeDuplicateAbility(data.abilities).map(
                                (pokemonAbility) => (
                                    <li key={pokemonAbility.ability.name}>
                                        {capitalizeFirstLetter(
                                            pokemonAbility.ability.name
                                        )}
                                    </li>
                                )
                            )}
                        </ul>
                    </section>
                </div>
            </div>
        </article>
    );
};

export default PokemonCard;
