import React, { ReactNode, createContext, useEffect, useState } from "react";
import { SortingType } from "../utils";
import { PokeAPI } from "pokeapi-types";

interface AppContextType {
    selectedPokemonId: number;
    changeSelectedPokemonId: (id: number) => void;
    sortingOrder: SortingType;
    changeSortingOrder: (order: SortingType) => void;
    filters: string[];
    updateFilters: (filter: string) => void;
    favorites: number[];
    updateFavorites: (favorites: number[]) => void;
    currentPokemonList: PokeAPI.Pokemon[];
    setCurrentPokemonList: React.Dispatch<
        React.SetStateAction<PokeAPI.Pokemon[]>
    >;
}

export const AppContext = createContext<AppContextType | null>(null);

interface ContextProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [selectedPokemonId, setSelectedPokemonId] = useState<number>(1);
    const [sortingOrder, setSorting] = useState<SortingType>(SortingType.ID);
    const [filters, setFilters] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [currentPokemonList, setCurrentPokemonList] = useState<
        PokeAPI.Pokemon[]
    >([]);

    const changeSelectedPokemonId = (id: number) => {
        sessionStorage.setItem("selectedPokemonId", JSON.stringify(id));
        setSelectedPokemonId(id);
    };

    const updateFavorites = (favorites: number[]) => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setFavorites(favorites);
    };

    const changeSortingOrder = (order: SortingType) => {
        sessionStorage.setItem("sortingOrder", JSON.stringify(order));
        setSorting(order);
    };

    const updateFilters = (filter: string) => {
        let newFilters: string[] = Array.from(filters);
        if (newFilters.includes(filter)) {
            newFilters = newFilters.filter((e) => e != filter);
        } else {
            newFilters.push(filter);
        }
        sessionStorage.setItem("pokemonFilters", JSON.stringify(newFilters));
        setFilters(newFilters);
    };

    useEffect(() => {
        const storedFilters = sessionStorage.getItem("pokemonFilters");
        if (storedFilters) {
            setFilters(JSON.parse(storedFilters));
        }
        const storedSortingOrder = sessionStorage.getItem("sortingOrder");
        if (storedSortingOrder) {
            setSorting(JSON.parse(storedSortingOrder));
        }
        const storedSelectedPokemonId =
            sessionStorage.getItem("selectedPokemonId");
        if (storedSelectedPokemonId) {
            setSelectedPokemonId(JSON.parse(storedSelectedPokemonId));
        }
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                selectedPokemonId,
                changeSelectedPokemonId,
                sortingOrder,
                changeSortingOrder,
                filters,
                updateFilters,
                favorites,
                updateFavorites,
                currentPokemonList,
                setCurrentPokemonList,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
