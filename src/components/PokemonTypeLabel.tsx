import "../styles/PokemonTypeLabel.css";
import { pokemonTypeColors } from "../utils";

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
