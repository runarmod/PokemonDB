import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClientConfig";
import PokemonList from "./components/PokemonList";
import { useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
    const [selectedPokemonId, setSelectedPokemonId] = useState(1);

    const handlePokemonSelect = (id: number) => {
        setSelectedPokemonId(id);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <PokemonList
                limit={50}
                offset={0}
                onPokemonSelect={handlePokemonSelect}
            />
            <PokemonCard id={selectedPokemonId} />
        </QueryClientProvider>
    );
}

export default App;
