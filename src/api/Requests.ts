import axios, { AxiosResponse } from "axios";
import { PokeAPI } from "pokeapi-types";
import queryClient from "./queryClientConfig";

export class Requests {
    static readonly #url: string = "https://pokeapi.co/api/v2/";

    static async getPokemonById(id: number): Promise<PokeAPI.Pokemon> {
        // Do extra cache check, as this method will likely be called
        // sometimes without using `useQuery`
        const cachedData: PokeAPI.Pokemon | undefined =
            queryClient.getQueryData(["pokemon", "id", id]);
        if (cachedData) {
            return cachedData;
        }

        return axios
            .get(this.#url + "pokemon/" + id)
            .then((result: AxiosResponse<PokeAPI.Pokemon>) => {
                queryClient.setQueryData(["pokemon", "id", id], result.data);
                return result.data;
            });
    }

    static async getPokemonByName(name: string): Promise<PokeAPI.Pokemon> {
        // Do extra cache check, as this method will likely be called
        // sometimes without using `useQuery`
        const cachedData: PokeAPI.Pokemon | undefined =
            queryClient.getQueryData(["pokemon", "name", name]);
        if (cachedData) {
            return cachedData;
        }

        return axios
            .get(this.#url + "pokemon/" + name)
            .then((result: AxiosResponse<PokeAPI.Pokemon>) => {
                queryClient.setQueryData(
                    ["pokemon", "name", name],
                    result.data
                );
                return result.data;
            });
    }

    static async getPokemonSlice(
        limit: number = 20,
        offset: number = 0
    ): Promise<PokeAPI.NamedAPIResource[]> {
        return axios
            .get(this.#url + "pokemon", {
                params: {
                    limit: limit,
                    offset: offset,
                },
            })
            .then((result: AxiosResponse<PokeAPI.NamedAPIResourceList>) => {
                return result.data.results;
            });
    }

    static async getPokemonSliceAllData(
        limit: number = 20,
        offset: number = 0
    ): Promise<PokeAPI.Pokemon[]> {
        const pokemonList = await this.getPokemonSlice(limit, offset);
        return await Promise.all(
            pokemonList.map(async (pokemon) => {
                return Requests.getPokemonByName(pokemon.name);
            })
        );
    }
}
