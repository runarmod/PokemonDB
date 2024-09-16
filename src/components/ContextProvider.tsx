import { ReactNode, createContext, useEffect, useState } from "react";

//TODO: Find way to remove this dummy data
export const Context = createContext({
    selectedPokemonId: 1,
    changeSelectedPokemonId: (id: number) => {
        console.log(id);
    },
    sortingOrder: "id",
    changeSortingOrder: (order: string) => {
        console.log(order);
    },
    filters: ["a"],
    updateFilters: (filter: string) => {
        console.log(filter);
    },
});

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
        <Context.Provider
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
        </Context.Provider>
    );
};

export default ContextProvider;
