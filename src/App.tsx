import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import queryClient from "./api/queryClientConfig";
import ContextProvider from "./components/ContextProvider";
import PokemonCard from "./components/PokemonCard";
import PokemonCardScroller from "./components/PokemonCardScroller";
import PokemonList from "./components/PokemonList";
import SortAndFilter from "./components/SortAndFilter";
import "./styles/App.css";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ContextProvider>
                    <div id="wrapper">
                        <PokemonList limit={20} />
                        <PokemonCardScroller>
                            <PokemonCard />
                        </PokemonCardScroller>
                        <SortAndFilter />
                    </div>
                </ContextProvider>
            </QueryClientProvider>
            <Analytics />
        </>
    );
}

export default App;
