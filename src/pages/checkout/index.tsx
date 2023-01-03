import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useContext } from "react";
import { CartContext } from "../../context/cart.provider";

type CheckoutPageProps = {};

const CheckoutPage: NextPage<CheckoutPageProps> = (props) => {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = 10;
    cartContext.clear();
    router.push(`/checkout/${id}/success`);
  }

  return (
    <div>
      <h1>checkout page</h1>
      <h2>Carrinho</h2>
      <ul>
        {cartContext.cart.items.map((i) => (
          <li key={i.id}>
            {i.id} - {i.name}
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <div>
          <label> Cartão </label>
          <input type="text" name="credit_card" id="credit_card"></input>
        </div>
        <div>
          <button type="submit">Comprar</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;

export const getStaticProps: GetStaticProps = async (context) => {
  //const {data} = await http.get(`pokemon/${name}`);

  return {
    props: {
      //pokemon: data
    },
  };
};
