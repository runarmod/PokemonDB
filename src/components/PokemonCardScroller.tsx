import { useAppContext } from "../utils";
import UpArrow from "../assets/up_arrow.svg"
import DownArrow from "../assets/down_arrow.svg"
import "../styles/PokemonCardScroller.css"

const PokemonCardScroller = ({ children } : { children: React.ReactNode }) => {

    const { selectedPokemonId, changeSelectedPokemonId } = useAppContext();

    function handleUpClick(): void {
        changeSelectedPokemonId(selectedPokemonId-1)
    }

    function handleDownClick(): void {
        changeSelectedPokemonId(selectedPokemonId+1)
    }

    return (
        <div id="ScrollerWrapper">
            <button onClick={handleUpClick}>
                <img src={UpArrow} alt="Up Arrow" />
            </button>
            {children}
            <button onClick={handleDownClick}>
                <img src={DownArrow} alt="Down Arrow" />
            </button>
        </div>
    )
}

export default PokemonCardScroller;