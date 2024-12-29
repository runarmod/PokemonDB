import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
    it("successfully loads api", async () => {
        render(<App />);
        expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
    });
});
