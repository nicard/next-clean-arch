import { Pokemon } from "../../domain/entites/pokemon";
import { ICartGateway } from "../../domain/gateways/cart.gateway";

export class RemoveFromCartUseCase {
  constructor(private gateway: ICartGateway) {}

  execute(pokemonName: string) {
    const cart = this.gateway.get();
    cart.remove(pokemonName);
    this.gateway.save(cart);
    return cart;
  }
}
