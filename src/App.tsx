import "./styles/App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClientConfig";
import PokemonList from "./components/PokemonList";
import PokemonCard from "./components/PokemonCard";
import SortAndFilter from "./components/SortAndFilter";
import ContextProvider from "./components/ContextProvider";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ContextProvider>
                <div id="wrapper">
                    <PokemonList limit={50} offset={0} />
                    <PokemonCard />
                    <SortAndFilter />
                </div>
            </ContextProvider>
        </QueryClientProvider>
    );
}

export default App;
