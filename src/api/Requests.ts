import axios, { AxiosResponse } from "axios";
import { PokeAPI } from "pokeapi-types";

export class Requests {
    static readonly url: string = "https://pokeapi.co/api/v2/";

    static async getPokemonById(id: number): Promise<PokeAPI.Pokemon> {
        return axios
            .get(this.url + "pokemon/" + id)
            .then((result: AxiosResponse<PokeAPI.Pokemon>) => {
                console.log(result.data);
                return result.data;
            });
    }
}
