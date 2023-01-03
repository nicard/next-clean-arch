import { Cart } from "../../domain/entites/cart";
import { ICartGateway } from "../../domain/gateways/cart.gateway";

export class ClearCartUseCase {
  constructor(private gateway: ICartGateway) {}

  execute(): Cart {
    const cart = this.gateway.get();
    cart.clear();
    this.gateway.save(cart);
    return cart;
  }
}
