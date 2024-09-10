import pokemonTypeColors from "../pokemonTypeColors";
import "../styles/PokemonTypeLabel.css";

export default function PokemonTypeLabel({ type }: { type: string }) {
    return (
        <label
            className="pokemonTypeLabel"
            style={{
                backgroundColor: pokemonTypeColors.get(type),
            }}
        >
            <p>{type}</p>
        </label>
    );
}
