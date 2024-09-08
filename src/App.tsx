import "./App.css";
import PokemonCard from "./components/PokemonCard";

function App() {
    return (
        <PokemonCard
            name={"Charmander"}
            id={"#0004"}
            height={50}
            weight={100}
            gender={"Male"}
            type={"Fire"}
            abilities={["Blaze", "Punch", "Kick"]}
        />
    );
}

export default App;
