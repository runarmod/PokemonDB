import "./styles/App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClientConfig";
import PokemonList from "./components/PokemonList";
import PokemonCard from "./components/PokemonCard";
import SortAndFilter from "./components/SortAndFilter";
import ContextProvider from "./components/ContextProvider";
import PokemonCardScroller from "./components/PokemonCardScroller";
import { Analytics } from "@vercel/analytics/react";

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
