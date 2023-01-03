import { Cart } from "../entites/cart";

export interface ICartGateway {
  get(): Cart;
  save(cart: Cart): void;
}
