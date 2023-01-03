import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useContext } from "react";
import { CartContext } from "../../context/cart.provider";
import { GetPokemonUseCase } from "../../@core/application/pokemon/get-pokemon.use-case";
import { container, Registry } from "../../@core/intra/container-registry";
import { PokemonDetail } from "../../utils/models";
import { Pokemon } from "../../@core/domain/entites/pokemon";

type PokemonPageProps = {
  pokemon: PokemonDetail;
};

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  const cartContext = useContext(CartContext);
  const pokemonEntity = new Pokemon({ ...pokemon });
  console.log('Página renderizada no servidor.', pokemon);
  return (
    <div>
      <h1>id: {pokemonEntity.id}</h1>
      <h1>Nome: {pokemonEntity.name}</h1>
      <h1>weight: {pokemonEntity.weight}</h1>
      <button onClick={() => cartContext.addItem(pokemonEntity)}>
        Adicionar no Carrinho
      </button>
    </div>
  );
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [ { params: {
      name: "bulbasaur", 
    }},{ params: {
      name: "pikachu", 
    }},{ params: {
      name: "charmander", 
    }},{ params: {
      name: "pidgeotto", 
    }}
  ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params || {};
  const useCase = container.get<GetPokemonUseCase>(Registry.GetPokemonUseCase);

  const items = await useCase.execute(name as string);

  return {
    props: {
      pokemon: {
        id: items.id,
        name: items.name,
        weight: items.weight,
      },
    },
  };
};
