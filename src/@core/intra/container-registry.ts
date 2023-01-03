import "reflect-metadata";
import { Container } from "inversify";
import { AddItemInCartUseCase } from "../application/cart/add-item-in-cart.use-case";
import { ClearCartUseCase } from "../application/cart/clear-cart.use-case";
import { GetCartUseCase } from "../application/cart/get-cart.use-case";
import { RemoveFromCartUseCase } from "../application/cart/remover-from-cart.use-case";
import { GetPokemonUseCase } from "../application/pokemon/get-pokemon.use-case";
import { ListPokemonUseCase } from "../application/pokemon/list-pokemon.use-case";
import { CartLocalStorageGateway } from "./gateways/cart-local-storage.gateway";
import { PokemonHttpGateway } from "./gateways/pokemon-http.gateway";
import { http } from "./http";

export const Registry = {
  AxiosAdapater: Symbol.for("AxiosAdapater"),
  PokemonGateway: Symbol.for("IPokemonGateway"),
  CartGateway: Symbol.for("ICartGateway"),
  ListPokemonUseCase: Symbol.for("ListPokemonUseCase"),
  GetPokemonUseCase: Symbol.for("GetPokemonUseCase"),
  GetCartUseCase: Symbol.for("GetCartUseCase"),
  AddItemInCartUseCase: Symbol.for("AddItemInCartUseCase"),
  ClearCartUseCase: Symbol.for("ClearCartUseCase"),
  RemoveFromCartUseCase: Symbol.for("RemoveFromCartUseCase"),
};

export const container = new Container();
//################ HTTP ################
container.bind(Registry.AxiosAdapater).toConstantValue(http);
`
`;
//################ Gateways ################
container.bind(Registry.PokemonGateway).toDynamicValue((context) => {
  return new PokemonHttpGateway(context.container.get(Registry.AxiosAdapater));
});

container.bind(Registry.CartGateway).to(CartLocalStorageGateway);

//################ Use Cases ################
container.bind(Registry.ListPokemonUseCase).toDynamicValue((context) => {
  return new ListPokemonUseCase(context.container.get(Registry.PokemonGateway));
});

container.bind(Registry.GetPokemonUseCase).toDynamicValue((context) => {
  return new GetPokemonUseCase(context.container.get(Registry.PokemonGateway));
});

container.bind(Registry.GetCartUseCase).toDynamicValue((context) => {
  return new GetCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.ClearCartUseCase).toDynamicValue((context) => {
  return new ClearCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.AddItemInCartUseCase).toDynamicValue((context) => {
  return new AddItemInCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.RemoveFromCartUseCase).toDynamicValue((context) => {
  return new RemoveFromCartUseCase(context.container.get(Registry.CartGateway));
});
