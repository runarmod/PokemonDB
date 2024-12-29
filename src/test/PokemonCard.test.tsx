import { useQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, Mock, vi } from "vitest";
import PokemonCard from "../components/PokemonCard";
import { useAppContext } from "../utils";
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
        useQuery: vi.fn(),
    };
});

describe("PokemonCard - General tests", () => {
    beforeEach(() => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [],
            updateFavorites: vi.fn(),
        });
    });

    it("should display loading state", () => {
        (useQuery as Mock).mockReturnValue({
            isLoading: true,
            data: undefined,
            error: null,
        });
        render(<PokemonCard />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should display error", () => {
        (useQuery as Mock).mockReturnValue({
            isLoading: false,
            data: undefined,
            error: new Error("This is an error"),
        });
        render(<PokemonCard />);
        expect(
            screen.getByText("Error fetching Pokémon data")
        ).toBeInTheDocument();
    });

    it("should display message if data is undefined", () => {
        (useQuery as Mock).mockReturnValue({
            isLoading: false,
            data: undefined,
            error: null,
        });
        render(<PokemonCard />);
        expect(
            screen.getByText(
                "No Pokémon matches the filters. Please load more Pokémon or change the filters."
            )
        ).toBeInTheDocument();
    });

    it("should display PokemonCard with stats", async () => {
        (useQuery as Mock).mockReturnValue({
            isLoading: false,
            data: mockPokemonData[0],
            error: null,
        });
        render(<PokemonCard />);

        // Check correct name
        expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();

        // Check correct id formatting (tests formatID())
        expect(await screen.findByText("#0001")).toBeInTheDocument();

        // Check correct formatting of height and weight
        expect(await screen.findByText("70 cm")).toBeInTheDocument();
        expect(await screen.findByText("6.9 kg")).toBeInTheDocument();

        // Check types and abilities
        expect(await screen.findByText("grass")).toBeInTheDocument();
        expect(await screen.findByText("poison")).toBeInTheDocument();
        expect(await screen.findByText("Overgrow")).toBeInTheDocument();
        expect(await screen.findByText("Chlorophyll")).toBeInTheDocument();

        // Check Pokemon Image
        const pokemonImage = screen.getByAltText("Bulbasaur image");
        expect(pokemonImage).toBeInTheDocument();
        expect(pokemonImage).toHaveAttribute(
            "src",
            mockPokemonData[0].sprites.front_default
        );
    });

    it("should remove duplicate abilities (tests removeDuplicateAbility())", async () => {
        (useQuery as Mock).mockReturnValue({
            isLoading: false,
            data: {
                ...mockPokemonData[0],
                abilities: [
                    {
                        ability: { name: "overgrow" },
                    },
                    {
                        ability: { name: "overgrow" },
                    },
                ],
            },
            error: null,
        });
        render(<PokemonCard />);

        const abilityElements = await screen.findAllByText("Overgrow");
        expect(abilityElements).toHaveLength(1);
    });
});

describe("Snapshot test", () => {
    it("matches snapshot", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [0],
            updateFavorites: vi.fn(),
        });

        // Mocking of API call handled by handlers
        const { asFragment } = render(<PokemonCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("PokemonCard - Favorites test", () => {
    const mockUpdateFavorites = vi.fn();

    beforeEach(() => {
        mockUpdateFavorites.mockClear();
    });

    it("should display empty star when a Pokemon is not favorited", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const starIcon = screen.getByAltText("Star image");
        expect(starIcon).toHaveAttribute("src", "/src/assets/star.png");
    });

    it("should display empty star when other Pokemons are favorited", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [2],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const starIcon = screen.getByAltText("Star image");
        expect(starIcon).toHaveAttribute("src", "/src/assets/star.png");
    });

    it("should display filled star when a Pokemon is favorited", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [1],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const filledStarIcon = screen.getByAltText("Star image");
        expect(filledStarIcon).toHaveAttribute(
            "src",
            "/src/assets/star_filled.png"
        );
    });

    it("should display filled star when a Pokemon, amongst others, is favorited ", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [1, 2],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const filledStarIcon = screen.getByAltText("Star image");
        expect(filledStarIcon).toHaveAttribute(
            "src",
            "/src/assets/star_filled.png"
        );
    });

    it("should add as favorite when clicking on empty favorite button", async () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const favoriteButton = screen.getByRole("button", {
            name: "Star image",
        });
        userEvent.click(favoriteButton);

        await waitFor(() => {
            expect(mockUpdateFavorites).toHaveBeenCalledWith([1]);
        });
    });

    it("should be add to list of other favorites when clicking on empty favorite button", async () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [2],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const favoriteButton = screen.getByRole("button", {
            name: "Star image",
        });
        userEvent.click(favoriteButton);

        await waitFor(() => {
            expect(mockUpdateFavorites).toHaveBeenCalledWith([2, 1]);
        });
    });

    it("should be removed as favorite when clicking on filled favorite button", async () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [1],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const favoriteButton = screen.getByRole("button", {
            name: "Star image",
        });
        userEvent.click(favoriteButton);

        await waitFor(() => {
            expect(mockUpdateFavorites).toHaveBeenCalledWith([]);
        });
    });

    it("should remove only one Pokemon from favorite when clicking on filled favorite button", async () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            favorites: [1, 2],
            updateFavorites: mockUpdateFavorites,
        });
        render(<PokemonCard />);

        const favoriteButton = screen.getByRole("button", {
            name: "Star image",
        });
        userEvent.click(favoriteButton);

        await waitFor(() => {
            expect(mockUpdateFavorites).toHaveBeenCalledWith([2]);
        });
    });
});
