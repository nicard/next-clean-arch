import { AxiosInstance } from "axios";
import { Pokemon } from "../../domain/entites/pokemon";
import { IPokemonGateway } from "../../domain/gateways/pokemon.gateway";

type DataResults = {
  results: Pokemon[];
};

export class PokemonHttpGateway implements IPokemonGateway {
  constructor(private http: AxiosInstance) {}

  findAll(): Promise<Pokemon[]> {
    return this.http
      .get<DataResults>("/pokemon?limit=1000&offset=0")
      .then((response) => {
        let data: DataResults = response.data;
        return data.results.map((p) => {
          return new Pokemon({
            name: p.name,
            url: p.url,
          });
        });
      });
  }

  findByName(name: string): Promise<Pokemon> {
    return this.http.get(`/pokemon/${name}`).then((response) => {
      return new Pokemon({
        name: response.data.name,
        weight: response.data.weight,
        id: response.data.id,
      });
    });
  }
}
