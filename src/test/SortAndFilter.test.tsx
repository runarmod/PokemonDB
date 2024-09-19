import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortingType, useAppContext } from "../utils";
import "@testing-library/jest-dom";
import SortAndFilter from "../components/SortAndFilter";

vi.mock(import("../utils"), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAppContext: vi.fn(),
    };
});

describe("SortAndFilter - General tests", () => {
    describe("Sorting Options", () => {
        it("renders sorting options", () => {
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: vi.fn(),
                updateFilters: vi.fn(),
                filters: [],
            });
            render(<SortAndFilter />);

            expect(screen.getByLabelText("#ID")).toBeInTheDocument();
            expect(screen.getByLabelText("Name A-Z")).toBeInTheDocument();
            expect(screen.getByLabelText("Name Z-A")).toBeInTheDocument();

            const radioButtons = screen.getAllByRole("radio");
            expect(radioButtons).toHaveLength(3);
        });

        it("renders ID sorting option", () => {
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: vi.fn(),
                updateFilters: vi.fn(),
                filters: [],
            });
            render(<SortAndFilter />);

            const checkBox = screen.getByLabelText("#ID");
            expect(checkBox).toBeInTheDocument();
            expect(checkBox).toBeChecked();

            const radioButtons = screen.getAllByRole("radio");
            const selectedRadioButtons = radioButtons.filter(
                (radioButton) => (radioButton as HTMLInputElement).checked
            );
            expect(selectedRadioButtons).toHaveLength(1);
        });

        it("renders ascending sorting option", () => {
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.NAME_ASC,
                changeSortingOrder: vi.fn(),
                updateFilters: vi.fn(),
                filters: [],
            });
            render(<SortAndFilter />);

            const checkBox = screen.getByLabelText("Name A-Z");
            expect(checkBox).toBeInTheDocument();
            expect(checkBox).toBeChecked();

            const radioButtons = screen.getAllByRole("radio");
            const selectedRadioButtons = radioButtons.filter(
                (radioButton) => (radioButton as HTMLInputElement).checked
            );
            expect(selectedRadioButtons).toHaveLength(1);
        });

        it("renders descending sorting option", () => {
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.NAME_DESC,
                changeSortingOrder: vi.fn(),
                updateFilters: vi.fn(),
                filters: [],
            });
            render(<SortAndFilter />);

            const checkBox = screen.getByLabelText("Name Z-A");
            expect(checkBox).toBeInTheDocument();
            expect(checkBox).toBeChecked();

            const radioButtons = screen.getAllByRole("radio");
            const selectedRadioButtons = radioButtons.filter(
                (radioButton) => (radioButton as HTMLInputElement).checked
            );
            expect(selectedRadioButtons).toHaveLength(1);
        });

        it("should not change sortingOrder when clicking the same radiobutton", () => {
            const mockChangeSortingOrder = vi.fn();
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: mockChangeSortingOrder,
                updateFilters: vi.fn(),
                filters: ["favorite", "fire", "water"],
            });
            render(<SortAndFilter />);

            const radioButton = screen.getByLabelText("#ID");
            expect(radioButton).toBeInTheDocument();
            expect(radioButton).toBeChecked();
            userEvent.click(radioButton);

            waitFor(() => {
                expect(mockChangeSortingOrder).toBeCalledTimes(0);
            });
        });

        it("should change when clicking another radiobutton", () => {
            const mockChangeSortingOrder = vi.fn();
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: mockChangeSortingOrder,
                updateFilters: vi.fn(),
                filters: ["favorite", "fire", "water"],
            });
            render(<SortAndFilter />);

            const radioButton = screen.getByLabelText("#ID");
            expect(radioButton).toBeInTheDocument();
            expect(radioButton).toBeChecked();
            const radioButtonASC = screen.getByLabelText("Name A-Z");
            userEvent.click(radioButtonASC);

            waitFor(() => {
                expect(mockChangeSortingOrder).toHaveBeenCalledTimes(1);
                expect(mockChangeSortingOrder).toHaveBeenCalledWith(
                    SortingType.NAME_ASC
                );
            });
        });
    });

    describe("Filters", () => {
        it("renders filters", () => {
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: vi.fn(),
                updateFilters: vi.fn(),
                filters: [],
            });
            render(<SortAndFilter />);

            const filledStarIcon = screen.getByAltText("favorite icon");
            expect(filledStarIcon).toBeInTheDocument();
            expect(filledStarIcon).toHaveAttribute(
                "src",
                "/project1/src/assets/star_filled.png"
            );
            expect(screen.getByLabelText("normal")).toBeInTheDocument();
            expect(screen.getByLabelText("fire")).toBeInTheDocument();
            expect(screen.getByLabelText("water")).toBeInTheDocument();
            expect(screen.getByLabelText("electric")).toBeInTheDocument();
            expect(screen.getByLabelText("grass")).toBeInTheDocument();
            expect(screen.getByLabelText("ice")).toBeInTheDocument();
            expect(screen.getByLabelText("fighting")).toBeInTheDocument();
            expect(screen.getByLabelText("poison")).toBeInTheDocument();
            expect(screen.getByLabelText("ground")).toBeInTheDocument();
            expect(screen.getByLabelText("flying")).toBeInTheDocument();
            expect(screen.getByLabelText("psychic")).toBeInTheDocument();
            expect(screen.getByLabelText("bug")).toBeInTheDocument();
            expect(screen.getByLabelText("ghost")).toBeInTheDocument();
            expect(screen.getByLabelText("dragon")).toBeInTheDocument();
            expect(screen.getByLabelText("dark")).toBeInTheDocument();
            expect(screen.getByLabelText("steel")).toBeInTheDocument();
            expect(screen.getByLabelText("fairy")).toBeInTheDocument();

            const checkBoxes = screen.getAllByRole("checkbox");
            expect(checkBoxes).toHaveLength(18);

            const checkedCheckboxes = checkBoxes.filter(
                (checkBox) => (checkBox as HTMLInputElement).checked
            );
            expect(checkedCheckboxes).toHaveLength(0);
        });

        it("renders correct filters", () => {
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: vi.fn(),
                updateFilters: vi.fn(),
                filters: ["favorite", "fire", "water"],
            });
            render(<SortAndFilter />);

            const favoriteCheckbox = screen.getByRole("checkbox", {
                name: "favorite icon",
            });
            const fireCheckbox = screen.getByRole("checkbox", { name: "fire" });
            const waterCheckbox = screen.getByRole("checkbox", {
                name: "water",
            });
            expect(favoriteCheckbox).toBeChecked();
            expect(fireCheckbox).toBeChecked();
            expect(waterCheckbox).toBeChecked();

            const checkBoxes = screen.getAllByRole("checkbox");
            const checkedCheckboxes = checkBoxes.filter(
                (checkBox) => (checkBox as HTMLInputElement).checked
            );
            expect(checkedCheckboxes).toHaveLength(3);
        });

        it("should add filter when when clicking unchecked checkbox", () => {
            const mockUpdateFilters = vi.fn();
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: vi.fn(),
                updateFilters: mockUpdateFilters,
                filters: ["favorite", "fire"],
            });
            render(<SortAndFilter />);

            const waterCheckbox = screen.getByRole("checkbox", {
                name: "water",
            });
            expect(waterCheckbox).toBeInTheDocument();
            expect((waterCheckbox as HTMLInputElement).checked).toBe(false);
            userEvent.click(waterCheckbox);
            waitFor(() => {
                expect(mockUpdateFilters).toHaveBeenCalledTimes(1);
                expect(mockUpdateFilters).toHaveBeenCalledWith([
                    "favorite",
                    "fire",
                    "water",
                ]);
            });
        });

        it("should remove filter when when clicking checked checkbox", () => {
            const mockUpdateFilters = vi.fn();
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: vi.fn(),
                updateFilters: mockUpdateFilters,
                filters: ["favorite", "fire", "water"],
            });
            render(<SortAndFilter />);

            const fireCheckbox = screen.getByRole("checkbox", { name: "fire" });
            expect(fireCheckbox).toBeInTheDocument();
            expect(fireCheckbox).toBeChecked();
            userEvent.click(fireCheckbox);
            waitFor(() => {
                expect(mockUpdateFilters).toHaveBeenCalledTimes(1);
                expect(mockUpdateFilters).toHaveBeenCalledWith([
                    "favorite",
                    "water",
                ]);
            });
        });
    });

    describe("Snapshot test", () => {
        it("matches snapshot", () => {
            (useAppContext as Mock).mockReturnValue({
                sortingOrder: SortingType.ID,
                changeSortingOrder: vi.fn(),
                updateFilters: vi.fn(),
                filters: ["favorite", "fire", "water"],
            });

            const { asFragment } = render(<SortAndFilter />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
