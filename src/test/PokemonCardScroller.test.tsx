import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAppContext } from "../utils";
import "@testing-library/jest-dom";
import mockPokemonData from "./mocks/mockPokemonData.json";
import PokemonCardScroller from "../components/PokemonCardScroller";

vi.mock(import("../utils"), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAppContext: vi.fn(),
    };
});

// Note: Uses div as child, as we don't want to test the PokemonCard component here
describe("PokemonCardScroller - General tests", () => {
    it("should render children", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: vi.fn(),
            currentPokemonList: [],
        });
        render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );
        expect(screen.getByText("PokemonCard")).toBeInTheDocument();
    });

    it("should not render arrow buttons when pokemon list is empty", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: vi.fn(),
            currentPokemonList: [],
        });
        render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );

        expect(screen.queryByAltText("Up Arrow")).not.toBeInTheDocument();
        expect(screen.queryByAltText("Down Arrow")).not.toBeInTheDocument();
    });

    it("should render arrow buttons when pokemon list is not empty", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: vi.fn(),
            currentPokemonList: mockPokemonData,
        });
        render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );

        expect(screen.getByAltText("Up Arrow")).toBeInTheDocument();
        expect(screen.getByAltText("Down Arrow")).toBeInTheDocument();
    });

    it("should change selectedPokemonId when clicking down arrow", async () => {
        const mockChangeSelectedPokemonId = vi.fn();
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            currentPokemonList: mockPokemonData,
        });
        render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );

        const downArrow = screen.getByAltText("Down Arrow");
        expect(downArrow).toBeInTheDocument();
        userEvent.click(downArrow);

        await waitFor(() => {
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledTimes(1);
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledWith(2);
        });
    });

    it("should change selectedPokemonId when clicking up arrow", async () => {
        const mockChangeSelectedPokemonId = vi.fn();
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 2,
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            currentPokemonList: mockPokemonData,
        });
        render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );

        const upArrow = screen.getByAltText("Up Arrow");
        expect(upArrow).toBeInTheDocument();
        userEvent.click(upArrow);

        await waitFor(() => {
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledTimes(1);
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledWith(1);
        });
    });

    it("should loop around when clicking up arrow from first Pokemon", async () => {
        const mockChangeSelectedPokemonId = vi.fn();
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            currentPokemonList: mockPokemonData,
        });
        render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );

        const upArrow = screen.getByAltText("Up Arrow");
        expect(upArrow).toBeInTheDocument();
        userEvent.click(upArrow);

        await waitFor(() => {
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledTimes(1);
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledWith(4);
        });
    });

    it("should loop around when clicking down arrow from last Pokemon", async () => {
        const mockChangeSelectedPokemonId = vi.fn();
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 4,
            changeSelectedPokemonId: mockChangeSelectedPokemonId,
            currentPokemonList: mockPokemonData,
        });
        render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );

        const downArrow = screen.getByAltText("Down Arrow");
        expect(downArrow).toBeInTheDocument();
        userEvent.click(downArrow);

        await waitFor(() => {
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledTimes(1);
            expect(mockChangeSelectedPokemonId).toHaveBeenCalledWith(1);
        });
    });
});

describe("PokemonCardScroller - Snapshot test", () => {
    it("matches snapshot", () => {
        (useAppContext as Mock).mockReturnValue({
            selectedPokemonId: 1,
            changeSelectedPokemonId: vi.fn(),
            currentPokemonList: mockPokemonData,
        });

        const { asFragment } = render(
            <PokemonCardScroller>
                <div>PokemonCard</div>
            </PokemonCardScroller>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
