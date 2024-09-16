import React, { ReactNode, createContext, useEffect, useState } from "react";

interface AppContextType {
    selectedPokemonId: number;
    changeSelectedPokemonId: (id: number) => void;
    sortingOrder: string;
    changeSortingOrder: (order: string) => void;
    filters: string[];
    updateFilters: (filter: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

interface ContextProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [selectedPokemonId, setSelectedPokemonId] = useState<number>(1);
    const [sortingOrder, setSorting] = useState<string>("id");
    const [filters, setFilters] = useState<string[]>([]);

    const changeSelectedPokemonId = (id: number) => {
        localStorage.setItem("selectedPokemonId", JSON.stringify(id));
        setSelectedPokemonId(id);
    };

    const changeSortingOrder = (order: string) => {
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
