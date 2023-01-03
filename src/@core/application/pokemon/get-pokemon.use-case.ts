import { Pokemon } from "../../domain/entites/pokemon";
import { IPokemonGateway } from "../../domain/gateways/pokemon.gateway";

export class GetPokemonUseCase {
  constructor(private pokemonGateway: IPokemonGateway) {}

  async execute(name: string): Promise<Pokemon> {
    return this.pokemonGateway.findByName(name);
  }
}
