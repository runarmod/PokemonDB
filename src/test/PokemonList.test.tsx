import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonList from "../components/PokemonList";
import { useInfiniteQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import mockPokemonData from "./mocks/mockPokemonData.json";
import { useAppContext } from "../utils";

vi.mock(import("../utils"), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAppContext: vi.fn(),
    };
});

vi.mock(import("@tanstack/react-query"), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useInfiniteQuery: vi.fn(),
    };
});

describe("PokemonList - General tests", () => {
    const changeSelectedPokemonId = vi.fn();

    beforeEach(() => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId,
            sortingOrder: "asc",
            filters: {},
            favorites: [],
            currentPokemonList: mockPokemonData,
            setCurrentPokemonList: vi.fn(),
        });
    });

    it("should display loading state", () => {
        (useInfiniteQuery as Mock).mockReturnValue({
            isLoading: true,
            data: undefined,
            error: null,
        });
        render(<PokemonList limit={10} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should display error", () => {
        (useInfiniteQuery as Mock).mockReturnValue({
            isLoading: false,
            data: undefined,
            error: new Error("This is an error"),
        });
        render(<PokemonList limit={10} />);
        expect(
            screen.getByText("Error fetching Pokémon data")
        ).toBeInTheDocument();
    });

    it("should display Pokémon list", async () => {
        (useInfiniteQuery as Mock).mockReturnValue({
            isLoading: false,
            data: { pages: [mockPokemonData] },
            error: null,
            hasNextPage: false,
        });

        // mock the scrollIntoView function as it fails the test and it is not necessary for the test.
        window.HTMLLIElement.prototype.scrollIntoView = vi.fn();
        render(<PokemonList limit={10} />);

        expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
        expect(await screen.findByText("Ivysaur")).toBeInTheDocument();
    });

    it("should load more Pokémon when 'Load More' is clicked", async () => {
        const fetchNextPageMock = vi.fn();
        (useInfiniteQuery as Mock).mockReturnValue({
            isLoading: false,
            data: { pages: [mockPokemonData] },
            error: null,
            hasNextPage: true,
            fetchNextPage: fetchNextPageMock,
            isFetchingNextPage: false,
        });

        render(<PokemonList limit={10} />);
        const loadMoreButton = await screen.findByText("Load More");

        userEvent.click(loadMoreButton);
        await waitFor(() => expect(fetchNextPageMock).toHaveBeenCalled());
    });

    it("should select a Pokemon on click", async () => {
        render(<PokemonList limit={10} />);

        userEvent.click(await screen.findByText("Ivysaur"));

        await waitFor(() => {
            expect(changeSelectedPokemonId).toHaveBeenCalledWith(2);
        });
    });
});
