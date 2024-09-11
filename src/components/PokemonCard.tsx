import "../styles/PokemonCard.css";
import { Requests } from "../api/Requests";
import { PokeAPI } from "pokeapi-types";
import { useQuery } from "@tanstack/react-query";

const PokemonCard = ({ id }: { id: number }) => {
    function capitalizeFirstLetter(string: string | undefined): string {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return "";
    }

    function formatId(id: number): string {
        return `#${id.toString().padStart(4, "0")}`;
    }

    function fetchData(): Promise<PokeAPI.Pokemon> {
        return Requests.getPokemonById(id);
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["pokemon", "id", id],
        queryFn: fetchData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching Pokémon data</div>;

    return (
        <article id="PokemonCardContainer">
            <figure id="ImageContainer">
                <img
                    src={data?.sprites.front_default}
                    alt={`${capitalizeFirstLetter(data?.name)} image`}
                />
            </figure>
            <div id="StatContainer">
                <section>
                    <h1>{capitalizeFirstLetter(data?.name)}</h1>
                    <h2 style={{ opacity: 0.5 }}>{formatId(id)}</h2>
                </section>
                <div id="StatGrid">
                    <section>
                        <h3>Height</h3>
                        <p>
                            {data?.height
                                ? `${data.height * 10} cm`
                                : "Undefined"}
                        </p>
                    </section>
                    <section>
                        <h3>Weight</h3>
                        <p>
                            {data?.weight
                                ? `${data.weight / 10} kg`
                                : "Undefined"}
                        </p>
                    </section>
                    <section>
                        <h3>Types</h3>
                        <ul>
                            {data ? (
                                data.types.map((pokemonType, index) => (
                                    <li key={index}>
                                        {capitalizeFirstLetter(
                                            pokemonType.type.name
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>Undefined</li>
                            )}
                        </ul>
                    </section>
                    <section>
                        <h3>Abilities</h3>
                        <ul>
                            {data ? (
                                data.abilities.map((pokemonAbility, index) => (
                                    <li key={index}>
                                        {capitalizeFirstLetter(
                                            pokemonAbility.ability.name
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>Undefined</li>
                            )}
                        </ul>
                    </section>
                </div>
            </div>
        </article>
    );
};

export default PokemonCard;
