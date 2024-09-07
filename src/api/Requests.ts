import axios, { AxiosResponse } from "axios";
import { PokeAPI } from "pokeapi-types";

export class Requests {
    static readonly url: string = "https://pokeapi.co/api/v2/";

    static async getPokemonById(id: number): Promise<PokeAPI.Pokemon> {
        return axios
            .get(this.url + "pokemon/" + id)
            .then((result: AxiosResponse<PokeAPI.Pokemon>) => {
                return result.data;
            });
    }

    static async getPokemonByName(name: string): Promise<PokeAPI.Pokemon> {
        return axios
            .get(this.url + "pokemon/" + name)
            .then((result: AxiosResponse<PokeAPI.Pokemon>) => {
                return result.data;
            });
    }

    static async getPokemonSlice(
        limit: number = 20,
        offset: number = 0
    ): Promise<PokeAPI.NamedAPIResource[]> {
        return axios
            .get(this.url + "pokemon", {
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
