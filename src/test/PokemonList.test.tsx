import { useInfiniteQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, Mock, vi } from "vitest";
import PokemonList from "../components/PokemonList";
import { SortingType, useAppContext } from "../utils";
import mockPokemonData from "./mocks/mockPokemonData.json";

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

describe("PokemonList - Snapshot test", () => {
    const mockChangeSelectedPokemonId = vi.fn();

    it("matches snapshot", () => {
        (useInfiniteQuery as Mock).mockReturnValue({
            isLoading: false,
            data: { pages: [mockPokemonData] },
            error: null,
            hasNextPage: false,
        });

        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            sortingOrder: SortingType.NAME_ASC,
            filters: [],
            favorites: [],
            currentPokemonList: mockPokemonData,
            setCurrentPokemonList: vi.fn(),
        });

        window.HTMLLIElement.prototype.scrollIntoView = vi.fn();

        const { asFragment } = render(<PokemonList limit={10} />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("PokemonList - General tests", () => {
    const mockChangeSelectedPokemonId = vi.fn();

    beforeEach(() => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            sortingOrder: SortingType.NAME_ASC,
            filters: [],
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

        window.HTMLLIElement.prototype.scrollIntoView = vi.fn();
        render(<PokemonList limit={10} />);

        expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
        expect(await screen.findByText("Ivysaur")).toBeInTheDocument();
        expect(await screen.findByText("Charmander")).toBeInTheDocument();
        expect(
            await screen.findByAltText("Bulbasaur image")
        ).toBeInTheDocument();
        expect(await screen.findByAltText("Ivysaur image")).toBeInTheDocument();
        expect(
            await screen.findByAltText("Charmander image")
        ).toBeInTheDocument();
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
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledWith(2);
        });
    });

    it("should not display the hamburger menu when screen width is greater than 900px", async () => {
        render(<PokemonList limit={10} />);
        const hamburgerButton = screen.getByLabelText("Toggle Menu");
        expect(hamburgerButton).not.toBeVisible();
    });

    it("should display list when hamburger button clicked", async () => {
        render(<PokemonList limit={10} />);
        const hamburgerButton = screen.getByLabelText("Toggle Menu");
        expect(hamburgerButton).toHaveClass("hamburger");

        userEvent.click(hamburgerButton);
        await waitFor(() => {
            expect(hamburgerButton).toHaveClass("hamburger active");
        });
    });

    it("should filter the Pokémon list based on the filters", async () => {
        const mockFilteredPokemonList = mockPokemonData.filter(
            (pokemon) => pokemon.id < 4
        );

        (useAppContext as Mock).mockReturnValue({
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            filters: ["grass"],
            currentPokemonList: mockFilteredPokemonList,
            setCurrentPokemonList: vi.fn(),
        });

        render(<PokemonList limit={10} />);
        expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
        expect(await screen.findByText("Ivysaur")).toBeInTheDocument();
        expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
    });

    it("should sort the Pokémon list based on sortingOrder", async () => {
        (useAppContext as Mock).mockReturnValue({
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            sortingOrder: SortingType.NAME_DESC,
            filters: [],
            currentPokemonList: mockPokemonData.reverse(),
            setCurrentPokemonList: vi.fn(),
        });

        render(<PokemonList limit={10} />);
        const pokemonListItems = await screen.findAllByRole("button");
        expect(pokemonListItems[0]).toHaveTextContent("Charmander");
        expect(pokemonListItems[1]).toHaveTextContent("Ivysaur");
        expect(pokemonListItems[2]).toHaveTextContent("Bulbasaur");
    });

    it("should scroll the selected Pokémon into view", async () => {
        const scrollIntoViewMock = vi.fn();
        window.HTMLLIElement.prototype.scrollIntoView = scrollIntoViewMock;

        render(<PokemonList limit={10} />);
        userEvent.click(await screen.findByText("Ivysaur"));
        await waitFor(() => {
            expect(scrollIntoViewMock).toHaveBeenCalled();
        });
    });

    it("should display only 'Load More' when the list is empty", async () => {
        (useAppContext as Mock).mockReturnValue({
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            filters: [],
            currentPokemonList: [],
            setCurrentPokemonList: vi.fn(),
        });

        render(<PokemonList limit={10} />);
        const pokemonListItems = await screen.findAllByRole("button");
        expect(pokemonListItems).toHaveLength(1);
        expect(pokemonListItems[0]).toHaveTextContent("Load More");
    });
});
