import "../styles/PokemonCard.css";
import { Requests } from "../api/Requests";
import { PokeAPI } from "pokeapi-types";
import { useQuery } from "@tanstack/react-query";
import Star from "../assets/star.png";
import FilledStar from "../assets/star_filled.png";
import { capitalizeFirstLetter, useAppContext } from "../utils";
import PokemonTypeLabel from "./PokemonTypeLabel";

const PokemonCard = () => {
    const { selectedPokemonId, favorites, updateFavorites } = useAppContext();

    function handleFavorite(): void {
        let updatedFavorites: number[] = [];
        if (favorites.includes(selectedPokemonId)) {
            updatedFavorites = favorites.filter(
                (favorite: number) => favorite !== selectedPokemonId
            );
        } else {
            updatedFavorites = [...favorites, selectedPokemonId];
        }
        updateFavorites(updatedFavorites);
    }

    function formatId(id: number): string {
        return `#${id.toString().padStart(4, "0")}`;
    }

    function removeDuplicateAbility(
        abilities: PokeAPI.PokemonAbility[]
    ): string[] {
        return [...new Set(abilities.map((a) => a.ability.name))];
    }

    function fetchData(): Promise<PokeAPI.Pokemon> | null {
        if (!selectedPokemonId) {
            return null;
        }
        return Requests.getPokemonById(selectedPokemonId);
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["pokemon", "id", selectedPokemonId],
        queryFn: fetchData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching Pokémon data</div>;
    if (data == undefined) {
        return (
            <article id="PokemonCardContainer">
                <p>
                    No Pokémon matches the filters. Please load more Pokémon or
                    change the filters.
                </p>
            </article>
        );
    }

    return (
        <article id="PokemonCardContainer">
            <figure id="ImageContainer">
                <button id="favoritesButton" onClick={handleFavorite}>
                    <img
                        id="StarIcon"
                        src={
                            favorites.includes(selectedPokemonId)
                                ? FilledStar
                                : Star
                        }
                        alt="Star image"
                    />
                </button>
                <img
                    id="PokemonImage"
                    src={data.sprites.front_default}
                    alt={`${capitalizeFirstLetter(data.name)} image`}
                />
            </figure>
            <div id="StatContainer">
                <section>
                    <h1>{capitalizeFirstLetter(data.name)}</h1>
                    <h2 style={{ opacity: 0.5 }}>
                        {formatId(selectedPokemonId)}
                    </h2>
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
                                <li
                                    key={pokemonType.type.name}
                                    className="typeListEntry"
                                >
                                    <PokemonTypeLabel
                                        type={pokemonType.type.name}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h3>Abilities</h3>
                        <ul>
                            {removeDuplicateAbility(data.abilities).map(
                                (name) => (
                                    <li key={name}>
                                        {capitalizeFirstLetter(name)}
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
