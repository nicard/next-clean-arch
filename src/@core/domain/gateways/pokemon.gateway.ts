import { Pokemon } from "../entites/pokemon";

export interface IPokemonGateway {
  findAll(): Promise<Pokemon[]>;
  findByName(name: string): Promise<Pokemon>;
}
