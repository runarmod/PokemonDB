import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { TestComponent } from "./TestComponent";
import queryClient from "./api/queryClientConfig";
import PokemonCard from "./components/PokemonCard";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <PokemonCard
                name={"Charmander"}
                id={"#0004"}
                height={50}
                weight={100}
                gender={"Male"}
                type={"Fire"}
                abilities={["Blaze", "Punch", "Kick"]}
            />
        </QueryClientProvider>
    );
}

export default App;
