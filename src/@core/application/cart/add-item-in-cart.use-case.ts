import { Pokemon } from "../../domain/entites/pokemon";
import { ICartGateway } from "../../domain/gateways/cart.gateway";

export class AddItemInCartUseCase {
  constructor(private gateway: ICartGateway) {}

  execute(pokemon: Pokemon) {
    const cart = this.gateway.get();
    cart.add(pokemon);
    this.gateway.save(cart);
    return cart;
  }
}
