import Link from "next/link";
import * as React from "react";
import { useContext } from "react";
import { CartContext } from "../context/cart.provider";
type Props = {};

export const MyCart = (props: Props) => {
  const cartContext = useContext(CartContext);
  return (
    <nav>
      <Link href={`/checkout`} passHref>
        <a href="">Cart</a>
      </Link>{" "}
      - Total : {cartContext.cart.total} | Items {cartContext.cart.items.length}
      <Link href={`/`} passHref>
        <a href="">Voltar</a>
      </Link>
    </nav>
  );
};
