import { injectable } from "inversify";
import { Cart } from "../../domain/entites/cart";
import { Pokemon } from "../../domain/entites/pokemon";
import { ICartGateway } from "../../domain/gateways/cart.gateway";

@injectable()
export class CartLocalStorageGateway implements ICartGateway {
  private readonly key = "cart";

  get(): Cart {
    const items = JSON.parse(localStorage.getItem(this.key) || "[]");
    const mappedItems = items.map(
      (item: any) =>
        new Pokemon({
          id: item.id,
          name: item.name,
          weight: item.weight,
          url: item.url,
        })
    );
    return new Cart({
      items: mappedItems,
    });
  }

  save(cart: Cart): void {
    localStorage.setItem(this.key, JSON.stringify(cart.items));
  }
}
