import { http, HttpResponse } from "msw";
import mockPokemonData from "./mockPokemonData.json";

export const handlers = [
    http.get("https://pokeapi.co/api/v2/pokemon", () => {
        return HttpResponse.json(mockPokemonData);
    }),
    http.get("https://pokeapi.co/api/v2/pokemon/:id", (req) => {
        const { id } = req.params;
        const mockPokemon = mockPokemonData.find((p) => p.id == Number(id));
        return HttpResponse.json(mockPokemon);
    }),
];
