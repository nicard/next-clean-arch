import { Cart } from "../../domain/entites/cart";
import { ICartGateway } from "../../domain/gateways/cart.gateway";

export class GetCartUseCase {
  constructor(private gateway: ICartGateway) {}

  execute(): Cart {
    var teste = this.gateway.get();
    return teste;
  }
}
