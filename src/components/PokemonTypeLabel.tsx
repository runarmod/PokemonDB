import { pokemonTypeColors } from "../utils";
import "../styles/PokemonTypeLabel.css";

export default function PokemonTypeLabel({ type }: { type: string }) {
    return (
        <span
            className="pokemonTypeLabel"
            style={{
                backgroundColor: pokemonTypeColors.get(type),
            }}
        >
            {type}
        </span>
    );
}
