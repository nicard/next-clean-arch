import { Pokemon } from "../../domain/entites/pokemon";
import { IPokemonGateway } from "../../domain/gateways/pokemon.gateway";

export class ListPokemonUseCase {
  constructor(private pokemonGateway: IPokemonGateway) {}

  async execute(): Promise<Pokemon[]> {
    return this.pokemonGateway.findAll();
  }
}
