import React, { ReactNode, createContext, useEffect, useState } from "react";
import { sortingType } from "../utils";

interface AppContextType {
    selectedPokemonId: number;
    changeSelectedPokemonId: (id: number) => void;
    sortingOrder: sortingType;
    changeSortingOrder: (order: sortingType) => void;
    filters: string[];
    updateFilters: (filter: string) => void;
    favorites: number[];
    updateFavorites: (favorites: number[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

interface ContextProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [selectedPokemonId, setSelectedPokemonId] = useState<number>(1);
    const [sortingOrder, setSorting] = useState<sortingType>(sortingType.ID);
    const [filters, setFilters] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const changeSelectedPokemonId = (id: number) => {
        localStorage.setItem("selectedPokemonId", JSON.stringify(id));
        setSelectedPokemonId(id);
    };

    const updateFavorites = (favorites: number[]) => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setFavorites(favorites);
    };

    const changeSortingOrder = (order: sortingType) => {
        localStorage.setItem("sortingOrder", JSON.stringify(order));
        setSorting(order);
    };

    const updateFilters = (filter: string) => {
        let newFilters: string[] = Array.from(filters);
        if (newFilters.includes(filter)) {
            newFilters = newFilters.filter((e) => e != filter);
        } else {
            newFilters.push(filter);
        }
        localStorage.setItem("filters", JSON.stringify(newFilters));
        setFilters(newFilters);
    };

    useEffect(() => {
        const storedFilters = localStorage.getItem("filters");
        if (storedFilters) {
            setFilters(JSON.parse(storedFilters));
        }
        const storedSortingOrder = localStorage.getItem("sortingOrder");
        if (storedSortingOrder) {
            setSorting(JSON.parse(storedSortingOrder));
        }
        const storedSelectedPokemonId =
            localStorage.getItem("selectedPokemonId");
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
