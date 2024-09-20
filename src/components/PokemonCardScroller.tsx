import { useAppContext } from "../utils";
import UpArrow from "../assets/up_arrow.svg";
import DownArrow from "../assets/down_arrow.svg";
import "../styles/PokemonCardScroller.css";

const PokemonCardScroller = ({ children }: { children: React.ReactNode }) => {
    const { selectedPokemonId, changeSelectedPokemonId, currentPokemonList } =
        useAppContext();

    function handleUpClick(): void {
        const index = currentPokemonList
            .map((pokemon) => pokemon.id)
            .indexOf(selectedPokemonId);
        if (index <= 0) {
            changeSelectedPokemonId(
                currentPokemonList[currentPokemonList.length - 1].id
            );
        } else {
            changeSelectedPokemonId(currentPokemonList[index - 1].id);
        }
    }

    function handleDownClick(): void {
        const index = currentPokemonList
            .map((pokemon) => pokemon.id)
            .indexOf(selectedPokemonId);
        if (index === currentPokemonList.length - 1) {
            changeSelectedPokemonId(currentPokemonList[0].id);
        } else {
            changeSelectedPokemonId(currentPokemonList[index + 1].id);
        }
    }

    return (
        <div id="ScrollerWrapper">
            {currentPokemonList.length > 1 && (
                <button onClick={handleUpClick}>
                    <img src={UpArrow} alt="Up Arrow" />
                </button>
            )}
            {children}
            {currentPokemonList.length > 1 && (
                <button onClick={handleDownClick}>
                    <img src={DownArrow} alt="Down Arrow" />
                </button>
            )}
        </div>
    );
};

export default PokemonCardScroller;
