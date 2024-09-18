import { pokemonTypeColors } from "../utils";
import "../styles/PokemonTypeLabel.css";

export default function PokemonTypeLabel({ type }: { type: string }) {
    return (
        <label
            className="pokemonTypeLabel"
            style={{
                backgroundColor: pokemonTypeColors.get(type),
            }}
        >
            {type}
        </label>
    );
}