import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClientConfig";
import PokemonCard from "./components/PokemonCard";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <PokemonCard id={6} />
        </QueryClientProvider>
    );
}

export default App;
