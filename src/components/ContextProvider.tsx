import { ReactNode, createContext, useState } from "react";

export const Context = createContext({
    selectedPokemonId: 1,
    changeSelectedPokemonId: (id: number) => {
        console.log(id);
    },
    sortingOrder: "id",
    changeSortingOrder: (order: string) => {
        console.log(order);
    },
});

interface ContextProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [selectedPokemonId, setSelectedPokemonId] = useState<number>(1);
    const [sortingOrder, setSorting] = useState<string>("id");

    const changeSelectedPokemonId = (id: number) => {
        setSelectedPokemonId(id);
    };

    const changeSortingOrder = (order: string) => {
        setSorting(order);
    };

    return (
        <Context.Provider
            value={{
                selectedPokemonId,
                changeSelectedPokemonId,
                sortingOrder,
                changeSortingOrder,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
