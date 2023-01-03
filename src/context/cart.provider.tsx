import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AddItemInCartUseCase } from "../@core/application/cart/add-item-in-cart.use-case";
import { ClearCartUseCase } from "../@core/application/cart/clear-cart.use-case";
import { GetCartUseCase } from "../@core/application/cart/get-cart.use-case";
import { RemoveFromCartUseCase } from "../@core/application/cart/remover-from-cart.use-case";
import { Cart } from "../@core/domain/entites/cart";
import { Pokemon } from "../@core/domain/entites/pokemon";
import { container, Registry } from "../@core/intra/container-registry";

export type CartContextType = {
  cart: Cart;
  addItem: (p: Pokemon) => void;
  removeItem: (p: Pokemon) => void;
  clear: () => void;
  reload: () => void;
};

const defaultContext: CartContextType = {
  cart: new Cart({ items: [] }),
  addItem: (p: Pokemon) => {},
  removeItem: (p: Pokemon) => {},
  clear: () => {},
  reload: () => {},
};

export const CartContext = createContext(defaultContext);

const addItemUseCase = container.get<AddItemInCartUseCase>(
  Registry.AddItemInCartUseCase
);
const removeItemUseCase = container.get<RemoveFromCartUseCase>(
  Registry.RemoveFromCartUseCase
);
const clearUseCase = container.get<ClearCartUseCase>(Registry.ClearCartUseCase);
const getCartUseCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>(defaultContext.cart);

  const addItem = useCallback((pokemon: Pokemon) => {
    const cart = addItemUseCase.execute(pokemon);
    setCart(cart);
  }, []);

  const removeItem = useCallback((pokemon: Pokemon) => {
    const cart = removeItemUseCase.execute(pokemon.name);
    setCart(cart);
  }, []);

  const reload = useCallback(() => {
    const cart = getCartUseCase.execute();
    setCart(cart);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const clear = useCallback(() => {
    const cart = clearUseCase.execute();
    setCart(cart);
  }, []);

  return (
    <CartContext.Provider
      value={{ cart: cart, addItem, removeItem, clear, reload }}
    >
      {" "}
      {children}{" "}
    </CartContext.Provider>
  );
};
